## Map

- Location: `/`, client component
- Naver Maps JS SDK via `<Script onLoad>`, env `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`
- Map: `naver.maps.Map(ref, { center, zoom: 18 })`, Marker at center
- InfoWindow: always open, `placeName` prop, `borderWidth: 0`, `disableAnchor: true`
- Cleanup: `map.destroy()` on unmount

### Scroll Lock

- Default locked. Overlay blocks map, shows "자물쇠 버튼을 눌러 터치 잠금 해제 후 확대 및 이동해 주세요." (3s auto-hide)
- Toggle: top-right button, LockIcon/UnlockIcon (lucide-react)

### Share Buttons

`<a>` links via shadcn Button (`nativeButton={false}`), preload-ready:

| Button | href |
|---|---|
| 네이버 지도 | `https://map.naver.com/p/entry/place/{nmapPlaceId}` |
| 카카오 지도 | `https://map.kakao.com/?itemId={kmapPlaceId}` |

### Props

| Prop | Type |
|---|---|
| lat | number |
| lng | number |
| placeName | string |
| nmapPlaceId | number |
| kmapPlaceId | number |

### TBD

- NEXT_PUBLIC_NAVER_MAP_CLIENT_ID
