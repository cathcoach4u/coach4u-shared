# [App Name] — Claude Code Guide

> Templates and source of truth: https://github.com/cathcoach4u/coach4u-shared
> Profile and working preferences: `coach4u-shared/templates/PROFILE.md`
>
> **Rule:** Always check `coach4u-shared/templates/` first. Copy the relevant
> file into this repo rather than rewriting it from scratch.

---

## What this app is

<!-- One sentence describing this app. Replace this line. -->

---

## Supabase Project

| | |
|---|---|
| URL | `https://eekefsuaefgpqmjdyniy.supabase.co` |
| Anon Key | `sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y` |

---

## Critical Rules

**Supabase init — always inline.** GitHub Pages does not reliably load external `.js` modules. Always initialise Supabase inline in a `<script type="module">` block. Never import from an external config file. See `coach4u-shared/templates/snippets/supabase-init.html`.

**Reset password redirect.** Use `window.location.href` (not `window.location.origin`) when building the `redirectTo` URL. Using `origin` drops the path and breaks Supabase's redirect matching.

**Membership gating.** Every page except login, forgot password, reset password and inactive must verify `users.membership_status = 'active'` after confirming a session. Redirect to `inactive.html` if not. See `coach4u-shared/templates/snippets/membership-gate.js`.

**Do NOT set `flex-direction: column` on `body`.** Auth pages use their own centred layout. Adding it globally breaks the login page.

---

## What to copy from `coach4u-shared/templates/`

| Need | Copy this |
|------|-----------|
| Stylesheet | `css/style.css` → into this repo as `css/style.css` |
| Sign in page | `auth/login.html` |
| Forgot password page | `auth/forgot-password.html` |
| Reset password page | `auth/reset-password.html` |
| Membership inactive page | `auth/inactive.html` |
| Inline Supabase init block | `snippets/supabase-init.html` |
| Header with Sign Out button | `snippets/header-signout.html` |
| Membership gate logic | `snippets/membership-gate.js` |
| Database schema (run once) | `supabase/schema.sql` |
| Activate a new member | `supabase/add-member.sql` |
| PWA manifest | `pwa/manifest.json` |
| Service worker | `pwa/sw.js` |

After copying, replace `[App Name]`, `[Page Name]` and any other placeholders with this app's values.

---

## Auth Flow

- Login: email + password only (no magic link)
- Forgot password → `forgot-password.html`
- Reset password → `reset-password.html`
- Inactive membership → `inactive.html`

Sign Out is always **top-right of the header** on every app page (not auth pages).

---

## Add a New Member (SQL)

```sql
INSERT INTO public.users (id, email, membership_status)
SELECT id, email, 'active'
FROM auth.users
WHERE LOWER(email) = LOWER('email@here.com');
```

---

## App-Specific Notes

<!-- Add anything unique to this app below this line -->
