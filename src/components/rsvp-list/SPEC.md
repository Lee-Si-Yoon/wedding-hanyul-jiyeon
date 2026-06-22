## RSVP List

- located at `/admin`
- Table view of rsvp
- Renders summary card above table

### Summary

- 총 참석자: total count
- 식사: total number of meal = yes
- 미정: total number of meal = undecided
- 신랑측: total number of side = groom / 신부측: total number of side = bride
- 마지막 업데이트: last_updated_at formatted as Korean locale

### Table columns

- 이름 (name)
- 측 (side): 신랑측 / 신부측
- 식사 (meal): 식사함 / 안함 / 미정
- 인원 (count)
- 등록일 (createdAt): Korean locale date
- 삭제: delete button per row

### Props

- `list: SelectRsvp[]` — from `getRSVPList()` (excludes soft-deleted)
- `summary: { total, mealYes, mealUndecided, sideGroom, sideBride, lastUpdatedAt }` — from `getRSVPSummary()`

### Delete

- Delete button per row (shadcn Button, variant="destructive")
- Confirmation: `confirm("정말 삭제하시겠습니까?")`
- On confirm: calls `deleteRSVPAction(id)` server action (soft delete)
