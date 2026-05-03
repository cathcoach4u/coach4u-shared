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
