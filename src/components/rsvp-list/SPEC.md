## RSVP List

- Location: `/admin`, table + summary card

### Summary

- 총 참석자: total count
- 식사 / 미정 / 신랑측 / 신부측 counts
- 마지막 업데이트: last_updated_at (Korean locale)

### Table

- 이름, 측 (신랑측/신부측), 식사 (식사함/안함/미정), 인원, 등록일, 삭제

### Props

- `list: (SelectRsvp & { createdAtFormatted: string })[]` — `getRSVPList()`, dates pre-formatted (`timeZone: 'Asia/Seoul'`)
- `summary: { total, mealYes, mealUndecided, sideGroom, sideBride, lastUpdatedAt: string | null }` — `getRSVPSummary()`

### Delete

- Button per row (destructive), `confirm("정말 삭제하시겠습니까?")`, `deleteRSVPAction(id)` (soft delete)
