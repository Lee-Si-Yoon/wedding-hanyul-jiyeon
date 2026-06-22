## Gallery

- Location: `/`, shadcn Carousel (embla-carousel-react) + Autoplay (2s, loop, stopOnInteraction)
- Full-width, one image/slide, mixed aspect ratios (next/image fill + object-cover)
- Dot indicators, clickable

### Fullscreen

- Click image → overlay (fixed, black bg, object-contain)
- Click again / Escape → close. No nav arrows.

### "사진 전체보기" button

- shadcn Dialog, grid (2 cols mobile, 3 cols desktop)
- Click thumbnail → close dialog, scroll carousel to image

### Props

- `images: string[]` — paths in `public/`
