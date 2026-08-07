# Go live: m-ltaief.com

Your website is ready to publish free using **GitHub + Netlify**.

## What you need

- A free [GitHub](https://github.com) account
- A free [Netlify](https://www.netlify.com) account
- A free [Supabase](https://supabase.com) account (for the admin portal and content)
- Access to the DNS settings for `m-ltaief.com`

> Netlify hosting and HTTPS are free. Supabase's free tier covers this project easily.
> Your domain registration stays with your existing domain registrar.

---

## A. Put the site on GitHub

### Easiest method: GitHub Desktop

1. Install [GitHub Desktop](https://desktop.github.com/).
2. Open it and sign in to GitHub.
3. Choose **File → Add Local Repository**.
4. Select this website project folder.
5. If prompted, choose **Create a repository**.
6. Name it something clear, for example:

   ```text
   m-ltaief-cargo-site
   ```

7. Click **Publish repository**.
8. Keep the repository **private** if you wish—the Netlify free plan supports private GitHub repositories.

The included `.gitignore` automatically avoids uploading `node_modules`, build files, `.next`, and `.env` secrets. It does upload the website and all source code. Project content (text, links, gallery images) lives in Supabase, not in this repository.

---

## B. Deploy free on Netlify

1. Sign in to [Netlify](https://app.netlify.com/) using GitHub.
2. Click **Add new project → Import an existing project**.
3. Select **GitHub**, authorize it, then select `m-ltaief-cargo-site`.
4. Netlify reads the included `netlify.toml` automatically.
5. Confirm these values if Netlify asks:

   ```text
   Build command: npm run build
   Publish directory: .next
   Node version: 22
   ```

6. Click **Deploy site**.

After 1–3 minutes, Netlify gives you a temporary URL such as:

```text
https://random-name-123.netlify.app
```

Open it and check that the website loads before changing DNS. It will show an empty
site until Supabase is set up (step D below).

---

## C. Connect www.m-ltaief.com

In the Netlify project:

1. Open **Domain management**.
2. Select **Add a domain**.
3. Enter:

   ```text
   m-ltaief.com
   ```

4. Add `www.m-ltaief.com` as an alias too.
5. Set `www.m-ltaief.com` as the **primary domain** if you want the `www` version to be public.
6. Netlify will display the exact DNS records to add.

At the company where the domain is registered, use Netlify's displayed values. Normally this means:

| Host | Type | Value |
|---|---|---|
| `www` | CNAME | Netlify hostname shown in the dashboard |
| root / `@` | A or ALIAS | Netlify addresses shown in the dashboard |

7. Wait for DNS propagation (often minutes, occasionally up to 24 hours).
8. Netlify automatically issues a free HTTPS certificate.

### Important

Your old Squarespace site may currently control the same domain. Do not delete it until the Netlify domain status is green and you have tested the new site at both:

```text
https://m-ltaief.com
https://www.m-ltaief.com
```

---

## D. Enable online editing at /admin

The site's content lives in Supabase and `/admin` is a real login-protected editor
(no Decap CMS / Netlify Identity involved). Follow [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md)
once to create the Supabase project, load the existing content, and create your login.

Then, in Netlify:

1. Open **Site configuration → Environment variables**.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (from Supabase
   **Project Settings → API**).
3. Redeploy the site so the new variables take effect.
4. Go to:

   ```text
   https://www.m-ltaief.com/admin
   ```

5. Sign in with the account you created in Supabase.

You can now edit project titles, dates, text, links, gallery order, images, Vimeo IDs,
and credits directly in your browser. Changes save straight to the database and appear
on the live site within seconds — no rebuild or deploy needed.

---

## E. Your everyday editing workflow

1. Open:

   ```text
   https://www.m-ltaief.com/admin
   ```

2. Sign in.
3. Edit a project, or click **+ Add new project** for a new one.
4. Change text, reorder gallery images, upload photos, or add Vimeo IDs.
5. Click **Save**.

### Internal ID

Avoid changing a project's **Internal ID** once it's live — it's part of that project's
URL (`/#project-id`) and anything linking to it elsewhere would break.

---

## F. Safety and backups

- Supabase keeps a history of your database; contact Supabase support if you ever need
  to restore an accidental deletion, or export the `projects` table periodically as a
  personal backup (Table Editor → Export).
- Code changes still go through GitHub, so you can restore previous versions of the
  site's design from there. Netlify also keeps deploy history — use **Deploys →
  Publish deploy** on an earlier successful version if a code deploy ever breaks the site.

---

## Useful URLs after launch

```text
Public site: https://www.m-ltaief.com
Editor:      https://www.m-ltaief.com/admin
GitHub:      https://github.com/YOUR-USERNAME/m-ltaief-cargo-site
Netlify:     https://app.netlify.com/
Supabase:    https://app.supabase.com/
```
