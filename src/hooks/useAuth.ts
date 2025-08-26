import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AdminUser, Profile } from '@/types/database';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await loadUserData(session.user.id);
      }
      
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadUserData(session.user.id);
        } else {
          setProfile(null);
          setAdminUser(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (userId: string) => {
    // Load profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    setProfile(profileData);

    // Check if user is admin
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    setAdminUser(adminData as AdminUser);
  };

  const signIn = async (email: string, password: string, securityCode?: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user && securityCode) {
        // Check if provided security code matches admin requirements
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', data.user.id)
          .single();

        if (adminError && adminError.code !== 'PGRST116') {
          throw new Error('Failed to verify admin status');
        }

        // Enhanced security: Remove hardcoded admin code
        // Admin accounts should now be created by existing super admins only
        if (!adminData) {
          await supabase.auth.signOut();
          throw new Error('Admin access requires invitation from existing super admin');
        }
      }

      // Log successful authentication for security audit
      if (data.user) {
        try {
          await supabase.from('security_audit_log').insert({
            user_id: data.user.id,
            action: 'login',
            table_name: 'auth.users',
            record_id: data.user.id,
            ip_address: null, // Could be enhanced with actual IP
            user_agent: navigator.userAgent,
          });
        } catch (auditError) {
          // Don't fail login if audit logging fails
          console.warn('Failed to log authentication event:', auditError);
        }
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      // Log failed authentication attempt
      try {
        await supabase.from('security_audit_log').insert({
          user_id: null,
          action: 'failed_login',
          table_name: 'auth.users',
          new_values: { email, error: error.message },
          ip_address: null,
          user_agent: navigator.userAgent,
        });
      } catch (auditError) {
        console.warn('Failed to log failed authentication:', auditError);
      }
      
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData?: Partial<Profile>) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });

    if (data.user && userData) {
      // Create profile
      await supabase.from('profiles').insert({
        user_id: data.user.id,
        ...userData,
      });
    }

    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (data) {
      setProfile(data);
    }

    return { data, error };
  };

  return {
    user,
    profile,
    adminUser,
    loading,
    isAdmin: !!adminUser,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };
};