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

- `login.html`
- `forgot-password.html`
- `reset-password.html`
- `inactive.html`

Replace `[App Name]` in each file with your app's name. Each page already has Supabase init inline and works on its own.

### 4. Add a member

Once a user has signed up via the login page (or you've created them in Supabase Auth > Users), run `templates/supabase/add-member.sql` after replacing the email address. This sets `membership_status = 'active'`.

### 5. Build your authenticated pages

For every page that requires an active member:

- Paste `templates/snippets/supabase-init.html` just before `</body>`.
- Paste `templates/snippets/membership-gate.js` at the top of your script logic, inside the same module block.
- Use `templates/snippets/header-signout.html` for the standard header with Sign Out.

### 6. PWA (optional)

Copy `templates/pwa/manifest.json` and `templates/pwa/sw.js` into the root of your app. Update placeholders. Link the manifest and register the service worker (instructions are inside `sw.js`).

---

## Rules You Must Follow

**Supabase init — always inline.** GitHub Pages does not reliably load external `.js` modules. Every page initialises Supabase inline in a `<script type="module">` block. Never import from an external config file.

**Reset password redirect — use `window.location.href`.** Never `window.location.origin`. The `forgot-password.html` template already does this correctly. If you change it, keep the rule.

**Membership gating.** Every page except login, forgot password, reset password and inactive must run the membership gate. Use `templates/snippets/membership-gate.js`.

**Sign Out — top-right of header.** Always. On every app page (not auth pages). See `templates/snippets/header-signout.html`.

**Do not set `flex-direction: column` on `body`.** It breaks the auth pages, which use their own centred layout.

**Do not link to `coach4u-shared` files as a live CDN.** Copy what you need into your app repo.

---

## Troubleshooting

**Login redirects but the next page bounces back.** Membership gate is firing because `users.membership_status` is not `'active'`. Run `add-member.sql` for that user.

**Reset password email link lands on a 404 or "no session".** The `redirectTo` URL was built with `window.location.origin` instead of `window.location.href`. Check your `forgot-password.html`.

**Service worker is caching stale files.** Bump the `CACHE` constant in `sw.js` (e.g. `appname-v1` → `appname-v2`) and redeploy. The activate handler will clean up the old cache.
