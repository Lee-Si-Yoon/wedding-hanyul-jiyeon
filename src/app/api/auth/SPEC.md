## Auth

- NextAuth.js v4 (next-auth, stable)
- Credentials provider only
- authorize callback: query admin_credentials by username where deleted_at is null, bcrypt compare password, return user or null
- JWT session strategy (required by Credentials provider)
- NEXTAUTH_SECRET env var required (encrypts JWT, signs cookies/CSRF tokens)
- Route Handler at app/api/auth/[...nextauth]/route.ts
- Default sign-in page at /api/auth/signin (do not set pages.signIn config — causes redirect loop with App Router)
- No middleware — session check in admin layout via getServerSession()

## Routing

- `/admin`: auth required
  - Unauthenticated → server-side redirect to `/api/auth/signin?callbackUrl=/admin`
  - Auth check in admin layout via getServerSession(), redirects if no session
  - After login → redirect to `/admin` (callbackUrl)
  - After signOut → redirect to `/api/auth/signin` (via redirectTo option)

## Layout

- Admin layout (`app/admin/layout.tsx`): wraps `/admin`, getServerSession() check, `<SessionProvider>`

## Admin-only guard

- Admin server actions: getServerSession() check at top, redirect if no session
- signIn → via signIn("credentials") from next-auth/react
- signOut → via signOut() from next-auth/react

## TBD

- NEXTAUTH_SECRET value (generate with `openssl rand -base64 32`)
