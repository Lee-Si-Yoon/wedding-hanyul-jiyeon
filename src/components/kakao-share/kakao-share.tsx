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

interface KakaoShareSettings {
  objectType: string;
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      webUrl: string;
      mobileWebUrl: string;
    };
  };
  buttons: {
    title: string;
    link: {
      webUrl: string;
      mobileWebUrl: string;
    };
  }[];
}

const JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

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

    const url = window.location.origin;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '결혼식에 초대합니다',
        description:
          'ㅁㅁㅁ과 ㅁㅁㅁ의 결혼식에 초대합니다. 함께 축하해주세요!',
        imageUrl: `${url}/gallery-example-1.png`,
        link: {
          webUrl: url,
          mobileWebUrl: url,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: { webUrl: url, mobileWebUrl: url },
        },
        {
          title: '길 찾기',
          link: {
            webUrl: 'https://map.naver.com/p/entry/place/1950859773',
            mobileWebUrl: 'https://map.naver.com/p/entry/place/1950859773',
          },
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
