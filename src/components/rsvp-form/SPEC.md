## RSVP Form

- Location: `/`, creates rsvp via `createRSVP` server action

### Fields

| Field | Component     | Label                           | Default                              |
| ----- | ------------- | ------------------------------- | ------------------------------------ |
| side  | RadioGroup    | 신랑측 / 신부측                 | 신랑측                               |
| name  | Input         | 이름                            | (empty)                              |
| meal  | Select        | 식사 여부: 식사함 / 안함 / 미정 | (empty, placeholder "선택해 주세요") |
| count | Input[number] | 참석 인원 (본인포함)            | 1                                    |

### Validation

- All required, count >= 1

### Visibility

- `enabled: boolean` (from `getUiFlag("rsvp")`)
- disabled → entire form disabled via `<fieldset disabled>`; muted reason line shown ("지금은 참석여부 전달을 받고 있지 않습니다")

### Feedback

- Success: alert "제출되었습니다", reset form
- Failure: alert "제출에 실패했습니다"
