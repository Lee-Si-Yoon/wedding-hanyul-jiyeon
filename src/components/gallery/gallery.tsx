'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Gallery({ images }: { images: string[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    if (fullscreenIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreenIndex(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [fullscreenIndex]);

  function handleThumbnailClick(index: number) {
    setDialogOpen(false);
    setTimeout(() => api?.scrollTo(index), 100);
  }

  return (
    <div className="space-y-4 w-full">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
      >
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={src} className="basis-full">
              <div
                className="relative w-full aspect-[3/4] cursor-pointer"
                onClick={() => setFullscreenIndex(i)}
              >
                <Image src={src} alt={`사진 ${i + 1}`} fill sizes="(max-width:448px) 100vw, 448px" className="object-cover" priority={i === 0} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <div className="flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${i === current ? 'bg-foreground' : 'bg-foreground/30'}`}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>

      <Button variant="outline" className="w-full" onClick={() => setDialogOpen(true)}>
        사진 전체보기
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>사진 전체보기</DialogTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {images.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[3/4] cursor-pointer"
                onClick={() => handleThumbnailClick(i)}
              >
                <Image src={src} alt={`사진 ${i + 1}`} fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover rounded" />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {fullscreenIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-pointer"
          onClick={() => setFullscreenIndex(null)}
        >
          <div className="relative w-full h-full">
            <Image
              src={images[fullscreenIndex]}
              alt={`사진 ${fullscreenIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain cursor-pointer"
              onClick={() => setFullscreenIndex(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
