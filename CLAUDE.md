# Coach4U Shared Design System — Claude Code Guide

> Template: https://github.com/cathcoach4u/coach4u-shared/blob/main/templates/CLAUDE.md
> Shared design system: https://github.com/cathcoach4u/coach4u-shared
> Full setup guide: https://github.com/cathcoach4u/coach4u-shared/blob/main/SETUP.md

## Shared Stylesheet

Add to every HTML page `<head>`:

```html
<link rel="stylesheet" href="https://cathcoach4u.github.io/coach4u-shared/css/style.css">
```

## Supabase Project

| | |
|---|---|
| URL | `https://eekefsuaefgpqmjdyniy.supabase.co` |
| Anon Key | `sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y` |

## Critical Rules

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

---
## App-Specific Notes

This repo **is** the shared design system — it is the source of truth, not a consumer of it.

- `css/style.css` — shared stylesheet consumed by all Coach4U apps via GitHub Pages CDN
- `js/config.js` — Supabase URL + anon key exports (reference only; apps must still init inline)
- `SETUP.md` — canonical setup guide for auth, membership gating, PWA, and SQL patterns
- `templates/CLAUDE.md` — the master CLAUDE.md template; copy into each app repo and fill in the app-specific section

**GitHub Pages URL:** `https://cathcoach4u.github.io/coach4u-shared/`

Changes to `css/style.css` are live across all apps within ~60 seconds of merge (GitHub Pages rebuild).

This repo has no auth, no Supabase queries, and no HTML pages — it is purely static assets and documentation.
