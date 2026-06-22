## Kakao Share Button

- located at `/`
- Client component ("use client")
- Uses `Kakao.Share.sendDefault` (objectType: location) to share wedding info via KakaoTalk
- Kakao JS SDK: https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js

### SDK Setup

- `<Script src="...kakao.min.js" strategy="afterInteractive" onLoad={handleLoad}>` in component
- `NEXT_PUBLIC_KAKAO_JS_KEY` env var required (Kakao app JavaScript key)
- `Kakao.init(NEXT_PUBLIC_KAKAO_JS_KEY)` called inside `onLoad` callback (guard: `!Kakao.isInitialized()`)
- `ready` state: set true after init, button disabled until ready

### UI

- shadcn Button (variant="outline")
- Label: "카카오톡으로 공유하기"
- Full width

### On Click

Calls `Kakao.Share.sendDefault` with `objectType: 'location'`, using props for all content:

```
objectType: 'location'
content:
  title: title prop
  description: description prop
  imageUrl: imageUrl prop
  link:
    webUrl: siteUrl
    mobileWebUrl: siteUrl
address: address prop
addressTitle: addressTitle prop
buttons:
  [0]: title: "초대장 보기", link: { webUrl: siteUrl, mobileWebUrl: siteUrl }
installTalk: true
```

### Props

| Prop | Type | Description |
|---|---|---|
| `siteUrl` | `string` | Wedding site URL |
| `address` | `string` | Wedding hall address |
| `addressTitle` | `string` | Venue name |
| `title` | `string` | Share message title |
| `description` | `string` | Share message description |
| `imageUrl` | `string` | Share card preview image URL |

### TBD

- NEXT_PUBLIC_KAKAO_JS_KEY value
