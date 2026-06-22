## RSVP Toggle

- Location: `/admin`, toggles `ui_flags.enabled` where `name="rsvp"`, updates `updated_at`

### Props

- `enabled: boolean` — from `getUiFlag("rsvp")`
- `updatedAt: string | null` — pre-formatted server-side (`timeZone: 'Asia/Seoul'`)

### UI

- shadcn Switch, label "RSVP 활성화" / "RSVP 비활성화"
- Toggle → `updateUiFlagAction("rsvp", value)`
- Renders "업데이트: {updatedAt}"

### Behavior

- Optimistic update, revert on error
- Switch disabled while action in flight
