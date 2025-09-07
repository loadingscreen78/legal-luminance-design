-- Create admin credentials by inserting into admin_users table
-- First, let's ensure we have a proper admin user setup

-- Insert a test admin user (you'll need to sign up with this email first)
-- This will be updated after the user signs up
INSERT INTO public.admin_users (user_id, admin_level, permissions) 
SELECT 
  id as user_id,
  'super_admin' as admin_level,
  '{"products": true, "orders": true, "transactions": true, "users": true}'::jsonb as permissions
FROM auth.users 
WHERE email = 'admin@test.com'
ON CONFLICT (user_id) DO UPDATE SET
  admin_level = 'super_admin',
  permissions = '{"products": true, "orders": true, "transactions": true, "users": true}'::jsonb;

-- Create a function to easily make any user an admin
CREATE OR REPLACE FUNCTION public.make_user_admin(user_email text, admin_level_param text DEFAULT 'admin')
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_users (user_id, admin_level, permissions)
  SELECT 
    au.id,
    admin_level_param::text,
    CASE 
      WHEN admin_level_param = 'super_admin' THEN '{"products": true, "orders": true, "transactions": true, "users": true}'::jsonb
      ELSE '{"products": true, "orders": true, "transactions": false, "users": false}'::jsonb
    END
  FROM auth.users au
  WHERE au.email = user_email
  ON CONFLICT (user_id) DO UPDATE SET
    admin_level = admin_level_param::text,
    permissions = CASE 
      WHEN admin_level_param = 'super_admin' THEN '{"products": true, "orders": true, "transactions": true, "users": true}'::jsonb
      ELSE '{"products": true, "orders": true, "transactions": false, "users": false}'::jsonb
    END,
    updated_at = now();
    
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with email % not found', user_email;
  END IF;
END;
$$;

-- Create a function to remove admin privileges
CREATE OR REPLACE FUNCTION public.remove_admin_privileges(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.admin_users 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = user_email);
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Admin user with email % not found', user_email;
  END IF;
END;
$$;

-- Ensure profiles table has unique constraint on user_id
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_key;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);

-- Add RLS policy for admins to read all profiles
CREATE POLICY "Admins can read all profiles" ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid()
  )
);

-- Add helpful view to see all users with their roles
CREATE OR REPLACE VIEW public.user_roles_view AS
SELECT 
  u.id,
  u.email,
  u.created_at as user_created_at,
  p.full_name,
  p.phone,
  CASE 
    WHEN a.user_id IS NOT NULL THEN a.admin_level
    ELSE 'user'
  END as role,
  a.permissions,
  a.created_at as admin_since
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.user_id  
LEFT JOIN public.admin_users a ON u.id = a.user_id;