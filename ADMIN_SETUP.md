# Portfolio Admin — Setup Guide

Your portfolio is now **fully dynamic**. All content lives in a Supabase
database and is edited through a hidden admin panel at **`/admin`**. There is
**no link** to the admin from the public site — you reach it by typing the URL
and signing in.

Until Supabase is connected, the public site automatically falls back to the
built-in default content (from `lib/data.ts`), so nothing ever looks broken.

---

## One-time setup (≈ 10 minutes)

### 1. Create a Supabase project
1. Go to <https://supabase.com> → sign in → **New project**.
2. Pick a name, a strong database password, and a region close to you.
3. Wait ~2 minutes for it to finish provisioning.

### 2. Add your keys to `.env.local`
In the Supabase dashboard: **Project Settings → API**. Copy these into the
`.env.local` file in the project root (already created for you):

```
NEXT_PUBLIC_SUPABASE_URL=       # "Project URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # "anon" / "publishable" public key
ADMIN_EMAIL=                    # optional: your admin login email
```

> No **service_role / secret** key is needed — admin writes run as your
> logged-in session, enforced by Row Level Security. `.env.local` is gitignored,
> so your keys are never committed.

### 3. Create the database tables
1. In Supabase, open **SQL Editor → New query**.
2. Copy the entire contents of [`supabase/schema.sql`](supabase/schema.sql).
3. Paste and click **Run**. This creates every table, security rule, and the
   image-upload storage bucket. (Safe to re-run.)

### 4. Create your admin login (and lock the door)
1. In Supabase, go to **Authentication → Users → Add user → Create new user**.
2. Enter your email + a password, and tick **Auto Confirm User**.
3. This is the account you'll use to sign in at `/admin`.
4. **Important:** go to **Authentication → Sign In / Providers → Email** and
   turn **off** “Allow new users to sign up.” This ensures only your account can
   ever exist — and therefore only you can edit content.
5. Optional extra: set `ADMIN_EMAIL` in `.env.local` to your email so the admin
   only accepts that exact address.

### 5. Restart & import your content
1. Restart the dev server (`npm run dev`) so it picks up the new keys.
2. Go to **`http://localhost:3000/admin`** → sign in.
3. On the dashboard, click **“Import starter content.”** This fills the database
   with all your existing projects, skills, experience, etc.
4. Done — now edit anything from the admin panel.

---

## Using the admin

- **Reach it:** type `/admin` in your browser (bookmark it). No link exists on
  the public site.
- **Singletons** (Profile, About): one form, just edit and save.
- **Collections** (Projects, Skills, Experience, …): a list with **New**,
  click a row to **edit**, trash icon to **delete**.
- **Order:** each collection item has a **Display order** number — lower shows
  first.
- **Images / resume:** use the **Upload** button (stored in Supabase Storage)
  or paste a URL.
- Changes appear on the public site immediately after saving.

## Deploying to Vercel

1. Push to GitHub and import the repo in Vercel.
2. In **Vercel → Project → Settings → Environment Variables**, add the same
   variables from `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and optionally `ADMIN_EMAIL`).
3. Deploy. Your admin lives at `https://yourdomain.com/admin`, protected by
   login and hidden from crawlers (`robots.txt` + `noindex`).

## Security notes

- `/admin` is protected by Supabase Auth via `middleware.ts`; unauthenticated
  visitors are redirected to the login page.
- No secret/service_role key is stored anywhere. Admin writes run as your
  logged-in session and are enforced by Row Level Security.
- Public visitors can only **read** content (RLS `select` policy); only an
  authenticated session can **write**. With sign-ups disabled, that's only you.
- Optionally set `ADMIN_EMAIL` to restrict the admin to a single address.
