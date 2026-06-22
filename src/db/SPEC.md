## Database Objects

### admin_credentials

- id: integer
- username: string
- password: string (bcrypt hashed)
- created_at: Datetime
- updated_at: Datetime
- deleted_at: Datetime (nullable, null = active)

### ui_flags

- id: integer
- name: string (e.g. "rsvp")
- enabled: boolean
- created_at: Datetime
- updated_at: Datetime

### rsvp

- id: integer
- side: "groom" | "bride"
- name: string
- meal: "yes" | "no" | "undecided"
- count: integer (total guests including respondent, min=1)
- created_at: Datetime
- deleted_at: Datetime (nullable, null = active)

## Queries

### Public

#### createRSVP({ side, name, meal, count })

- Input: all required, count >= 1, no max length for name
- Operation: insert into rsvp
- Returns: inserted row

#### getUiFlag({ name })

- Operation: select from ui_flags where name = {name}
- Returns: { enabled, updatedAt } or null

### Admin-only

#### deleteRSVP({ id })

- Operation: update rsvp set deleted_at = now() where id = {id}
- Returns: void

#### updateUiFlag({ name, enabled })

- Operation: update ui_flags set enabled = {enabled}, updated_at = now() where name = {name}
- Returns: updated row

### getRSVPList()

- Operation: select from rsvp where deleted_at is null
- Returns: array of rsvp rows

### getRSVPSummary()

- Operation: aggregate query on rsvp where deleted_at is null
- Returns: { total, mealYes, mealUndecided, sideGroom, sideBride, lastUpdatedAt }

### Auth query (used by NextAuth authorize callback)

#### getAdminByUsername({ username })

- Operation: select from admin_credentials where username = {username} and deleted_at is null
- Returns: user row or null (bcrypt compare done in authorize callback)
