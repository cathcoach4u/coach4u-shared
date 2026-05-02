# coach4u-shared

Source of truth for all Coach4U templates. Copy what you need into each app repo.

## How to use

Browse `templates/` and copy the files you need into your app repo. Each folder is self-contained.

| Folder | What you get |
|--------|-------------|
| `templates/CLAUDE.md` | Claude Code guide for a new app repo |
| `templates/PROFILE.md` | Cath's profile and working preferences |
| `templates/css/` | Shared stylesheet — copy into app as `css/style.css` |
| `templates/js/` | Supabase config reference |
| `templates/auth/` | Login, forgot password, reset password, inactive pages |
| `templates/snippets/` | Supabase init block, header + sign out, membership gate |
| `templates/supabase/` | Database schema SQL and add-member snippet |
| `templates/pwa/` | manifest.json and service worker |

## Rules

- **This repo is the source of truth.** Update templates here first, then copy into apps.
- **Do not link to this repo's CSS as a live CDN.** Copy the file into each app instead.
- **Do not link to `js/config.js` from external apps.** Supabase must always be initialised inline — see `templates/snippets/supabase-init.html`.

## Supabase Project

| | |
|---|---|
| URL | `https://eekefsuaefgpqmjdyniy.supabase.co` |
| Anon Key | `sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y` |
