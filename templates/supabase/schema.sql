-- USERS TABLE + ROW LEVEL SECURITY
-- ----------------------------------
-- Run this once in the Supabase SQL editor when setting up a new app.
-- The users table mirrors auth.users and adds membership_status.
--
-- Steps:
--   1. Paste into Supabase > SQL Editor > New query
--   2. Run
--   3. Add members using add-member.sql

CREATE TABLE IF NOT EXISTS public.users (
  id                uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email             text NOT NULL,
  full_name         text,
  membership_status text NOT NULL DEFAULT 'inactive',
  created_at        timestamptz DEFAULT now()
);

-- Row level security: users can only see and update their own row.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own row"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own row"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);
