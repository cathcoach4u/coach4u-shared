# coach4u-shared

Shared design system, stylesheet, and configuration for all Coach4U apps.

Hosted via GitHub Pages at:
```
https://cathcoach4u.github.io/coach4u-shared/
```

## Files

| File | Purpose |
|------|---------|
| `css/style.css` | Shared stylesheet (CSS variables, components, responsive breakpoints) |
| `js/config.js` | Supabase URL + anon key exports |
| `SETUP.md` | Full setup guide: auth, membership gating, PWA, SQL snippets |

## How to Link the Shared CSS

Add this to the `<head>` of every Coach4U HTML page:

```html
<link rel="stylesheet" href="https://cathcoach4u.github.io/coach4u-shared/css/style.css">
```

That's it. No build step required — changes to this repo are live immediately after GitHub Pages rebuilds (usually under 60 seconds).

## Supabase Project

- **URL:** `https://eekefsuaefgpqmjdyniy.supabase.co`
- **Anon Key:** `sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y`

> See [SETUP.md](SETUP.md) for the full development guide including login page patterns, forgot/reset password flows, membership gating, and PWA setup.
