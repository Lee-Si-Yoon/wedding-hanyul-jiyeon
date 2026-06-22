## Database

### admin_credentials

id: int | username: str | password: str (bcrypt) | created_at: dt | updated_at: dt | deleted_at: dt (nullable, null=active)

### ui_flags

id: int | name: str | enabled: bool | created_at: dt | updated_at: dt

### rsvp

id: int | side: "groom"|"bride" | name: str | meal: "yes"|"no"|"undecided" | count: int (min=1) | created_at: dt | deleted_at: dt (nullable)

## Public queries

- **createRSVP({ side, name, meal, count })** — insert rsvp, all required, count>=1
- **getUiFlag({ name })** — select ui_flags, returns { enabled, updatedAt } | null

## Admin queries

- **deleteRSVP({ id })** — soft delete (set deleted_at=now)
- **updateUiFlag({ name, enabled })** — update enabled + updated_at
- **getRSVPList()** — select rsvp where deleted_at is null
- **getRSVPSummary()** — aggregate, returns { total, mealYes, mealUndecided, sideGroom, sideBride, lastUpdatedAt }

## Auth query

- **getAdminByUsername({ username })** — select admin_credentials where deleted_at is null, bcrypt compare in authorize callback
