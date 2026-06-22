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

- Use https://next-auth.js.org/configuration/providers/credentials
- only username and passwords are allowed
- username and password saved at database as admin_credentials
- Passwords are hashed with bcrypt before storing (never plaintext)

#### Server Actions

Use Next.js server actions as the primary API approach (no REST routes)

- create a rsvp
- - delete a rsvp (soft delete: set deleted_at to now)
- update a ui_flag
- get list of rsvp (exclude where deleted_at is not null)
- get a rsvp (exclude where deleted_at is not null)

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

<!-- BEGIN:Ignore from spec -->

## Refs

- https://github.com/juhonamnam/wedding-invitation
<!-- AFTER:Ignore from spec -->
