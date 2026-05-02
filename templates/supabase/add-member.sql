-- ADD A NEW MEMBER
-- -----------------
-- Run this in the Supabase SQL editor after a user has signed up
-- via the login page. It copies them from auth.users into public.users
-- and sets their membership to active.
--
-- Steps:
--   1. Ask the user to sign up (or create them in Supabase Auth > Users)
--   2. Replace the email address below with their actual email
--   3. Paste into Supabase > SQL Editor > New query
--   4. Run

INSERT INTO public.users (id, email, membership_status)
SELECT id, email, 'active'
FROM auth.users
WHERE LOWER(email) = LOWER('email@here.com');

-- To deactivate a member later:
-- UPDATE public.users SET membership_status = 'inactive' WHERE LOWER(email) = LOWER('email@here.com');
