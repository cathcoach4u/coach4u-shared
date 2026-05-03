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

## App Structure

Every Coach4U app has this page structure:

| Page | Auth | Purpose |
|------|------|---------|
| `index.html` | No | Sign in page. Redirects active members to `dashboard.html`, inactive to `inactive.html`. |
| `forgot-password.html` | No | Request a password reset link. |
| `reset-password.html` | No | Set a new password (landed from email link). |
| `inactive.html` | No | Shown when membership is not active. Signs user out. |
| `dashboard.html` | Yes | Main landing page after login. Membership card + app tool grid. |
| `account.html` | Yes | Member profile, membership dates, support email. |
| _(app-specific pages)_ | Yes | Feature pages specific to this app. |

Add app-specific pages to this table as they are built.

---

## Supabase Project

| | |
|---|---|
| URL | `https://eekefsuaefgpqmjdyniy.supabase.co` |
| Anon Key | `sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y` |

---

## Critical Rules

**Supabase init — always ESM, always inline.** Use `<script type="module">` with `import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'` inline in each page. Never use the UMD CDN bundle (`supabase.min.js`). Never load Supabase from an external config file.

**Inline onclick handlers with module scripts.** Module scripts are scoped — functions defined inside them are not available to inline `onclick` attributes. Any function called from an inline `onclick` must be exposed on the global scope: `window.funcName = function() {...}`.

**Reset password redirect.** Use `window.location.href` (not `window.location.origin`) when building the `redirectTo` URL.

**Membership gating.** Every authenticated page must verify `users.membership_status = 'active'` after confirming a session. Redirect to `inactive.html` if not active.

**theme-color meta on every page.** `<meta name="theme-color" content="#003366">` — navy, not any other value.

**No Google Fonts.** The stylesheet uses the Aptos system font stack. Never add Google Fonts link tags.

**Support email is contact@coach4u.com.au.** Use this in account.html's support section and any help text. Never use support@, cath@, or other addresses.

**Do NOT set `flex-direction: column` on `body`.** Auth pages use their own centred layout. Adding it globally breaks the login page.

---

## What to copy from `coach4u-shared/templates/`

| Need | Copy this |
|------|-----------|
| Stylesheet | `css/style.css` → into this repo as `css/style.css` |
| Sign in page | `auth/login.html` → rename to `index.html` |
| Forgot password page | `auth/forgot-password.html` |
| Reset password page | `auth/reset-password.html` |
| Membership inactive page | `auth/inactive.html` |
| **App dashboard** | `snippets/app-dashboard.html` |
| **Account page** | `snippets/app-account.html` |
| Inline Supabase init block | `snippets/supabase-init.html` |
| Header with Sign Out button | `snippets/header-signout.html` |
| Membership gate logic | `snippets/membership-gate.js` |
| Database schema (run once) | `supabase/schema.sql` |
| Activate a new member | `supabase/add-member.sql` |
| PWA manifest | `pwa/manifest.json` |
| Service worker | `pwa/sw.js` |

After copying, replace `[App Name]`, `[Page Name]`, `[X.Y]` and any other placeholders with this app's values.

---

## Brand Lock (v2.0)

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#003366` | Navy — header bg, headings, titles |
| `--accent` | `#0D9488` | Teal — card borders, buttons, links, section heading underlines |
| `--bg` | `#ffffff` | White page background |
| `--text` | `#333333` | Body text |
| `--text-muted` | `#888888` | Secondary / muted text |
| Font | Aptos system stack | No Google Fonts. Stack: `'Aptos', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |

**Do NOT introduce:** black, additional blues, alternate teals, extra greys, or Google Fonts.

### Card rule
All cards use `border: 2px solid var(--accent)` (teal) with teal box-shadow and hover lift (`transform: translateY(-2px)`). Use `.card-neutral` only for structural/admin panels where the teal border is too strong.

### Section headings
13px uppercase, `letter-spacing: 0.8px`, `border-bottom: 2px solid var(--accent)`. Use `.section-title` on h3 elements or `.section-heading` as a div.

### Gradient panels
`linear-gradient(135deg, #003366 0%, #0D9488 100%)` — used for membership card, about-panel, login page background.

---

## Footer

Every page (public and authenticated) includes the Coach4U footer:

```html
<footer style="text-align:center; font-size:14px; color:#999; padding:24px 0;">
  Strengths-Based Coaching and Counselling | <a href="https://coach4u.com.au" style="color:#999;">coach4u.com.au</a>
</footer>
```

On auth/login pages the footer is `position:fixed; bottom:0; width:100%` so it sits below the centred card without pushing layout.

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
- **Descriptions can be dynamic** — update via JS (e.g. show last score from Supabase).
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

## Account Page Pattern

Copy from `coach4u-shared/templates/snippets/app-account.html`.

### Structure

- **Profile section** — email and name from `users` table
- **Membership section** — status, start date, end date from `users` table
- **Support section** — "Need help? Reach out at contact@coach4u.com.au" — always use this email, never change it

---

## Login Page Pattern

All auth pages use `<body class="login-page">` with the shared CSS classes:

```html
<body class="login-page">
  <div class="login-card">
    <div class="login-logo"><h1>[App Name]</h1></div>
    <p class="login-subtitle">Sign in to access your coaching resources.</p>
    <form id="loginForm">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" required autocomplete="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-wrapper">
          <input type="password" id="password" required autocomplete="current-password">
          <button type="button" class="toggle-password" onclick="togglePassword()">Show</button>
        </div>
      </div>
      <div id="message" class="login-message"></div>
      <button type="submit" class="login-btn" id="submitBtn">Sign In</button>
    </form>
    <a href="forgot-password.html" class="login-forgot">Forgot password?</a>
  </div>
</body>
```

- Background: navy → teal gradient
- Card: white, centred, max 380px
- Button: full-width, navy (`var(--primary)`)
- Forgot password link: teal (`var(--accent)`), below the button
- No placeholders on input fields
- Same layout applies to `forgot-password.html` and `reset-password.html`

---

## Sign Out — Standard Placement

Sign Out is **always top-right of the header** on every authenticated page. Never stacks below the title on mobile.

```html
<header class="site-header">
  <div class="header-inner">
    <div class="header-left">
      <a href="dashboard.html" class="header-back">← Back</a> <!-- omit on dashboard -->
      <span class="header-title">[Page Name]</span>
      <span class="header-version" id="headerVersion"></span>
    </div>
    <button class="sign-out-btn" onclick="signOut()">Sign Out</button>
  </div>
</header>
```

```js
window.signOut = async function() {
  await sb.auth.signOut();
  window.location.href = 'index.html';
};

document.getElementById('headerVersion').textContent =
  'v[X.Y] — ' + new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
```

---

## Auth Flow

- Login: email + password only (no magic link)
- Forgot password → `forgot-password.html`
- Reset password → `reset-password.html`
- Inactive membership → `inactive.html` (from login and from any gated page)

## inactive.html

Shown when a member's `membership_status` is not `'active'`. The page:
- Uses the same `login-page` / `login-card` layout as auth pages
- Signs the user out and redirects to `index.html` when they click the button
- Has no membership check (to avoid redirect loops)
- Includes the Coach4U footer

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
