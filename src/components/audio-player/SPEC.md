## AudioPlayer

- Location: `/`, floating component rendered once in page root
- Plays `/bg.mp3` (loop, preload auto) on first user gesture

### Splash

- Transparent overlay (`bg-transparent`) covers entire viewport on page load
- Bottom hint text: "터치하여 시작합니다" (fadeIn animation)
- Click anywhere → dismiss splash + start audio playback
- Purpose: satisfy browser autoplay policy (user gesture required)

### Floating toggle

- Fixed `bottom-4 right-4`, round white button with shadow
- Shows `Volume2` icon when playing, `VolumeX` icon when paused
- Click → toggle play/pause
- `aria-label`: "음악 일시정지" / "음악 재생"

### Audio

- `<audio>` element, `src="/bg.mp3"`, `loop`, `preload="auto"`
- No muted preload trick (click-to-play is the only trigger)

### Props

None (self-contained)
