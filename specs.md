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

→ See [Gallery Spec](./src/components/gallery/SPEC.md)

#### Bank account number viewer

→ See [Bank Accounts Spec](./src/components/bank-accounts/SPEC.md)

#### RSVP - form

→ See [RSVP Form Spec](./src/components/rsvp-form/SPEC.md)

#### Share by Kakao Button

→ See [Kakao Share Spec](./src/components/kakao-share/SPEC.md)

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
