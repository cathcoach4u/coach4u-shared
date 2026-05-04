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

Members are added and invited via the Coach4U Admin Panel (`coach4Uapp-dashboard/admin.html`). The admin invite flow:

1. Sends a Supabase invite email to the user
2. Stores the member’s full name in `user_metadata.name` in Supabase Auth
3. Creates a row in `public.users` with `membership_status = 'active'`

If you need to activate a member manually (outside the admin panel), run `templates/supabase/add-member.sql` after replacing the email address.

If the INSERT fails with a duplicate key error, the row already exists — run an UPDATE instead:
```sql
UPDATE public.users SET membership_status = 'active'
WHERE LOWER(email) = LOWER('email@here.com');
```

### 5. Displaying the member’s name

The admin invite flow stores the member’s name in `user_metadata.name` (Supabase Auth), not necessarily in `public.users`. Always use this priority order when displaying the member’s name on the dashboard:

```js
const { data: { user } } = await supabase.auth.getUser();
const { data: profile } = await supabase.from('users').select('name, email, membership_status').eq('id', user.id).single();

const displayName = profile.name || user.user_metadata?.name || user.email;
```

- `profile.name` — set by the app or admin if it writes to `public.users`
- `user.user_metadata.name` — always set by the admin invite flow
- `user.email` — last resort fallback only

### 6. Build your authenticated pages

For every page that requires an active member:

- Paste `templates/snippets/supabase-init.html` just before `</body>`.
- Paste `templates/snippets/membership-gate.js` at the top of your script logic, inside the same module block.
- Use `templates/snippets/header-signout.html` for the standard header with Sign Out.

### 7. PWA (optional)

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

**Login redirects but the next page bounces back.** Membership gate is firing because `users.membership_status` is not `'active'`. Run `add-member.sql` for that user, or use the UPDATE if the row already exists.

**Dashboard shows email instead of member name.** The name isn’t in `public.users.name`. Use `user.user_metadata?.name` as a fallback — the admin invite flow always sets this. See step 5 above.

**GitHub Pages shows old version after a push.** Pages takes ~60 seconds to deploy. Hard refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`) after waiting. If still stale, try an incognito window.

**Reset password email link lands on a 404 or “no session”.** The `redirectTo` URL was built with `window.location.origin` instead of `window.location.href`. Check your `forgot-password.html`.

**Service worker is caching stale files.** Bump the `CACHE` constant in `sw.js` (e.g. `appname-v1` → `appname-v2`) and redeploy. The activate handler will clean up the old cache.
