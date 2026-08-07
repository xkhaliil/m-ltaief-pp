# Set up the admin portal (Supabase)

The site's content (projects, exhibitions, performances, galleries, and the About/CV
page) lives in a Supabase database instead of static files. `/admin` is a real
login-protected portal where you can add, edit, reorder, and delete everything
without touching any code.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free account/project.
2. Pick a region close to your visitors (e.g. Frankfurt/EU for a Berlin/Tunis audience).
3. Wait for the project to finish provisioning (a couple of minutes).

## 2. Create the database tables

Five SQL files need to run, in order. Pick whichever of these is easier:

### Option A — one command (needs `DATABASE_URL`, see step 4)

```bash
npm run db:migrate
```

This uses Prisma purely as a connection/CLI tool to run the four files below directly
against your database — nothing here uses Prisma's schema or ORM layer, since RLS
policies and storage bucket rules aren't expressible in Prisma's schema DSL. It's safe
to re-run any time; every statement is idempotent (`if not exists` / `on conflict`).

### Option B — paste into the Supabase dashboard

Open **SQL Editor** in the Supabase dashboard, and run these files **in this order**
(paste each file's contents, click Run, move to the next):

1. [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) — creates the
   `projects` table, its access rules, and the `gallery` image storage bucket.
2. [`supabase/seed.sql`](supabase/seed.sql) — inserts all the exhibitions/performances/
   writing entries that were already on the site.
3. [`supabase/migrations/0002_profile.sql`](supabase/migrations/0002_profile.sql) — creates
   the `profile` table (bio + the four About/CV lists).
4. [`supabase/seed_about.sql`](supabase/seed_about.sql) — inserts the existing bio and CV entries.
5. [`supabase/migrations/0003_storage_usage.sql`](supabase/migrations/0003_storage_usage.sql) —
   adds a function the admin portal uses to check how much storage is left, so it can switch
   to saving images locally before an upload fails, not after.

> Note: the original site's images (`public/images/works/...`) are not included in this
> project folder. The seed keeps those paths as-is; if you have the original image files,
> add them under `public/images/works/` and they'll resolve automatically. Otherwise, re-upload
> each project's gallery photos through `/admin` — new uploads go to Supabase Storage instead.

## 3. Get your API keys

1. Open **Project Settings → API**.
2. Copy the **Project URL** and the **anon / public** key — you'll need both.
3. Also copy the **service_role** key (further down the same page, marked secret) —
   only needed to run `npm run create-admin`, and only ever used locally, never in the browser.
4. If you're using **Option A** above (`npm run db:migrate`), also open
   **Project Settings → Database → Connection string → Session pooler** and copy that URI
   (fill in your database password). Use the **pooler** string, not the "URI" direct
   connection — the direct host is IPv6-only and won't resolve on plain IPv4 networks.

## 4. Configure the app

```bash
cp .env.local.example .env
```

Edit `.env` and fill in the values from step 3:

```text
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key
DATABASE_URL=postgresql://postgres.YOUR-PROJECT-REF:YOUR-PASSWORD@aws-REGION.pooler.supabase.com:5432/postgres
```

`.env` is already covered by `.gitignore`, so none of this ever gets committed.

```bash
npm install
```

## 5. Create your admin login

This is the only account that should exist — there's no public sign-up page. Create it
from your terminal:

```bash
npm run create-admin -- "your-email@example.com" "a-strong-password"
```

This uses the `SUPABASE_SERVICE_ROLE_KEY` from `.env` to create the account directly
(or reset its password, if you run it again with the same email). You can also do this
by hand in the Supabase dashboard instead: **Authentication → Users → Add user** (make
sure **Auto Confirm User** is checked).

## 6. Run it

```bash
npm run dev
```

Visit `http://localhost:3000/admin/login` and sign in with the account from step 5.

For production, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as
environment variables on whatever host runs the app. The service role key and
`DATABASE_URL` are only needed locally (for `npm run create-admin` and
`npm run db:migrate`) — don't add them to your hosting provider's environment variables.

## 7. Everyday editing

Go to `https://your-site.com/admin/login`, sign in, and you'll see every project grouped
by menu section (main index, Motus, Lecture Performance, Writing / Publishing, Archive),
plus an **Edit About / CV** link.

- **Add new project** — creates a new entry; pick which menu section it belongs to and
  where it should sit in the order.
- **Edit** — change the title, info lines (venue/date), body paragraphs, links, video links (Vimeo or YouTube),
  credits, and gallery images.
- **Gallery images** — click "+ Add image" to upload directly from your computer; use the
  ↑ / ↓ / ✕ buttons to reorder or remove.
- **Delete** — removes a project from the site entirely (with a confirmation prompt).
- **Edit About / CV** — bio fields (name, tagline, email, PDF/Deutsch links) and the four
  dated lists (selected works, lecture performances, awards, residencies), each with
  add/reorder/remove.

Changes go live within seconds — no rebuild, no Git commit, no code.

### Internal ID

Every project has an **Internal ID** (a slug like `i-hear`). Avoid changing it once a
project is published — it's part of the project's URL (`/#i-hear`) and anything linking
to it elsewhere (e.g. a shared link) would break.
