'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [playing, setPlaying] = useState(false);

  function handleSplash() {
    setShowSplash(false);
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => {});
  }

  function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/bg.mp3" loop preload="auto" />

      {showSplash && (
        <div
          className="fixed inset-0 z-50 cursor-pointer"
          onClick={handleSplash}
        >
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-body text-foreground/70 animate-pulse">
            화면을 터치해 주세요.
          </p>
        </div>
      )}

      {!showSplash && (
        <button
          onClick={toggle}
          aria-label={playing ? '음악 일시정지' : '음악 재생'}
          className="fixed bottom-4 right-4 z-40 flex size-12 items-center justify-center rounded-full bg-foreground shadow-md transition-all hover:brightness-90"
        >
          {playing ? (
            <Volume2 className="size-5 text-white" />
          ) : (
            <VolumeX className="size-5 text-white" />
          )}
        </button>
      )}
    </>
  );
}
