# Coach4U Shared — Claude Code Guide

> ## CLAUDE.md is the source of truth.
> Read this file first in every session. All rules, brand standards, and template
> references live here or are linked from here. Do not invent patterns, copy
> from other apps, or guess. If a rule isn't here, ask.

---

## Workflow Rules

- **Commit every change.** One change = one commit + push. No batched commits.
- **Always push to the working branch immediately** after each commit.
- **When work is complete, merge to `main`.** The `main` branch should always reflect the finished, current state of the templates.
- **At session start, confirm `main` is up to date** before doing new work. If a branch is unmerged, finish or merge it first.
- **Never leave uncommitted changes at end of session.**

## How This Repo Works

- `templates/` — everything to copy into an app repo (CSS, auth pages, SQL, PWA, snippets)
- `templates/PROFILE.md` — Cath's profile and working preferences
- `templates/CLAUDE.md` — the guide that gets copied into each app repo
- `SETUP.md` — step-by-step guide for setting up a new app from scratch
- This repo has no auth, no live pages, and no Supabase queries

## What's in `templates/`

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Drop-in Claude guide for a new app repo |
| `PROFILE.md` | Cath's profile, brand standards, working preferences |
| `css/style.css` | Shared stylesheet (copy into app as `css/style.css`) |
| `auth/login.html` | Sign in page (rename to `index.html` in the app) |
| `auth/forgot-password.html` | Request reset link |
| `auth/reset-password.html` | Set new password |
| `auth/inactive.html` | Membership inactive landing page |
| `snippets/supabase-init.html` | Inline ESM Supabase init block |
| `snippets/header-signout.html` | Standard header with Sign Out |
| `snippets/membership-gate.js` | Gate logic for authenticated pages |
| `snippets/app-dashboard.html` | Standard dashboard card grid |
| `snippets/app-account.html` | Standard account page with support email |
| `supabase/schema.sql` | Users table + row level security |
| `supabase/add-member.sql` | Activate a new member |
| `pwa/manifest.json` | PWA install manifest |
| `pwa/sw.js` | Cache-first service worker |

## Supabase Project

| | |
|---|---|
| URL | `https://eekefsuaefgpqmjdyniy.supabase.co` |
| Anon Key | `sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y` |

## Critical Rules

**Supabase init — always ESM, always inline.** Use `<script type="module">` with `import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'` inline in each page. Never use the UMD CDN bundle (`supabase.min.js`). Never load Supabase from an external config file.

**Inline onclick handlers with module scripts.** Module scripts are scoped — functions defined inside them are not available to inline `onclick` attributes. Any function called from an inline `onclick` must be exposed on the global scope: `window.funcName = function() {...}`.

**Reset password redirect.** Use `window.location.href` (not `window.location.origin`) when building the `redirectTo` URL.

**Membership gating.** Every page except login/forgot/reset/inactive must verify `users.membership_status = 'active'` after confirming a session. Redirect to `inactive.html` if not.

**theme-color meta on every page.** `<meta name="theme-color" content="#003366">` — navy, not any other value.

**No Google Fonts.** The stylesheet uses the Aptos system font stack. Never add Google Fonts link tags.

**Support email is contact@coach4u.com.au.** Use this in the account page support section and any help text. Never use support@, cath@, or other addresses.

**Do not link to this repo's files as a live CDN.** Copy `templates/css/style.css` into each app repo. Each app owns its own local copy.

## Auth Flow

- Login: email + password only (no magic link)
- Forgot password → `forgot-password.html`
- Reset password → `reset-password.html`
- Inactive membership → `inactive.html`
- Sign Out: always top-right of the header on every app page (not auth pages)

## Add a New Member (SQL)

```sql
INSERT INTO users (id, email, membership_status)
SELECT id, email, 'active'
FROM auth.users
WHERE LOWER(email) = LOWER('email@here.com');
```
