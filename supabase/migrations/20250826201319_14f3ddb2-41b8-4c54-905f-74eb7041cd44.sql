-- Phase 1: Critical Database Security Fixes

-- 1. Fix admin_users table security
-- Add INSERT policy: Only existing super admins can create new admin accounts
CREATE POLICY "Super admins can create admin accounts" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND admin_level = 'super_admin'
  )
);

-- Add UPDATE policy: Only existing admins can update admin data
CREATE POLICY "Admins can update admin accounts" 
ON public.admin_users 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND admin_level IN ('admin', 'super_admin')
  )
);

-- Add DELETE policy: Only super admins can delete admin accounts
CREATE POLICY "Super admins can delete admin accounts" 
ON public.admin_users 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND admin_level = 'super_admin'
  )
);

-- 2. Secure transactions table
-- Add INSERT policy: Only authenticated users for their own orders or system functions
CREATE POLICY "Users can create transactions for own orders" 
ON public.transactions 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE id = transactions.order_id AND user_id = auth.uid()
  )
);

-- Add UPDATE policy: Only system functions or super admins can modify transactions
CREATE POLICY "Super admins can update transactions" 
ON public.transactions 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND admin_level = 'super_admin'
  )
);

-- Add DELETE policy: Only super admins can delete transactions
CREATE POLICY "Super admins can delete transactions" 
ON public.transactions 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND admin_level = 'super_admin'
  )
);

-- 3. Enhance order table security
-- Add DELETE policy: Only super admins can delete orders
CREATE POLICY "Super admins can delete orders" 
ON public.orders 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND admin_level = 'super_admin'
  )
);

-- 4. Secure order_items table
-- Add UPDATE policy: Only admins can update order items
CREATE POLICY "Admins can update order items" 
ON public.order_items 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND admin_level IN ('admin', 'super_admin')
  )
);

-- Add DELETE policy: Only admins can delete order items
CREATE POLICY "Admins can delete order items" 
ON public.order_items 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND admin_level IN ('admin', 'super_admin')
  )
);

-- 5. Add profiles DELETE policy
CREATE POLICY "Users can delete own profile" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- 6. Create security definer function to prevent infinite recursion
CREATE OR REPLACE FUNCTION public.get_current_user_admin_level()
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT admin_level 
    FROM public.admin_users 
    WHERE user_id = auth.uid()
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = '';

-- 7. Create audit log table for security monitoring
CREATE TABLE public.security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only super admins can read audit logs
CREATE POLICY "Super admins can read audit logs" 
ON public.security_audit_log 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND admin_level = 'super_admin'
  )
);

-- System can insert audit logs
CREATE POLICY "System can insert audit logs" 
ON public.security_audit_log 
FOR INSERT 
WITH CHECK (true);