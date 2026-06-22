## Routes

- `/`: index (public)
- `/admin`: admin page (auth required) → See [Auth Spec](./src/app/api/auth/SPEC.md)

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

→ See [RSVP Form Spec](./src/components/rsvp-form/SPEC.md)

#### Share by Kakao Button

- located at `/`
- Uses https://developers.kakao.com/sdk/reference/js/release/Kakao.Share.html#.sendDefault
- shares wedding information
- Template fields (title, description, image, buttons): TBD (placeholder)

#### RSVP - toggle

→ See [RSVP Toggle Spec](./src/components/rsvp-toggle/SPEC.md)

#### RSVP - list

→ See [RSVP List Spec](./src/components/rsvp-list/SPEC.md)

## Backend Components

#### Auth

→ See [Auth Spec](./src/app/api/auth/SPEC.md)

#### Server Actions

Use Next.js server actions as the primary API approach (no REST routes)

**Public:**

- createRSVP
- getUiFlag

**Admin-only (guard: getServerSession() check, redirect if no session):**

- deleteRSVP
- updateUiFlag
- getRSVPList
- getRSVPSummary

**Auth:** → See [Auth Spec](./src/app/api/auth/SPEC.md)

→ See [Database Objects & Queries](./src/db/SPEC.md) for schemas and query details

## TBD

- Wedding details (date, time, venue name, address, greeting message)
- Naver Map lat/lng coordinates and place IDs
- Kakao Share template fields

<!-- BEGIN:Ignore from spec -->

## Refs

- https://github.com/juhonamnam/wedding-invitation
<!-- AFTER:Ignore from spec -->
