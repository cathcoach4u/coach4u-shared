// MEMBERSHIP GATE SNIPPET
// -----------------------
// Paste this inside your <script type="module"> block on every
// page that requires an active membership (i.e. every page except
// login.html, forgot-password.html, reset-password.html, inactive.html).
//
// Place it at the top of your page logic, before any data fetching.
// Requires: supabase already initialised (see supabase-init.html).

const { data: { session } } = await supabase.auth.getSession();

if (!session) {
  window.location.href = 'login.html';
  throw new Error('No session');
}

const { data: profile } = await supabase
  .from('users')
  .select('membership_status')
  .eq('id', session.user.id)
  .single();

if (profile?.membership_status !== 'active') {
  window.location.href = 'inactive.html';
  throw new Error('Membership inactive');
}

// User is confirmed active — page logic continues below this point.
