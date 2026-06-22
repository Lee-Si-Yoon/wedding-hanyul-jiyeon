## Use skills

- caveman
- ponytail

## Software Stacks

- pnpm
- Next.js app
- Tailwindcss
- Shadcn/ui

## Routes

- `/`: index
- `/admin`: admin page, requires auth

## Frontend Components

#### Map

- locates at `/`
- Uses https://navermaps.github.io/maps.js.ncp/ to render map
- Has 1 marker to locate the wedding hall
- Has share buttons with redirects user to the location of the wedding hall
  - https://map.naver.com/p/entry/place/{id}
  - https://map.kakao.com/?itemId={id}

#### Gallery

- locates at `/`
- Uses https://ui.shadcn.com/docs/components/radix/carousel to render carousel
- Autoplay enabled, next image at every 2s
- When clicked each image, zooms to fullscreen
- Has "사진 전체보기" button which shows overview of playlist images within modal

#### RSVP - form

- located at `/`
- Creates rsvp row when user submits the form.

#### Share by Kakao Button

- Uses https://developers.kakao.com/sdk/reference/js/release/Kakao.Share.html#.sendDefault
- Shares wedding information

#### RSVP - toggle

- located at `/admin`
- Toggles `RSVP - from` component, if enabled updates `ui_rsvp` object to enabled = true and last_updated_at. If disabled, hides `RSVP - form` component.
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

## Database Objects

## admin_credentials

- id: integer
- email: string(Email)
- password: string
- created_at: Datetime

### ui_rsvp

- enabled: boolean
- last_updated_at: Datetime

### rsvp

- id: integer
- side: "groom" | "bride"
- name: string
- meal: "yes" | "no" | "undecided"
- count: integer
- created_at: Datetime

<!-- IGNORE AFTER -->

## Refs

- https://github.com/juhonamnam/wedding-invitation
<!-- -->
