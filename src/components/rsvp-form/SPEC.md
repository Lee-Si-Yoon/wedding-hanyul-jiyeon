## RSVP Form

- located at `/`
- Creates rsvp row when user submits the form
- Uses Next.js server actions (`createRSVP` from `@/db/actions`)

### Fields

| Field | Component | Label | Default |
|---|---|---|---|
| side | RadioGroup | 신랑측 / 신부측 | 신랑측 |
| name | Input | 이름 | (empty) |
| meal | Select | 식사 여부: 식사함 / 안함 / 미정 | 식사함 |
| count | Input[type=number] | 참석 인원 (본인포함) | 1 |

### Validation

- All fields required
- count >= 1

### Visibility

- Props: `enabled: boolean` (from `getUiFlag("rsvp")`)
- When `enabled = true`: form fully functional
- When `enabled = false`: form visible, submit button disabled

### Submit feedback

- On success: `window.alert("제출되었습니다")`, reset form to defaults
- On failure: `window.alert("제출에 실패했습니다")`
