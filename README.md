# Charlottesville Host Alliance – Developer Guide

## Stack
- Next.js 16 (App Router, React 19, TypeScript)
- Sanity Studio embedded at `/studio` with custom schemas and GROQ helpers
- Supabase (Postgres + RLS) for supporters/petition data
- shadcn/ui + Tailwind v4; Vercel Analytics
- Resend for transactional email; Cloudflare Turnstile for spam protection

## App Structure (key routes)
- `app/(public)/` – public site: home (with action alerts, platform, evidence, FAQ preview), about (includes FAQ), news (list/detail), petition (flagged), unsubscribe
- `app/admin/` – placeholders for dashboard/supporters/petitions (protect before prod)
- `app/actions/` – server actions for subscribe, petition, unsubscribe, CSV export
- `app/api/revalidate/route.ts` – Sanity revalidation webhook

## UI & Components
- Layout in `components/layout/` (Header with feature-flagged petition link, MobileNav, Footer)
- Forms in `components/forms/` (EmailSignup two-step, PetitionForm, UnsubscribeForm)
- Portable Text renderer in `components/sanity/RichText.tsx`
- shadcn/ui components under `components/ui/` (accordion, tabs, dialog, navigation-menu, sheet, checkbox, etc.)

## Sanity
- Schemas in `sanity/schemaTypes/`: page, post, evidenceItem, event, actionAlert, faq, siteSettings, seo
- Queries in `lib/sanity/queries.ts` for all document types
- Seed script `scripts/seed-sanity.ts` populates starter content (requires SANITY_API_TOKEN)

## Supabase
- Tables (migration applied): `supporters`, `petition_signatures` with RLS enabled and anonymous insert policies
- Clients:
  - Browser: `lib/supabase/client.ts` (`@supabase/ssr` createBrowserClient)
  - Server (cookies): `lib/supabase/server.ts` (`@supabase/ssr` createServerClient)
- Admin operations use the server client (protected by password authentication)

## Forms & Anti-abuse
- Turnstile verification in `lib/turnstile.ts` (bypasses if `TURNSTILE_SECRET_KEY` unset for local dev)
- Email/signup actions send Resend emails (welcome, petition confirmation)
- Feature flag in `lib/flags.ts`: `petitionEnabled` (controls nav and `/petition` access)

## Environment Variables
Required (public):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `NEXT_PUBLIC_PETITION_ENABLED` (true/false)

Required (server):
- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM` (sender address)
- `SANITY_API_TOKEN` – **required for both seeding AND runtime queries** (even for public datasets)
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`
- Optional: `SANITY_REVALIDATE_SECRET` for `/api/revalidate`

## Dev Commands
- Install: `pnpm install`
- Lint: `pnpm lint`
- Dev server: `pnpm dev`

## Notes
- Admin dashboard is password-protected via `ADMIN_PASSWORD` env var (set in production).
- Petition page 404s unless `NEXT_PUBLIC_PETITION_ENABLED=true`.
- Admin operations require RLS policies that allow reads (supporters table already has "Allow anonymous select" policy).
