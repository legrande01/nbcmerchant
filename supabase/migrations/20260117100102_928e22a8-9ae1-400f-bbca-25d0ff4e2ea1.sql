-- Add explicit policies to block anonymous access to profiles and user_roles tables

-- Policy for profiles: Require authentication for all operations
CREATE POLICY "Require auth for profiles access"
ON public.profiles
FOR ALL
TO public
USING (auth.uid() IS NOT NULL);

-- Policy for user_roles: Require authentication for all operations (covers SELECT for non-authenticated)
CREATE POLICY "Require auth for user_roles access"
ON public.user_roles
FOR SELECT
TO public
USING (auth.uid() IS NOT NULL);