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
- When clicked each image, open up as fullscreen
- Has "사진 전체보기" button which shows overview of playlist images within modal

#### Bank account number viewer

- locates at `/`
- A button opens up a modal that has bank account number and click to copy to clipboard function

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

## Backend Components

#### Auth

- Use https://next-auth.js.org/configuration/providers/credentials
- only username and passwords are allowed
- username and password saved at database as admin_credentials

## Database Objects

## admin_credentials

- id: integer
- username: string
- password: string
- created_at: Datetime
- updated_at: Datetime

### ui_flags

- id: integer
- name: string
- enabled: boolean
- created_at: Datetime
- updated_at: Datetime

### rsvp

- id: integer
- side: "groom" | "bride"
- name: string
- meal: "yes" | "no" | "undecided"
- count: integer
- created_at: Datetime
- updated_at: Datetime

<!-- BEGIN:Ignore from spec -->

## Refs

- https://github.com/juhonamnam/wedding-invitation
<!-- AFTER:Ignore from spec -->
