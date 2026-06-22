'use client';

import { useState } from 'react';
import Script from 'next/script';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share: {
        sendDefault: (settings: KakaoShareSettings) => void;
      };
    };
  }
}

interface LinkObject {
  webUrl: string;
  mobileWebUrl: string;
}

interface KakaoShareSettings {
  objectType: string;
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: LinkObject;
  };
  address: string;
  addressTitle?: string;
  buttonTitle?: string;
  buttons?: {
    title: string;
    link: LinkObject;
  }[];
}

const JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
const URL = 'https://wedding-hanyul-jiyeon.vercel.app';

export default function KakaoShare() {
  const [ready, setReady] = useState(false);

  function handleLoad() {
    if (!JS_KEY || !window.Kakao) return;
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(JS_KEY);
    }
    setReady(true);
  }

  function handleShare() {
    if (!window.Kakao?.Share) return;

    window.Kakao.Share.sendDefault({
      objectType: 'location',
      content: {
        title: '결혼식에 초대합니다',
        description:
          'ㅁㅁㅁ과 ㅁㅁㅁ의 결혼식에 초대합니다. 함께 축하해주세요!',
        imageUrl: `${URL}/gallery-example-1.png`,
        link: {
          webUrl: URL,
          mobileWebUrl: URL,
        },
      },
      address: '경기도 성남시 수정구 시흥동 63-5',
      addressTitle: '메종디탈리',
      buttons: [
        {
          title: '초대장 보기',
          link: { webUrl: URL, mobileWebUrl: URL },
        },
      ],
    });
  }

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        strategy="afterInteractive"
        onLoad={handleLoad}
      />
      <Button
        variant="outline"
        className="w-full"
        onClick={handleShare}
        disabled={!ready}
      >
        카카오톡으로 공유하기
      </Button>
    </>
  );
}
