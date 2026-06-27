## Calendar

- Location: `/`, client component
- shadcn Calendar (base-nova) backed by `react-day-picker` + `date-fns`
- Display-only: `mode="single"`, `selected={target}`, `hideNavigation`, `captionLayout="label"`, fixed to wedding month
- Korean locale via `date-fns/locale` (`ko`)

### D-day countdown

- Live ticking `setInterval(1000)`, isolated in `DdayCountdown` sub-component so the calendar grid does not re-render at 1Hz
- Before target: `D-{days} HH:MM:SS` (24h-based; `D-day` when <24h remain)
- At/past target: `D-day` (no countdown)

### Props

| Prop       | Type   | Format                                           |
| ---------- | ------ | ------------------------------------------------ |
| targetDate | string | `YYYY-MM-DDTHH:MM:SS` (local time, no tz offset) |

### Dependencies

- `react-day-picker@^10`
- `date-fns@^4` (transitive via react-day-picker)

### TBD

- Real wedding date (currently hardcoded `WEDDING_AT` in `src/app/page.tsx`)
