## Bank Account Number Viewer

- located at `/`
- A button opens up a modal with bank account numbers and click-to-copy function
- Component used twice: once for 신랑측, once for 신부측

### Props

- `label: string` — e.g. "신랑측" / "신부측"
- `accounts: BankAccount[]` where `BankAccount = { name, bank, account, holder }`
- `children: React.ReactNode` — button text (e.g. "계좌번호 보기")

### UI

- Button: shadcn Button (outline), text via `children` prop
- Modal: shadcn Dialog, click outside to close
- Dialog title: "{label} 계좌번호"
- Each account entry shows: name (holder), bank + account (raw value), copy button
- Copy: `navigator.clipboard.writeText(account)` → `window.alert("복사되었습니다")`

### Placeholder data

```
신랑측:
  신랑 | 신한 | 110123456789 | 김한율
  신랑 어머니 | 국민 | 220123456789 | 이순자

신부측:
  신부 | 우리 | 330123456789 | 박지연
  신부 어머니 | 농협 | 440123456789 | 최영희
```

Replace with actual bank details for production.
