## Kakao Share Button

- located at `/`
- Client component ("use client")
- Uses `Kakao.Share.sendDefault` (objectType: feed) to share wedding info via KakaoTalk
- Kakao JS SDK: https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js

### SDK Setup

- `<Script src="...kakao.min.js" strategy="afterInteractive">` added to root layout (`src/app/layout.tsx`)
- `NEXT_PUBLIC_KAKAO_JS_KEY` env var required (Kakao app JavaScript key)
- `Kakao.init(NEXT_PUBLIC_KAKAO_JS_KEY)` called once in component `useEffect` (guard: `!Kakao.isInitialized()`)

### UI

- shadcn Button (variant="outline")
- Label: "카카오톡으로 공유하기"
- Full width

### On Click

Calls `Kakao.Share.sendDefault` with `objectType: 'feed'`:

```
objectType: 'feed'
content:
  title: TBD
  description: TBD
  imageUrl: TBD (hosted image URL for card preview)
  link:
    webUrl: window.location.origin (wedding site URL)
    mobileWebUrl: window.location.origin
buttons:
  [0]: title: "청첩장 보기", link: { webUrl: window.location.origin, mobileWebUrl: window.location.origin }
  [1]: title: "길 찾기", link: { webUrl: TBD, mobileWebUrl: TBD } (map URL — see Map component place IDs)
```

### Error Handling

- Guard `typeof window !== 'undefined'` before accessing `Kakao` global
- No-op if `Kakao` or `Kakao.Share` is undefined (SSR safety)

### Props

None (self-contained client component)

### TBD

- title, description, imageUrl (Kakao Share template content fields)
- "길 찾기" button link URL (depends on Naver/Kakao Map place ID)
- NEXT_PUBLIC_KAKAO_JS_KEY value
