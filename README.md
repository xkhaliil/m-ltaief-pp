# Mohamed-Ali Ltaief — website

A Next.js site with a Cargo-style right-hand menu. Project content (exhibitions,
performances, lectures, writing, archive entries, and the About/CV page) lives in
Supabase and is edited through a login-protected admin portal at `/admin` — no code
changes needed to add or update content.

## Guides

- [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md) — one-time setup: create the Supabase
  project, load the existing content, create the admin login, and day-to-day use
  of `/admin`.
- [`GO_LIVE_CHECKLIST.md`](GO_LIVE_CHECKLIST.md) — publishing the site (GitHub,
  Netlify, custom domain).

## Local development

```bash
npm install
cp .env.local.example .env   # then fill in your Supabase values
npm run dev
```

## Key files

| Path | Purpose |
|---|---|
| `src/app/page.tsx` | Fetches published content from Supabase and renders the site |
| `src/app/SiteClient.tsx` | Cargo menu structure and page layouts |
| `src/app/admin/` | The login-protected content editor |
| `src/proxy.ts` | Guards `/admin/*` routes, requires a signed-in Supabase user |
| `src/lib/supabase/` | Supabase client helpers (browser, server, public/anon) |
| `scripts/create-admin.mjs` | `npm run create-admin` — creates/resets the one admin login |
| `prisma/schema.prisma` | Connection config used by `npm run db:migrate` to run the SQL below |
| `supabase/migrations/0001_init.sql` | `projects` table schema, access rules, image storage bucket |
| `supabase/seed.sql` | The site's existing projects, as insertable SQL |
| `supabase/migrations/0002_profile.sql` | `profile` table schema (bio + About/CV lists) |
| `supabase/seed_about.sql` | The site's existing bio and CV entries, as insertable SQL |
| `netlify.toml` | Netlify deployment configuration |
