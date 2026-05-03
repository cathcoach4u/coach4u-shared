# [App Name] — Claude Code Guide

> ## CLAUDE.md is the source of truth.
> Read this file first in every session. All rules and references live here.
> Do not invent patterns or copy from other apps. If a rule isn't here, ask.

---

## Linking with `coach4u-shared`

This app uses templates from the shared repo: https://github.com/cathcoach4u/coach4u-shared

When both this repo and `coach4u-shared` are open in the same Claude session:

1. **Always check `coach4u-shared/templates/` first** before writing anything new.
2. **Copy** the relevant template into this repo. Do not link to the shared repo as a live source — each app owns its own local copy.
3. **Profile and brand rules** live in `coach4u-shared/templates/PROFILE.md`. Treat that as authoritative for fonts, colours, tone, and working preferences.
4. **If you change a pattern** that should apply to all apps, update it in `coach4u-shared/templates/` first, then propagate.

If only this repo is open, follow the rules and patterns documented in this file.

---

## Workflow Rules

- **Commit every change.** One change = one commit + push. No batched commits.
- **Push to the working branch immediately** after each commit.
- **Merge to `main` when work is complete.** `main` always reflects the finished, current state.
- **At session start, confirm `main` is up to date** before starting new work.
- **Never leave uncommitted changes at end of session.**

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

**Supabase init — always inline.** GitHub Pages does not reliably load external `.js` modules. Always initialise Supabase inline in a `<script>` block. Never import from an external config file. See `coach4u-shared/templates/snippets/supabase-init.html`.

**Reset password redirect.** Use `window.location.href` (not `window.location.origin`) when building the `redirectTo` URL. Using `origin` drops the path and breaks Supabase's redirect matching.

**Membership gating.** Every page except login, forgot password, reset password and inactive must verify `users.membership_status = 'active'` after confirming a session. Redirect to `inactive.html` if not. See `coach4u-shared/templates/snippets/membership-gate.js`.

**Do NOT set `flex-direction: column` on `body`.** Auth pages use their own centred layout. Adding it globally breaks the login page.

---

## What to copy from `coach4u-shared/templates/`

| Need | Copy this |
|------|----------|
| Stylesheet | `css/style.css` → into this repo as `css/style.css` |
| Sign in page | `auth/login.html` |
| Forgot password page | `auth/forgot-password.html` |
| Reset password page | `auth/reset-password.html` |
| Membership inactive page | `auth/inactive.html` |
| **App dashboard** | `snippets/app-dashboard.html` |
| Inline Supabase init block | `snippets/supabase-init.html` |
| Header with Sign Out button | `snippets/header-signout.html` |
| Membership gate logic | `snippets/membership-gate.js` |
| Database schema (run once) | `supabase/schema.sql` |
| Activate a new member | `supabase/add-member.sql` |
| PWA manifest | `pwa/manifest.json` |
| Service worker | `pwa/sw.js` |

After copying, replace `[App Name]`, `[Page Name]` and any other placeholders with this app's values.

---

## Dashboard Pattern

**Every Coach4U app uses the same dashboard layout.** Do not invent a different structure.

Copy the full pattern from `coach4u-shared/templates/snippets/app-dashboard.html`.

### Structure (in order)

1. **Membership card** — gradient navy panel at top. Shows member name, email, Active Member badge, expiry date. Populated from Supabase `users` table.
2. **Section header** — "Your Tools" label + tool count on the right.
3. **App grid** — 2-column card grid. Drops to 1 column on mobile (≤480px).
4. **App cards** — one card per feature/page. Each card has: emoji icon, title, description, teal Open button.

### CSS classes

```
.membership-card        — gradient navy hero panel
.member-name            — member full name
.member-email           — member email
.membership-badge       — "Active Member" pill
.membership-expires     — expiry date line
.app-section-header     — flex row: title + count
.app-section-title      — "Your Tools" label
.app-section-count      — "N available" count
.app-grid               — 2-col CSS grid
.app-card               — teal-bordered card tile
.app-card-icon          — 52px rounded emoji container
.app-card-title         — 15px bold navy title
.app-card-desc          — 13px muted description (flex:1)
.btn.btn-primary        — teal Open button
```

### Rules

- **Always use emoji** for card icons. Keep them as text, not images.
- **Descriptions can be dynamic** — update via JS (e.g. show last Brain Pulse score from Supabase).
- **Odd card counts are fine** — the last card spans full width on 1-col mobile.
- **Every app has an Account card** — link to `account.html` for profile and membership details.
- **Do not change the card border or shadow** — teal `2px solid var(--accent)` with teal shadow and hover lift is the standard.

### Minimal example

```html
<div class="membership-card">
  <div class="member-name" id="memberName">—</div>
  <div class="member-email" id="memberEmail">—</div>
  <span class="membership-badge">Active Member</span>
  <div class="membership-expires">Expires: <span id="expiryDate">—</span></div>
</div>

<div class="app-section-header">
  <span class="app-section-title">Your Tools</span>
  <span class="app-section-count">2 available</span>
</div>

<div class="app-grid">
  <div class="app-card">
    <div class="app-card-icon">🧠</div>
    <div class="app-card-title">Brain Pulse</div>
    <div class="app-card-desc">Check in with your four wellbeing pillars</div>
    <a href="brain-pulse.html" class="btn btn-primary">Open</a>
  </div>

  <div class="app-card">
    <div class="app-card-icon">⚙️</div>
    <div class="app-card-title">Account</div>
    <div class="app-card-desc">Your profile and membership details</div>
    <a href="account.html" class="btn btn-primary">Open</a>
  </div>
</div>
```

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
