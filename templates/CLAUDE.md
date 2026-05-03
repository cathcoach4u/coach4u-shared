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

**Supabase init — always ESM inline.** Use `import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'` in a `<script type="module">` block. Never use the UMD CDN script tag. Never import from an external config file. See `coach4u-shared/templates/snippets/supabase-init.html`.

**window.* for onclick handlers.** Because Supabase init uses `<script type="module">`, functions are not global by default. Expose all onclick targets via `window.functionName = functionName`.

**Reset password redirect.** Use `window.location.href` (not `window.location.origin`) when building the `redirectTo` URL. Using `origin` drops the path and breaks Supabase's redirect matching.

**Membership gating.** Every page except login, forgot password, reset password and inactive must verify `users.membership_status = 'active'` after confirming a session. Redirect to `inactive.html` if not. See `coach4u-shared/templates/snippets/membership-gate.js`.

**Do NOT set `flex-direction: column` on `body`.** Auth pages use their own centred layout. Adding it globally breaks the login page.

---

## What to copy from `coach4u-shared/templates/`

| Need | Copy this |
|------|----------|
| Dashboard stylesheet | `css/style.css` → into this repo as `css/style.css` |
| **Activity stylesheet** | **`css/activity.css` → into this repo as `css/activity.css`** |
| Sign in page | `auth/login.html` |
| Forgot password page | `auth/forgot-password.html` |
| Reset password page | `auth/reset-password.html` |
| Membership inactive page | `auth/inactive.html` |
| **App dashboard** | `snippets/app-dashboard.html` |
| **Activity / tool page** | **`snippets/activity-template.html`** |
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

## Activity / Tool Pattern

**Every Coach4U activity, worksheet, or multi-step tool uses the same design system.** Do not use dashboard colours or fonts inside activity pages.

Copy `css/activity.css` from the shared repo. Use `snippets/activity-template.html` as the page scaffold.

### Fonts

Inter (headings, buttons, labels) + Montserrat (body text, tiles) from Google Fonts. Required on every activity page:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
```

Unlike dashboard pages, activity pages **cannot use the Aptos system stack** — Inter and Montserrat must be loaded explicitly.

### Colours

| Variable | Value | Role |
|---|---|---|
| `--act-dark-blue` | `#1B3664` | Headings, selected tiles, primary button |
| `--act-light-blue` | `#5684C4` | Accent, step labels, progress done, sub-tile selected |
| `--act-dark-grey` | `#2D2D2D` | Body text |
| `--act-light-grey` | `#DDDDDD` | Borders, inactive progress steps |
| `--act-soft` | `#F5F7FB` | Resting tile/item background |
| `--act-bg` | `#ffffff` | Page background (white, not grey) |

**Never use teal (`#0D9488`) inside activity pages.** Teal belongs to the dashboard only.

### Page structure (in order)

1. `body class="activity-page"` — activates white background + Montserrat body font
2. Header: authenticated → `site-header` with Sign Out (from `style.css`); public → none
3. `.act-container` — max-width 880px centred wrapper
4. `a.act-back-link` — if public page without site-header
5. `header.act-header` — centred `h1` + `p` subtitle
6. `.act-progress` — numbered step indicator (wizard flows only; omit for scrollable worksheets)
7. `.act-card` per step — white card, light grey border, 16px radius
8. `.act-footer` — centred contact line

### Inside each `.act-card`

```
.act-step-label    — "STEP N OF N" uppercase light-blue (Montserrat)
.act-step-title    — main question, bold dark-blue, Inter
.act-step-prompt   — supporting instruction, body text
.act-step-hint     — italic light-blue helper (optional)
.act-reference     — callout block with left border (for "Use: X Report" notes)
.act-button-row    — Back / Continue flex row at bottom of card
```

### Tile types

| Type | CSS | When to use |
|---|---|---|
| Large emoji | `.act-core-tile` in `.act-core-grid` | Primary choices with emoji, 4-col (2-col mobile) |
| Chip | `.act-sub-tile` in `.act-sub-grid` | Secondary text choices, auto-fill grid |
| Row | `.act-nuance-item` in `.act-nuance-list` | Word + description pairs, single column |

### Wizard vs Worksheet

- **Wizard** (one step at a time): hide cards with `.act-hidden`, reveal via JS, include `.act-progress` stepper, use Back/Continue buttons in each `.act-button-row`
- **Worksheet** (all steps visible, scroll through): all `.act-card` elements visible at once, no stepper needed, add `.act-save-bar` with a sticky save button at the bottom

### CSS class reference

```
.act-container        — 880px centred wrapper
.act-back-link        — back navigation (public pages)
.act-header           — centred page header
.act-progress         — step indicator row
.act-progress-step    — single step (.active or .done)
.act-progress-divider — line between steps
.act-card             — white step card
.act-step-label       — "STEP N OF N" uppercase
.act-step-title       — step heading
.act-step-prompt      — instruction text
.act-step-hint        — italic blue helper
.act-reference        — left-bordered callout block
.act-core-grid        — 4-col emoji tile grid
.act-core-tile        — large selectable tile
.act-sub-grid         — auto-fill chip grid
.act-sub-tile         — chip tile
.act-nuance-list      — vertical list
.act-nuance-item      — word + desc row
.act-section-title    — group header within a step
.act-summary-banner   — gradient blue summary panel
.act-reflect-prompts  — textarea reflection block
.act-redirect-panel   — "none of these fit" fallback
.act-none-fit-btn     — dashed trigger button
.act-button-row       — Back/Continue flex row
.act-btn              — base button class
.act-btn-primary      — dark-blue fill
.act-btn-secondary    — white with outline
.act-save-bar         — sticky save bar (worksheets)
.act-save-status      — save state text (.saved, .error)
.act-info-card        — reference/report card
.act-info-card-title  — info card heading
.act-info-row         — label + value row
.act-info-label       — row label (light-blue, Inter)
.act-footer           — page footer
.act-hidden           — display:none utility
```

### Rules

- `body class="activity-page"` is required on every activity page
- Google Fonts import is required — activity pages do not use the Aptos system stack
- For authenticated activities, keep `site-header` from `style.css` for the Sign Out button
- For public activities, use only `activity.css` (no `style.css` needed unless using `.btn` etc.)
- Primary button is dark-blue fill (`.act-btn-primary`), not teal
- Background is white (`--act-bg`), not `#f5f7fa`

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
