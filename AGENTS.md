<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Project

Wedding invitation site for 이한율 & 김지연.

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui (base-ui), motion, Drizzle ORM (Neon Postgres), NextAuth v4.

## Specs

All feature specs in `spec.md` → follow nested SPEC.md links. Read relevant spec before implementing or modifying any component.

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`

## Conventions

- Server actions, no REST routes
- Client components: `"use client"` directive
- Env vars: `NEXT_PUBLIC_*` for client, rest server-only
- All spec TBDs = placeholder. Ask before assuming values.
- Korean UI text. Comments and code in English.
