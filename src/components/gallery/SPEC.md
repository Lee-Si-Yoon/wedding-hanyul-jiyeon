## Gallery

- located at `/`
- Uses shadcn Carousel (embla-carousel-react) + Autoplay plugin
- Autoplay: 2s delay, loop, stopOnInteraction: true
- Full-width carousel, one image per slide
- Mixed aspect ratios handled with next/image fill + object-cover
- Dot indicators below carousel show current slide, clickable to navigate

### Fullscreen

- Click image in carousel → fullscreen overlay (fixed, black bg, object-contain)
- Click image again or Escape → close fullscreen
- No navigation arrows in fullscreen

### "사진 전체보기" button

- Opens shadcn Dialog with responsive grid (2 cols mobile, 3 cols desktop)
- Click thumbnail → close dialog, scroll carousel to that image

### Props

- `images: string[]` — array of image paths (e.g. ['/gallery-example-1.png', ...])
- Stored in `public/` directory
- Replace with actual wedding photos for production
