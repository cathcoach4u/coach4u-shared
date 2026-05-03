// MEMBERSHIP GATE SNIPPET
// -----------------------
// Paste this inside your <script type="module"> block on every
// page that requires an active membership (every page except
// index.html, forgot-password.html, reset-password.html, inactive.html).
//
// Place it at the top of your page logic, before any data fetching.
// Requires: sb already initialised (see supabase-init.html).

const { data: { user }, error: authErr } = await sb.auth.getUser();

if (authErr || !user) {
  window.location.href = 'index.html';
  throw new Error('No session');
}

const { data: profile } = await sb
  .from('users')
  .select('membership_status')
  .eq('id', user.id)
  .single();

if (profile?.membership_status !== 'active') {
  window.location.href = 'inactive.html';
  throw new Error('Membership inactive');
}

// User is confirmed active — page logic continues below this point.
