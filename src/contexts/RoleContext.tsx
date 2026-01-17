import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

export type UserRole = 'merchant' | 'driver' | 'transport_admin';

interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  avatar?: string;
}

interface RoleContextType {
  user: User | null;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  hasMultipleRoles: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('merchant');
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserRoles = async (userId: string): Promise<UserRole[]> => {
    try {
      const { data, error } = await supabase.rpc('get_user_roles', { _user_id: userId });
      if (error) {
        console.error('Error fetching user roles:', error);
        return ['merchant']; // Default role
      }
      return (data as UserRole[]) || ['merchant'];
    } catch (err) {
      console.error('Error in fetchUserRoles:', err);
      return ['merchant'];
    }
  };

  const buildUserFromSession = async (supabaseUser: SupabaseUser): Promise<User> => {
    const roles = await fetchUserRoles(supabaseUser.id);
    
    // Fetch profile for additional info
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('user_id', supabaseUser.id)
      .maybeSingle();

    return {
      id: supabaseUser.id,
      name: profile?.full_name || supabaseUser.email?.split('@')[0] || 'User',
      email: supabaseUser.email || '',
      roles,
      avatar: profile?.avatar_url || undefined,
    };
  };

  useEffect(() => {
    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const appUser = await buildUserFromSession(session.user);
          setUser(appUser);
          setCurrentRole(appUser.roles[0] || 'merchant');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const appUser = await buildUserFromSession(session.user);
        setUser(appUser);
        setCurrentRole(appUser.roles[0] || 'merchant');
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setCurrentRole('merchant');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        const appUser = await buildUserFromSession(data.user);
        setUser(appUser);
        setCurrentRole(appUser.roles[0] || 'merchant');
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signup = async (email: string, password: string, fullName: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        const appUser = await buildUserFromSession(data.user);
        setUser(appUser);
        setCurrentRole(appUser.roles[0] || 'merchant');
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentRole('merchant');
  };

  const value: RoleContextType = {
    user,
    currentRole,
    setCurrentRole,
    hasMultipleRoles: (user?.roles.length ?? 0) > 1,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
