-- Remove overly permissive RLS policies that expose data to all authenticated users

-- Drop the broad "Require auth for profiles access" policy from profiles
-- This allows ANY authenticated user to read ALL profiles (phones, names, etc.)
DROP POLICY IF EXISTS "Require auth for profiles access" ON public.profiles;

-- Drop the broad "Require auth for user_roles access" policy from user_roles
-- This allows ANY authenticated user to read ALL user roles
DROP POLICY IF EXISTS "Require auth for user_roles access" ON public.user_roles;