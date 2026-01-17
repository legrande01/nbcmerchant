import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'merchant' | 'driver' | 'transport_admin' | 'admin';

interface RoleContextType {
  currentRole: UserRole | null;
  setCurrentRole: (role: UserRole) => void;
  availableRoles: UserRole[];
  hasMultipleRoles: boolean;
  isRoleLoading: boolean;
  // Legacy compatibility
  user: { id: string; name: string; email: string; roles: UserRole[]; avatar?: string } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Demo users for fallback when Supabase auth is not set up
const demoUsers: Record<string, { password: string; roles: UserRole[]; name: string }> = {
  'merchant@demo.com': {
    password: 'demo123',
    roles: ['merchant'],
    name: 'James Kioko',
  },
  'driver@demo.com': {
    password: 'demo123',
    roles: ['driver'],
    name: 'Sarah Mwangi',
  },
  'admin@demo.com': {
    password: 'demo123',
    roles: ['merchant', 'driver'],
    name: 'Admin User',
  },
  'transport@demo.com': {
    password: 'demo123',
    roles: ['transport_admin'],
    name: 'Transport Admin',
  },
};

export function RoleProvider({ children }: { children: ReactNode }) {
  const { user: authUser, isLoading: authLoading, signIn, signOut } = useAuth();
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [availableRoles, setAvailableRoles] = useState<UserRole[]>([]);
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  
  // Demo mode state (for when Supabase users aren't set up)
  const [demoUser, setDemoUser] = useState<{ id: string; name: string; email: string; roles: UserRole[] } | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Fetch user roles from database when auth user changes
  useEffect(() => {
    const fetchRoles = async () => {
      if (authUser) {
        setIsRoleLoading(true);
        try {
          // Try to fetch roles from user_roles table
          const { data: roles, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', authUser.id);

          if (error) {
            console.error('Error fetching roles:', error);
            // Fallback to default role
            setAvailableRoles(['merchant']);
            setCurrentRole('merchant');
          } else if (roles && roles.length > 0) {
            const userRoles = roles.map(r => r.role as UserRole);
            setAvailableRoles(userRoles);
            setCurrentRole(userRoles[0]);
          } else {
            // No roles assigned, default to merchant
            setAvailableRoles(['merchant']);
            setCurrentRole('merchant');
          }
        } catch (err) {
          console.error('Failed to fetch roles:', err);
          setAvailableRoles(['merchant']);
          setCurrentRole('merchant');
        }
        setIsRoleLoading(false);
      } else if (demoUser) {
        // Demo mode - use demo user roles
        setAvailableRoles(demoUser.roles);
        setCurrentRole(demoUser.roles[0]);
        setIsRoleLoading(false);
      } else if (!authLoading) {
        // Not authenticated
        setAvailableRoles([]);
        setCurrentRole(null);
        setIsRoleLoading(false);
      }
    };

    fetchRoles();
  }, [authUser, authLoading, demoUser]);

  // Handle auth loading state
  useEffect(() => {
    if (!authLoading && !authUser && !demoUser) {
      setIsRoleLoading(false);
    }
  }, [authLoading, authUser, demoUser]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // First try Supabase auth
    const { error } = await signIn(email, password);
    
    if (!error) {
      setIsDemoMode(false);
      setDemoUser(null);
      return { success: true };
    }
    
    // Fallback to demo mode if Supabase auth fails
    const demo = demoUsers[email.toLowerCase()];
    if (demo && demo.password === password) {
      setIsDemoMode(true);
      setDemoUser({
        id: `demo-${email}`,
        name: demo.name,
        email: email.toLowerCase(),
        roles: demo.roles,
      });
      return { success: true };
    }
    
    return { success: false, error: error?.message || 'Invalid credentials' };
  };

  const logout = async () => {
    await signOut();
    setDemoUser(null);
    setIsDemoMode(false);
    setCurrentRole(null);
    setAvailableRoles([]);
  };

  // Construct user object for legacy compatibility
  const user = authUser 
    ? {
        id: authUser.id,
        name: authUser.user_metadata?.full_name || authUser.email || 'User',
        email: authUser.email || '',
        roles: availableRoles,
      }
    : demoUser;

  const isAuthenticated = !!(authUser || demoUser);

  const value: RoleContextType = {
    currentRole,
    setCurrentRole,
    availableRoles,
    hasMultipleRoles: availableRoles.length > 1,
    isRoleLoading,
    user,
    isAuthenticated,
    login,
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
