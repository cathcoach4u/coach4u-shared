# Coach4U App Setup Guide

Step-by-step guide for setting up a new Coach4U app. Every file referenced here lives in `templates/` — copy it into your new app repo.

---

## Supabase Project

| | |
|---|---|
| URL | `https://eekefsuaefgpqmjdyniy.supabase.co` |
| Anon Key | `sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y` |

---

## Set Up From Scratch

### 1. Create the database tables

Run `templates/supabase/schema.sql` in the Supabase SQL editor. This creates the `users` table with the right row level security policies. Run once per Supabase project.

### 2. Copy the stylesheet

Copy `templates/css/style.css` into your app repo as `css/style.css`. Link it in every HTML page `<head>`:

```html
<link rel="stylesheet" href="css/style.css">
```

### 3. Add the auth pages

Copy these four files from `templates/auth/` into the root of your app:

- `login.html` — rename to `index.html` (app entry point)
- `forgot-password.html`
- `reset-password.html`
- `inactive.html`

Replace `[App Name]` in each file with your app's name.

### 4. Build the dashboard

Copy `templates/snippets/app-dashboard.html` and build `dashboard.html` around it. The membership card at the top is populated from Supabase — member name, email, Active Member badge, expiry date. Add one app-card per feature the app provides. Always include an Account card linking to `account.html`.

### 5. Build the account page

Copy `templates/snippets/app-account.html` and build `account.html` from it. Replace `[App Name]`. The support email is already set to `contact@coach4u.com.au` — do not change it.

### 6. Build authenticated pages

For every page that requires an active member:

- Use `<script type="module">` with the ESM Supabase init from `templates/snippets/supabase-init.html`.
- Paste `templates/snippets/membership-gate.js` at the top of your script logic, inside the same module block.
- Use `templates/snippets/header-signout.html` for the standard header.
- Expose any functions called from inline `onclick` via `window.funcName = function() {...}`.

### 7. PWA (optional)

Copy `templates/pwa/manifest.json` and `templates/pwa/sw.js` into the root of your app. Update placeholders. Link the manifest in every page `<head>` and register the service worker (instructions are inside `sw.js`).

### 8. Activate a member

Once a user has signed up via the login page (or you have created them in Supabase Auth > Users), run `templates/supabase/add-member.sql` after replacing the email address. This sets `membership_status = 'active'`.

---

## Rules You Must Follow

**No Google Fonts.** The stylesheet uses the Aptos system font stack. Never add Google Fonts link tags to any page.

**Supabase init — always ESM, always inline.** Use `<script type="module">` with `import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'`. Never use the UMD bundle (`supabase.min.js`). Never import from an external config file.

**Inline onclick handlers need window.* exposure.** Module scripts are scoped — functions called from `onclick="..."` attributes must be assigned to `window`: `window.funcName = function() {...}`.

**Reset password redirect — use `window.location.href`.** Never `window.location.origin`. The template already does this correctly.

**Membership gating.** Every page except login, forgot password, reset password and inactive must run the membership gate.

**Sign Out — top-right of header.** Always. On every authenticated page (not auth pages).

**theme-color meta on every page.** `<meta name="theme-color" content="#003366">`.

**Support email is contact@coach4u.com.au.** Use this in account.html and any help text.

**Do not link to `coach4u-shared` files as a live CDN.** Copy what you need into your app repo.

---

## Troubleshooting

**Login redirects but the next page bounces back.** Membership gate is firing because `users.membership_status` is not `'active'`. Run `add-member.sql` for that user.

**Reset password email link lands on a 404 or "no session".** The `redirectTo` URL was built with `window.location.origin` instead of `window.location.href`. Check your `forgot-password.html`.

**Inline onclick not firing.** The function is defined inside a `<script type="module">` but not exposed on `window`. Add `window.funcName = function() {...}` inside the module script.

**Service worker is caching stale files.** Bump the `CACHE` constant in `sw.js` (e.g. `appname-v1` → `appname-v2`) and redeploy. The activate handler will clean up the old cache.
