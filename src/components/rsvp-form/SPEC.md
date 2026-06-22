## RSVP Form

- Location: `/`, creates rsvp via `createRSVP` server action

### Fields

| Field | Component | Label | Default |
|---|---|---|---|
| side | RadioGroup | 신랑측 / 신부측 | 신랑측 |
| name | Input | 이름 | (empty) |
| meal | Select | 식사 여부: 식사함 / 안함 / 미정 | 식사함 |
| count | Input[number] | 참석 인원 (본인포함) | 1 |

### Validation

- All required, count >= 1

### Visibility

- `enabled: boolean` (from `getUiFlag("rsvp")`)
- disabled → submit button disabled

### Feedback

- Success: alert "제출되었습니다", reset form
- Failure: alert "제출에 실패했습니다"
