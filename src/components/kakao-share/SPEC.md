## Kakao Share

- Location: `/`, client component
- `<Script onLoad>` → `Kakao.init(NEXT_PUBLIC_KAKAO_JS_KEY)`, `ready` state, button disabled until ready
- Button: shadcn outline, "카카오톡으로 공유하기", full width

### sendDefault (objectType: location)

```
content: { title, description, imageUrl, link: { webUrl: siteUrl, mobileWebUrl: siteUrl } }
address, addressTitle
buttons: [{ title: "초대장 보기", link: { webUrl: siteUrl, mobileWebUrl: siteUrl } }]
installTalk: true
```

### Props

| Prop | Type |
|---|---|
| siteUrl | string |
| address | string |
| addressTitle | string |
| title | string |
| description | string |
| imageUrl | string |

### TBD

- NEXT_PUBLIC_KAKAO_JS_KEY
