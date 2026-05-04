// MEMBERSHIP GATE SNIPPET
// -----------------------
// Paste this inside your <script type="module"> block on every
// page that requires an active membership (i.e. every page except
// login.html, forgot-password.html, reset-password.html, inactive.html).
//
// Place it at the top of your page logic, before any data fetching.
// Requires: supabase already initialised (see supabase-init.html).
//
// PATH NOTE:
// The redirect paths below depend on where this page lives in the repo.
// - Root-level pages (e.g. index.html):  use 'auth/login.html' and 'auth/inactive.html'
// - Pages inside a subfolder:            use '../auth/login.html' and '../auth/inactive.html'
// Adjust the paths below to match before using.

const { data: { user }, error: userError } = await supabase.auth.getUser();

if (!user || userError) {
  window.location.href = 'auth/login.html';   // adjust path if needed
  throw new Error('No user');
}

const { data: profile } = await supabase
  .from('users')
  .select('membership_status')
  .eq('id', user.id)
  .single();

if (!profile || profile.membership_status !== 'active') {
  window.location.href = 'auth/inactive.html';  // adjust path if needed
  throw new Error('Membership inactive');
}

// User is confirmed active — page logic continues below this point.
