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

export default function KakaoShare({
  siteUrl,
  address,
  addressTitle,
  title,
  description,
  imageUrl,
}: {
  siteUrl: string;
  address: string;
  addressTitle: string;
  title: string;
  description: string;
  imageUrl: string;
}) {
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
        title,
        description,
        imageUrl,
        link: {
          webUrl: siteUrl,
          mobileWebUrl: siteUrl,
        },
      },
      address,
      addressTitle,
      buttons: [
        {
          title: '초대장 보기',
          link: { webUrl: siteUrl, mobileWebUrl: siteUrl },
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
        size="lg"
        onClick={handleShare}
        disabled={!ready}
        className="w-full bg-black text-[#FEF400]"
      >
        카카오톡으로 공유하기
      </Button>
    </>
  );
}
