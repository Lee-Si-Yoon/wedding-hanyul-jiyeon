## Map

- located at `/`
- Client component ("use client")
- Uses Naver Maps JS SDK (https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=...)
- Renders a map with 1 marker (+ InfoWindow label) at the wedding hall position (lat/lng)
- Has share buttons that redirect user to the wedding hall location

### SDK Setup

- `<Script src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}" strategy="afterInteractive" onLoad={handleLoad}>` in component
- `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` env var required (NCP Client ID)
- No init needed — Naver Maps SDK is synchronous, `window.naver` available after script load

### Map

- Container: `<div ref={ref}>` with full width, fixed height
- `new naver.maps.Map(ref.current, { center, zoom: 18 })`
- Marker: `new naver.maps.Marker({ position, map })`
- InfoWindow (always open): label from `placeName` prop, `borderWidth: 0`, `disableAnchor: true`
- Cleanup: `map.destroy()` on unmount

### Scroll Lock

- Mobile: map scroll conflicts with page scroll
- Default state: locked (overlay blocks map interaction)
- Locked overlay: transparent div, on touch/mousedown shows message "자물쇠 버튼을 눌러 터치 잠금 해제 후 확대 및 이동해 주세요." (auto-hides after 3s)
- Lock/unlock button: toggle button positioned on map (top-right), LockIcon / UnlockIcon (lucide-react)

### Share Buttons

Two shadcn Button (variant="outline") below the map, each opens the wedding hall location in a map app:

| Button | Mobile | Desktop |
|---|---|---|
| 네이버 지도 | `nmap://place?id={nmapPlaceId}` (deep link, `_self`) | `https://map.naver.com/p/entry/place/{nmapPlaceId}` (`_blank`) |
| 카카오 지도 | `https://map.kakao.com/?itemId={kmapPlaceId}` (`_blank`) | `https://map.kakao.com/?itemId={kmapPlaceId}` (`_blank`) |

- Uses `navigator.userAgent` match to detect iOS/Android vs desktop
- `window.open(url, '_blank')` for all links except nmap deep link (`_self`)

### Props

| Prop | Type | Description |
|---|---|---|
| `lat` | `number` | Wedding hall latitude |
| `lng` | `number` | Wedding hall longitude |
| `placeName` | `string` | Venue name (shown in InfoWindow) |
| `nmapPlaceId` | `number` | Naver Map place ID (share link) |
| `kmapPlaceId` | `number` | Kakao Map place ID (share link) |

### TBD

- NEXT_PUBLIC_NAVER_MAP_CLIENT_ID value
