# Coach4U — Build Process Prompts

Read this file to find the prompt for each step of building a new app.
Each step is self-contained. Tell Claude "go to step X" and it will use the prompt below.

## How to Start a Brand New App

Use this exact opening message in the new repo session:

> This repo is new. Read `PROMPTS.md` in the shared repo (`cathcoach4u/coach4u-shared`) and go to Step 1.

After Step 1 is complete and `CLAUDE.md` is in the new repo, you can just say **"go to step 2"** and Claude will know what to do.

---

## Step 1 — Set Up a New App Repo

> Read `CLAUDE.md` in the shared repo (`cathcoach4u/coach4u-shared`) first. Use the Supabase credentials found there.
>
> Copy these files from the shared repo into this new repo:
>
> - `templates/CLAUDE.md` → `CLAUDE.md`
> - `templates/PROFILE.md` → `PROFILE.md`
> - `templates/css/style.css` → `css/style.css`
> - `templates/css/activity.css` → `css/activity.css`
> - `templates/css/info.css` → `css/info.css`
> - `templates/auth/login.html` → `auth/login.html`
> - `templates/auth/forgot-password.html` → `auth/forgot-password.html`
> - `templates/auth/reset-password.html` → `auth/reset-password.html`
> - `templates/auth/inactive.html` → `auth/inactive.html`
> - `templates/snippets/supabase-init.html` → reference only, do not copy as a file
> - `templates/snippets/header-signout.html` → reference only, do not copy as a file
> - `templates/snippets/membership-gate.js` → `js/membership-gate.js`
> - `templates/snippets/app-dashboard.html` → reference only, do not copy as a file
> - `templates/snippets/activity-template.html` → reference only, do not copy as a file
> - `templates/supabase/schema.sql` → `supabase/schema.sql`
> - `templates/supabase/add-member.sql` → `supabase/add-member.sql`
> - `templates/pwa/manifest.json` → `pwa/manifest.json`
> - `templates/pwa/sw.js` → `pwa/sw.js`
>
> Do not link to the shared repo as a CDN. Every CSS file must be a local copy in this repo.
>
> **Enable GitHub Pages** before testing anything:
> 1. Go to the repo on GitHub → Settings → Pages
> 2. Set Source to the `main` branch, root folder, and save
> 3. Wait ~60 seconds for the first deploy before opening any page
> 4. GitHub Pages takes ~60 seconds to update after every push. If a change isn’t showing, wait and hard refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`) rather than assuming something is broken
>
> Before building anything:
> 1. Check whether the Supabase schema has already been run. If it hasn’t, show me the exact SQL to run and walk me through where to run it in the Supabase dashboard step by step.
>
> **Adding a member to `public.users`:**
> - Try the INSERT from `add-member.sql` first
> - If it fails with a duplicate key error, the row already exists — run an UPDATE instead:
>   ```sql
>   UPDATE public.users SET membership_status = 'active'
>   WHERE LOWER(email) = LOWER('email@here.com');
>   ```
> - If the UPDATE says "0 rows affected", run `SELECT id, email, membership_status FROM public.users;` to see what’s actually in the table and fix accordingly
>
> Then build in this order:
> 1. Auth flow — login, forgot password, reset password, inactive page
> 2. At each stage, tell me what to test and how to confirm it’s working before moving on
> 3. Once auth is confirmed working, build the dashboard with membership gating
>
> Follow all rules in `CLAUDE.md` — especially inline Supabase init, membership gating on every protected page, and the reset password redirect rule. Always ask which page type is being built before choosing a stylesheet.

---

## Step 2 — Build the Dashboard

*Coming soon*

---

## Step 3 — Build a Module or Activity

*Coming soon*

---

## Step 4 — Build the Admin Page

*Coming soon*

---

## Step 5 — Build the Member Portal

*Coming soon*
