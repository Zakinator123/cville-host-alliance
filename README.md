# Cville STR Advocates – Developer Guide

## Stack
- Next.js 16 (App Router, React 19, TypeScript)
- Supabase (Postgres + RLS) for supporter/email signup data
- shadcn/ui + Tailwind v4; Vercel Analytics
- Resend for transactional email

## App Structure (key routes)
- `app/(public)/` – public site: home (timeline, platform, evidence), about, news (list/detail), unsubscribe
- `app/admin/` – password-protected supporter dashboard
- `app/actions/` – server actions for subscribe, unsubscribe, CSV export

## UI & Components
- Layout in `components/layout/` (Header, MobileNav, Footer)
- Forms in `components/forms/` (EmailSignup two-step, UnsubscribeForm)
- Rich text renderer in `components/RichText.tsx` (handles markdown-style formatting)
- shadcn/ui components under `components/ui/` (accordion, tabs, dialog, navigation-menu, sheet, checkbox, etc.)

## Content
- All content is inlined in `lib/content.ts` (pages, posts, evidence items, site settings)
- Content is static at build time - no CMS or runtime queries needed

## Supabase
- Table (migration applied): `supporters` with RLS enabled and anonymous insert policy
- The legacy `petition_signatures` table is still in the schema but no longer referenced by the app
- Clients:
  - Browser: `lib/supabase/client.ts` (`@supabase/ssr` createBrowserClient)
  - Server (cookies): `lib/supabase/server.ts` (`@supabase/ssr` createServerClient)
- Admin operations use the server client (protected by password authentication)

## Forms & Email
- Email/signup actions send a welcome email via Resend

## Environment Variables
Required (public):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

Required (server):
- `RESEND_API_KEY`
- `RESEND_FROM` (sender address)

## Dev Commands
- Install: `pnpm install`
- Lint: `pnpm lint`
- Dev server: `pnpm dev`

## Notes
- Admin dashboard is password-protected via `ADMIN_PASSWORD` env var (set in production).
- Admin operations require RLS policies that allow reads (supporters table already has "Allow anonymous select" policy).
