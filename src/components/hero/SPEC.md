## Hero

- Location: `/`, client component (`src/components/hero/hero.tsx`)
- motion (motion/react) staggered entrance, `MotionConfig reducedMotion="user"`
- SSR ships `opacity:0`; JS required for entrance (hero is one-time, all guests have JS)

### Props

| Prop | Type |
|---|---|
| groomName | string |
| brideName | string |
| dateSpaced | string |
| weekday | string |
| timeStr | string |
| placeName | string |

### Motion

- Container variant staggerChildren 0.08
- Item variant: `opacity:0 y:10` → `opacity:1 y:0`, duration 0.8, ease `[0.22,1,0.36,1]`
- 5 items in order: eyebrow, h1, date, meta, scroll-cue
