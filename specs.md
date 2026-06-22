## Use skills

- caveman
- ponytail

## Software Stacks

- pnpm
- nextjs
- Tailwindcss
- Shadcn/ui
- nextauth
- navermaps
- kakao sdk
- neondb
- drizzle orm

## Routes

- `/`: index
- `/admin`: admin page, requires auth

## Frontend Components

#### Map

- locates at `/`
- Uses https://navermaps.github.io/maps.js.ncp/ to render map
- Has 1 marker to locate the wedding hall, positioned by latitude/longitude coordinates (not place ID)
- Has share buttons with redirects user to the location of the wedding hall
  - https://map.naver.com/p/entry/place/{id}
  - https://map.kakao.com/?itemId={id}
- Note: place IDs are only for share link URLs, not used by the maps JS API for rendering

#### Gallery

- locates at `/`
- Uses https://ui.shadcn.com/docs/components/radix/carousel to render carousel
- Autoplay enabled, next image at every 2s
- When clicked each image, open up as fullscreen using shadcn carousel
- Has "사진 전체보기" button which shows overview of playlist images within modal
- Images are stored in the `public/` directory

#### Bank account number viewer

- locates at `/`
- A button opens up a modal that has bank account number and click to copy to clipboard function
- Hardcoded list of people on frontend side:
  - name: string (e.g. "신랑 측")
  - bank: string (e.g. "신한")
  - account: string (e.g. "123-456")
  - holder: string (e.g. "김한율")

#### RSVP - form

- located at `/`
- Creates rsvp row when user submits the form
- Uses Next.js server actions
- `count` field = total accompanying guests including the respondent (min=1, no max)

#### Share by Kakao Button

- Uses https://developers.kakao.com/sdk/reference/js/release/Kakao.Share.html#.sendDefault
- Shares wedding information
- Template fields (title, description, image, buttons): TBD (placeholder)

#### RSVP - toggle

- located at `/admin`
- Toggles RSVP form component by flipping `enabled` on the `ui_flags` row where `name = "rsvp"`, also updates `updated_at`
- If enabled, shows RSVP form. If disabled, hides RSVP form.
- Renders last_updated_at together

#### RSVP - list

- located at `/admin`
- Table view of rsvp
- Renders summary
  - total count of rsvp
  - total number of meal = yes
  - total number of meal = undecided
  - total number of side = groom and side = bride
  - last_updated_at: Datetime of lastly added rsvp object

## Backend Components

#### Auth

- Use NextAuth.js v4 (next-auth, stable)
- Credentials provider only
- authorize callback: query admin_credentials by username where deleted_at is null, bcrypt compare password, return user or null
- JWT session strategy (required by Credentials provider)
- NEXTAUTH_SECRET env var required (encrypts JWT, signs cookies/CSRF tokens)
- Route Handler at app/api/auth/[...nextauth]/route.ts
- Default sign-in page at /api/auth/signin
- No middleware — session check in admin server actions and layout via getServerSession()

#### Server Actions

Use Next.js server actions as the primary API approach (no REST routes)

**Public:**

- createRSVP({ side, name, meal, count }) → insert rsvp row
  - all fields required, count >= 1, no max length for name
- getUiFlag({ name }) → returns { enabled, updatedAt } or null

**Admin-only (guard: getServerSession() check, redirect if no session):**

- deleteRSVP({ id }) → soft delete (set deleted_at = now)
- updateUiFlag({ name, enabled }) → flip enabled, update updated_at
- getRSVPList() → returns rows where deleted_at is null
- getRSVPSummary() → returns { total, mealYes, mealUndecided, sideGroom, sideBride, lastUpdatedAt }

**Auth (handled by NextAuth, not custom actions):**

- signIn → via signIn("credentials", { username, password }) from next-auth/react
- signOut → via signOut() from next-auth/react

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

## TBD

- Wedding details (date, time, venue name, address, greeting message)
- Naver Map lat/lng coordinates and place IDs
- Kakao Share template fields
- NEXTAUTH_SECRET value (generate with `openssl rand -base64 32`)

<!-- BEGIN:Ignore from spec -->

## Refs

- https://github.com/juhonamnam/wedding-invitation
<!-- AFTER:Ignore from spec -->
