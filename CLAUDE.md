# Coach4U Shared — Claude Code Guide

> This repo is the source of truth for all Coach4U templates.
> Templates live in `templates/`. Copy them into app repos as needed.
> Full setup guide: `SETUP.md`

## How This Repo Works

- `templates/` — everything to copy into an app repo (CSS, auth pages, SQL, PWA, snippets)
- `SETUP.md` — canonical reference for auth, membership gating, PWA, and SQL patterns
- This repo has no auth, no live pages, and no Supabase queries

## Supabase Project

| | |
|---|---|
| URL | `https://eekefsuaefgpqmjdyniy.supabase.co` |
| Anon Key | `sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y` |

## Critical Rules

**Do not link to this repo's files as a live CDN.** Copy `templates/css/style.css` into each app repo. Each app owns its own local copy.

**Supabase init — always inline.** GitHub Pages does not reliably load external `.js` modules. Always initialise Supabase inline in a `<script type="module">` block. Never import from an external config file.

**Reset password redirect.** Use `window.location.href` (not `window.location.origin`) when building the `redirectTo` URL. Using `origin` drops the path and breaks Supabase's redirect matching.

**Membership gating.** Every page except login/forgot/reset must verify `users.membership_status = 'active'` after confirming a session. Redirect to `inactive.html` if not.

## Auth Flow

- Login: email + password only (no magic link)
- Forgot password → `forgot-password.html`
- Reset password → `reset-password.html`

## Add a New Member (SQL)

```sql
INSERT INTO users (id, email, membership_status)
SELECT id, email, 'active'
FROM auth.users
WHERE LOWER(email) = LOWER('email@here.com');
```
