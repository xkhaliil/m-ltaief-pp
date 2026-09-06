
# Mohamed-Ali Ltaief — website

A Next.js site with a Cargo-style right-hand menu. Project content (exhibitions,
performances, lectures, writing, archive entries, and the About/CV page) lives in
Supabase and is edited through a login-protected admin portal at `/admin` — no code
changes needed to add or update content.

## What it does

- Renders published content (projects, bio, CV entries) fetched from Supabase tables (`projects`, `profile`) with a 60-second revalidation window, falling back to an empty page if Supabase isn't configured yet.
- Ships a login-protected `/admin` area (guarded by `src/proxy.ts` via Supabase auth) for editing site content: a rich text editor (Tiptap) with font, color, alignment, and link controls; drag-and-drop reordering of content blocks (`@dnd-kit`); a typography picker (Default / Libre Baskerville / TT Norms Pro); and PDF documents embedded as an in-page, page-by-page reader.
- Compresses/resizes gallery images client-side before upload and serves them through Supabase Storage, with `next/image` optimizing full-resolution originals down to the sizes actually displayed.
- Uses `lenis` for smooth scrolling and a splash/site-loader gate on first load.

## Guides

- [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md) — one-time setup: create the Supabase
  project, load the existing content, create the admin login, and day-to-day use
  of `/admin`.

## Tech stack

- **Framework:** Next.js, React, TypeScript
- **Backend/auth/storage:** Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- **Rich text editing:** Tiptap (`@tiptap/react`, `@tiptap/starter-kit`, extensions for color, font family, text align, underline, links, placeholder)
- **Drag and drop:** `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- **Styling:** Tailwind CSS (via `@tailwindcss/postcss`), `clsx`, `tailwind-merge`
- **Other:** `lenis` (smooth scroll), `sanitize-html` (server-side HTML sanitizing), Prisma (used only to execute the raw SQL migrations in `supabase/`, not as an app-level ORM)

## Local development

```bash
npm install
cp .env.local.example .env   # then fill in your Supabase values
npm run dev
```

Other scripts: `npm run lint`, `npm run typecheck`, `npm run create-admin` (creates/resets the admin login), and `npm run db:migrate` (runs the SQL files under `supabase/` via Prisma).

## Deploying

This is a standard Next.js app (`npm run build && npm run start`) — deploy it on
whatever host you prefer. Set `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables there; see
[`SUPABASE_SETUP.md`](SUPABASE_SETUP.md) for the rest.

<!-- TODO: add a screenshot -->

## Key files

| Path | Purpose |
|---|---|
| `src/app/page.tsx` | Fetches published content from Supabase and renders the site |
| `src/app/SiteClient.tsx` | Cargo menu structure and page layouts |
| `src/app/admin/` | The login-protected content editor |
| `src/proxy.ts` | Guards `/admin/*` routes, requires a signed-in Supabase user |
| `src/lib/supabase/` | Supabase client helpers (browser, server, public/anon) |
| `src/lib/image-compress.ts` | Resizes/re-encodes gallery images in-browser before upload |
| `scripts/create-admin.mjs` | `npm run create-admin` — creates/resets the one admin login |
| `prisma/schema.prisma` | Connection config used by `npm run db:migrate` to run the SQL below |
| `supabase/migrations/0001_init.sql` | `projects` table schema, access rules, image storage bucket |
| `supabase/seed.sql` | The site's existing projects, as insertable SQL |
| `supabase/migrations/0002_profile.sql` | `profile` table schema (bio + About/CV lists) |
| `supabase/seed_about.sql` | The site's existing bio and CV entries, as insertable SQL |

## License

No license file is present in this repository yet.
