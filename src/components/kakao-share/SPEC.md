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
- Label: "카카옆으로 공유하기"
- Full width

### On Click

Calls `Kakao.Share.sendDefault` with `objectType: 'location'`:

```
objectType: 'location'
content:
  title: '결혼식에 초대합니다'
  description: 'ㅁㅁㅁ과 ㅁㅁㅁ의 결혼식에 초대합니다. 함께 축하해주세요!'
  imageUrl: ${URL}/gallery-example-1.png
  link:
    webUrl: URL
    mobileWebUrl: URL
address: '경기도 성남시 수정구 시흥동 63-5'
addressTitle: '메종디탈리'
buttons:
  [0]: title: "초대장 보기", link: { webUrl: URL, mobileWebUrl: URL }
installTalk: true
```

Where `URL` = `https://wedding-hanyul-jiyeon.vercel.app` (hardcoded)

### Props

None (self-contained client component)

### TBD

- title, description, imageUrl content
- NEXT_PUBLIC_KAKAO_JS_KEY value
