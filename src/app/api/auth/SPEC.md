## Auth

- NextAuth v4, Credentials provider, JWT session
- NEXTAUTH_SECRET env var required
- Route Handler: `app/api/auth/[...nextauth]/route.ts`
- Default sign-in: `/api/auth/signin` (do NOT set `pages.signIn` — redirect loop with App Router)
- No middleware — session check in admin layout via `getServerSession()`

### authorize

- Query `admin_credentials` by username where `deleted_at is null`, bcrypt compare

### Routing

- `/admin`: unauthenticated → redirect `/api/auth/signin?callbackUrl=/admin`
- After login → `/admin`. After signOut → `/api/auth/signin`

### Layout

- `app/admin/layout.tsx`: getServerSession() check, `<AuthProvider>` (SessionProvider wrapper)

### Admin guard

- Server actions: `getServerSession()` at top, redirect if null
- signIn/signOut from `next-auth/react`

### TBD

- NEXTAUTH_SECRET
