'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { LockIcon, UnlockIcon, MapPinIcon, NavigationIcon } from 'lucide-react';

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (
          el: HTMLElement | string,
          opts?: object
        ) => { destroy: () => void };
        LatLng: new (lat: number, lng: number) => unknown;
        Marker: new (opts: object) => unknown;
        InfoWindow: new (opts: object) => {
          open: (map: unknown, marker: unknown) => void;
        };
      };
    };
  }
}

const NCP_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
const LAT = 37.4196541;
const LNG = 127.1076838;
const NMAP_PLACE_ID = 1950859773;
const KMAP_PLACE_ID = 843214968;

function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [locked, setLocked] = useState(true);
  const [showLockMsg, setShowLockMsg] = useState(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleLoad() {
    if (!window.naver) return;
    setReady(true);
  }

  useEffect(() => {
    if (!ready || !mapRef.current || !window.naver) return;

    const center = new window.naver.maps.LatLng(LAT, LNG);
    const map = new window.naver.maps.Map(mapRef.current, {
      center,
      zoom: 18,
    });

    const marker = new window.naver.maps.Marker({
      position: center,
      map,
    });

    const info = new window.naver.maps.InfoWindow({
      content: '<div style="padding:4px 8px;font-size:13px;">메종디탈리</div>',
      borderWidth: 0,
     disableAnchor: true,
    });
    info.open(map, marker);

    return () => {
      map.destroy();
    };
  }, [ready]);

  function flashLockMsg() {
    if (lockTimer.current) clearTimeout(lockTimer.current);
    setShowLockMsg(true);
    lockTimer.current = setTimeout(() => setShowLockMsg(false), 3000);
  }

  function openNaver() {
    if (isMobile()) {
      window.open(`nmap://place?id=${NMAP_PLACE_ID}`, '_self');
    } else {
      window.open(
        `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`,
        '_blank'
      );
    }
  }

  function openKakao() {
    window.open(`https://map.kakao.com/?itemId=${KMAP_PLACE_ID}`, '_blank');
  }

  if (!NCP_KEY) return null;

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NCP_KEY}`}
        strategy="afterInteractive"
        onLoad={handleLoad}
      />
      <div className="relative">
        {locked && (
          <div
            className="absolute inset-0 z-10"
            onTouchStart={flashLockMsg}
            onMouseDown={flashLockMsg}
          >
            {showLockMsg && (
              <div className="flex items-center gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white rounded-lg px-4 py-3 text-sm whitespace-nowrap">
                <LockIcon className="size-4" />
                자물쇠 버튼을 눌러
                <br />
                터치 잠금 해제 후 확대 및 이동해 주세요.
              </div>
            )}
          </div>
        )}
        <button
          className={`absolute top-3 right-3 z-20 rounded-full p-2 shadow-md ${locked ? 'bg-white' : 'bg-white/80'}`}
          onClick={() => {
            if (lockTimer.current) clearTimeout(lockTimer.current);
            setShowLockMsg(false);
            setLocked((v) => !v);
          }}
        >
          {locked ? (
            <LockIcon className="size-4" />
          ) : (
            <UnlockIcon className="size-4" />
          )}
        </button>
        <div ref={mapRef} className="w-full h-64" />
      </div>
      <div className="flex gap-2 mt-3">
        <Button variant="outline" className="flex-1" onClick={openNaver}>
          <MapPinIcon className="size-4" />
          네이버 지도
        </Button>
        <Button variant="outline" className="flex-1" onClick={openKakao}>
          <NavigationIcon className="size-4" />
          카카오 지도
        </Button>
      </div>
    </>
  );
}
