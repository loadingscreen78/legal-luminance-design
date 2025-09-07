-- Fix security issues by removing the problematic view

-- Remove the view that exposes auth.users
DROP VIEW IF EXISTS public.user_roles_view;

-- Create a safer function to get user role information without exposing auth.users
CREATE OR REPLACE FUNCTION public.get_user_role_info(target_user_id uuid DEFAULT NULL)
RETURNS TABLE (
  user_id uuid,
  full_name text,
  phone text,
  role text,
  permissions jsonb,
  admin_since timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to query other users, or users to query themselves
  IF NOT (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()) OR
    target_user_id = auth.uid() OR
    target_user_id IS NULL
  ) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  RETURN QUERY
  SELECT 
    COALESCE(target_user_id, auth.uid()) as user_id,
    p.full_name,
    p.phone,
    CASE 
      WHEN a.user_id IS NOT NULL THEN a.admin_level
      ELSE 'user'
    END::text as role,
    a.permissions,
    a.created_at as admin_since
  FROM public.profiles p
  LEFT JOIN public.admin_users a ON p.user_id = a.user_id
  WHERE p.user_id = COALESCE(target_user_id, auth.uid());
END;
$$;