## Bank Accounts

- Location: `/`, button → Dialog with account numbers + copy
- Used twice: 신랑측, 신부측

### Props

- `label: string` — "신랑측" / "신부측"
- `accounts: BankAccount[]` — `{ name, bank, account, holder }`
- `children: ReactNode` — button text

### UI

- Button: shadcn outline. Dialog title: "{label} 계좌번호"
- Entry: name (holder), bank + account, copy button
- Copy: `navigator.clipboard.writeText(account)` → alert "복사되었습니다"

### Placeholder

```
신랑측: 신랑|신한|110123456789|김한율, 신랑 어머니|국민|220123456789|이순자
신부측: 신부|우리|330123456789|박지연, 신부 어머니|농협|440123456789|최영희
```
