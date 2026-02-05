# Cville STR Advocates – Developer Guide

## Stack
- Next.js 16 (App Router, React 19, TypeScript)
- Supabase (Postgres + RLS) for supporters/petition data
- shadcn/ui + Tailwind v4; Vercel Analytics
- Resend for transactional email

## App Structure (key routes)
- `app/(public)/` – public site: home (with action alerts, platform, evidence, FAQ preview), about (includes FAQ), news (list/detail), petition (flagged), unsubscribe
- `app/admin/` – placeholders for dashboard/supporters/petitions (protect before prod)
- `app/actions/` – server actions for subscribe, petition, unsubscribe, CSV export

## UI & Components
- Layout in `components/layout/` (Header with feature-flagged petition link, MobileNav, Footer)
- Forms in `components/forms/` (EmailSignup two-step, PetitionForm, UnsubscribeForm)
- Rich text renderer in `components/RichText.tsx` (handles markdown-style formatting)
- shadcn/ui components under `components/ui/` (accordion, tabs, dialog, navigation-menu, sheet, checkbox, etc.)

## Content
- All content is inlined in `lib/content.ts` (pages, posts, evidence items, action alerts, FAQs, site settings)
- Content is static at build time - no CMS or runtime queries needed

## Supabase
- Tables (migration applied): `supporters`, `petition_signatures` with RLS enabled and anonymous insert policies
- Clients:
  - Browser: `lib/supabase/client.ts` (`@supabase/ssr` createBrowserClient)
  - Server (cookies): `lib/supabase/server.ts` (`@supabase/ssr` createServerClient)
- Admin operations use the server client (protected by password authentication)

## Forms & Email
- Email/signup actions send Resend emails (welcome, petition confirmation)
- Feature flag in `lib/flags.ts`: `petitionEnabled` (controls nav and `/petition` access)

## Environment Variables
Required (public):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- `NEXT_PUBLIC_PETITION_ENABLED` (true/false)

Required (server):
- `RESEND_API_KEY`
- `RESEND_FROM` (sender address)

## Dev Commands
- Install: `pnpm install`
- Lint: `pnpm lint`
- Dev server: `pnpm dev`

## Notes
- Admin dashboard is password-protected via `ADMIN_PASSWORD` env var (set in production).
- Petition page 404s unless `NEXT_PUBLIC_PETITION_ENABLED=true`.
- Admin operations require RLS policies that allow reads (supporters table already has "Allow anonymous select" policy).
