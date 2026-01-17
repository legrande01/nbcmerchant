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
  loginDemo: (email: string, password: string, role: UserRole, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Demo email patterns for role assignment (used for role fetching fallback only)
// The actual role assignment happens in the database via the edge function
const DEMO_EMAIL_PATTERNS: readonly string[] = [
  'merchant@demo.com',
  'driver@demo.com', 
  'admin@demo.com',
] as const;

// Helper to check if an email is a demo account
const isDemoEmail = (email: string): boolean => {
  return DEMO_EMAIL_PATTERNS.includes(email);
};

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

  const buildUserFromSession = async (supabaseUser: SupabaseUser, overrideRole?: UserRole): Promise<User> => {
    let roles = await fetchUserRoles(supabaseUser.id);
    
    // Ensure we have at least one role
    if (!roles || roles.length === 0) {
      roles = ['merchant'];
    }
    
    // If an override role is specified and it's in the user's roles, put it first
    if (overrideRole && roles.includes(overrideRole)) {
      const filteredRoles = roles.filter(r => r !== overrideRole);
      filteredRoles.unshift(overrideRole);
      roles = filteredRoles;
    }
    
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
          // Use the first role from the database
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
        // Use the first role from the database
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
        // Use the first role from the database
        setCurrentRole(appUser.roles[0] || 'merchant');
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const loginDemo = async (
    email: string,
    password: string,
    role: UserRole,
    name: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // First try to log in
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginData?.user) {
        // Login successful - set the role based on the demo type
        const appUser = await buildUserFromSession(loginData.user, role);
        setUser(appUser);
        setCurrentRole(role);
        return { success: true };
      }

      // If login failed, try to create the demo account
      if (loginError?.message?.includes('Invalid login credentials')) {
        const { data: signupData, error: signupError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (signupError) {
          return { success: false, error: signupError.message };
        }

        if (signupData.user) {
          // Assign the demo role via edge function (edge function uses authenticated user's email)
          try {
            await supabase.functions.invoke('assign-demo-role', {
              body: { email },
            });
          } catch (roleError) {
            console.error('Error assigning demo role:', roleError);
          }

          // Small delay to ensure role is assigned
          await new Promise(resolve => setTimeout(resolve, 500));

          const appUser = await buildUserFromSession(signupData.user, role);
          setUser(appUser);
          setCurrentRole(role);
          return { success: true };
        }
      }

      return { success: false, error: loginError?.message || 'Login failed' };
    } catch (err) {
      console.error('Demo login error:', err);
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
    loginDemo,
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
