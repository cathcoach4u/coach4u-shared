# Coach4U App Setup Guide

This document covers all the conventions and patterns used across Coach4U apps.

---

## Supabase Project

| Key | Value |
|-----|-------|
| Project URL | `https://eekefsuaefgpqmjdyniy.supabase.co` |
| Anon Key | `sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y` |

---

## Critical Rule — Inline Supabase Init in Every HTML Page

GitHub Pages does not reliably load external `.js` modules. **Always initialise Supabase inline** inside a `<script type="module">` block in each HTML page. Do **not** import from an external config file for auth/data operations.

```html
<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

  const SUPABASE_URL      = 'https://eekefsuaefgpqmjdyniy.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y';

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  // ... rest of page logic
</script>
```

---

## Login Page Structure

All apps use **email + password** login. Magic link / OTP flows are **not used**.

```html
<!-- login.html -->
<form id="login-form">
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" required autocomplete="username" />
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" required autocomplete="current-password" />
  </div>
  <div id="error-msg" class="alert alert-error" style="display:none"></div>
  <button type="submit" class="btn btn-primary btn-full">Sign In</button>
  <p style="text-align:center;margin-top:14px;font-size:0.875rem">
    <a href="forgot-password.html">Forgot password?</a>
  </p>
</form>

<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
  const supabase = createClient(
    'https://eekefsuaefgpqmjdyniy.supabase.co',
    'sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y'
  );

  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email    = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errEl    = document.getElementById('error-msg');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      errEl.textContent = error.message;
      errEl.style.display = 'block';
    } else {
      window.location.href = 'index.html';
    }
  });
</script>
```

---

## Forgot Password Page (`forgot-password.html`)

```html
<form id="forgot-form">
  <div class="form-group">
    <label for="email">Email address</label>
    <input type="email" id="email" required />
  </div>
  <div id="msg" class="alert" style="display:none"></div>
  <button type="submit" class="btn btn-primary btn-full">Send Reset Link</button>
</form>

<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
  const supabase = createClient(
    'https://eekefsuaefgpqmjdyniy.supabase.co',
    'sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y'
  );

  document.getElementById('forgot-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const msgEl = document.getElementById('msg');

    // IMPORTANT: use window.location.href (full URL), NOT window.location.origin
    const redirectTo = window.location.href.replace('forgot-password.html', 'reset-password.html');

    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    msgEl.style.display = 'block';
    if (error) {
      msgEl.className = 'alert alert-error';
      msgEl.textContent = error.message;
    } else {
      msgEl.className = 'alert alert-success';
      msgEl.textContent = 'Check your email for a reset link.';
    }
  });
</script>
```

---

## Reset Password Page (`reset-password.html`)

```html
<form id="reset-form">
  <div class="form-group">
    <label for="password">New password</label>
    <input type="password" id="password" required minlength="8" />
  </div>
  <div id="msg" class="alert" style="display:none"></div>
  <button type="submit" class="btn btn-primary btn-full">Update Password</button>
</form>

<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
  const supabase = createClient(
    'https://eekefsuaefgpqmjdyniy.supabase.co',
    'sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y'
  );

  // Supabase appends the token as a hash fragment — the client picks it up automatically
  document.getElementById('reset-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const msgEl    = document.getElementById('msg');

    const { error } = await supabase.auth.updateUser({ password });
    msgEl.style.display = 'block';
    if (error) {
      msgEl.className = 'alert alert-error';
      msgEl.textContent = error.message;
    } else {
      msgEl.className = 'alert alert-success';
      msgEl.textContent = 'Password updated! Redirecting to login…';
      setTimeout(() => window.location.href = 'login.html', 2000);
    }
  });
</script>
```

> **Redirect URL fix:** Always build the redirect URL from `window.location.href`, not `window.location.origin`. Using `origin` alone drops the path and Supabase cannot match the allowed redirect URL configured in the dashboard.

---

## Membership Gating

Every app gates access by checking `users.membership_status = 'active'`.

```js
// After confirming the user is logged in:
const { data: profile } = await supabase
  .from('users')
  .select('membership_status')
  .eq('id', session.user.id)
  .single();

if (profile?.membership_status !== 'active') {
  window.location.href = 'inactive.html';
}
```

---

## `users` Table Schema

```sql
create table public.users (
  id               uuid primary key references auth.users(id) on delete cascade,
  email            text not null,
  full_name        text,
  membership_status text not null default 'inactive',
  created_at       timestamptz default now()
);

-- Row-level security
alter table public.users enable row level security;

create policy "Users can read their own row"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own row"
  on public.users for update
  using (auth.uid() = id);
```

---

## Add a New Member (SQL)

Run this in the Supabase SQL editor after the user has signed up:

```sql
INSERT INTO users (id, email, membership_status)
SELECT id, email, 'active'
FROM auth.users
WHERE LOWER(email) = LOWER('email@here.com');
```

Replace `email@here.com` with the member's actual email address.

---

## PWA Setup

### `manifest.json`

```json
{
  "name": "Coach4U App",
  "short_name": "Coach4U",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#003366",
  "theme_color": "#003366",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Link in `<head>`: `<link rel="manifest" href="manifest.json">`

### `sw.js` (minimal cache-first service worker)

```js
const CACHE = 'coach4u-v1';
const ASSETS = ['/', '/index.html', '/css/style.css'];

self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)))
);

self.addEventListener('fetch', e =>
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  )
);
```

Register in each HTML page:

```html
<script>
  if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('sw.js');
</script>
```
