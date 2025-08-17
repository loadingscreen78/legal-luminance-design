-- Insert sample admin user into auth.users table and admin_users table
-- First, we need to create a function to handle admin creation since we can't directly insert into auth.users

-- Create a sample admin user entry in admin_users table
-- We'll use a known UUID for consistency
INSERT INTO admin_users (
  id,
  user_id, 
  admin_level,
  permissions,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001', -- Placeholder UUID for sample admin
  'super_admin',
  '{"security_code": "LA2024ADMIN", "full_access": true, "manage_users": true, "manage_orders": true}',
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;

-- Create a function to validate admin security codes
CREATE OR REPLACE FUNCTION public.validate_admin_security_code(
  p_user_id uuid,
  p_security_code text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM admin_users 
    WHERE user_id = p_user_id 
    AND (permissions->>'security_code') = p_security_code
  );
END;
$$;

-- Create a function to get admin info by security code (for login validation)
CREATE OR REPLACE FUNCTION public.get_admin_by_security_code(
  p_security_code text
)
RETURNS TABLE(user_id uuid, admin_level text, permissions jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    au.user_id,
    au.admin_level,
    au.permissions
  FROM admin_users au
  WHERE (au.permissions->>'security_code') = p_security_code;
END;
$$;