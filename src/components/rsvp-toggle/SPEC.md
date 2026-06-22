## RSVP Toggle

- located at `/admin`
- Toggles RSVP form component by flipping `enabled` on the `ui_flags` row where `name = "rsvp"`, also updates `updated_at`
- If enabled, shows RSVP form. If disabled, hides RSVP form (submit button disabled)
- Renders last_updated_at together

### Props

- `enabled: boolean` — current state from `getUiFlag("rsvp")`
- `updatedAt: string | null` — last updated timestamp (pre-formatted server-side with `timeZone: 'Asia/Seoul'` to avoid hydration mismatch)

### UI

- shadcn Switch component
- Label: "RSVP 활성화" / "RSVP 비활성화"
- On toggle: calls `updateUiFlagAction("rsvp", value)` server action
- Renders: "업데이트: {updatedAt}" formatted as Korean locale

### Behavior

- Optimistic update: UI toggles immediately, reverts on error
- Pending state: switch disabled while action in flight
