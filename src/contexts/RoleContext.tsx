import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'merchant' | 'driver';

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
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Dummy users for demo
const dummyUsers: Record<string, { password: string; user: User }> = {
  'merchant@demo.com': {
    password: 'demo123',
    user: {
      id: 'user-1',
      name: 'James Kioko',
      email: 'merchant@demo.com',
      roles: ['merchant'],
    },
  },
  'driver@demo.com': {
    password: 'demo123',
    user: {
      id: 'user-2',
      name: 'Sarah Mwangi',
      email: 'driver@demo.com',
      roles: ['driver'],
    },
  },
  'admin@demo.com': {
    password: 'demo123',
    user: {
      id: 'user-3',
      name: 'Admin User',
      email: 'admin@demo.com',
      roles: ['merchant', 'driver'], // Has both roles
    },
  },
};

export function RoleProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('merchant');

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const dummyUser = dummyUsers[email.toLowerCase()];
    
    if (!dummyUser) {
      return { success: false, error: 'User not found' };
    }
    
    if (dummyUser.password !== password) {
      return { success: false, error: 'Invalid password' };
    }
    
    setUser(dummyUser.user);
    setCurrentRole(dummyUser.user.roles[0]);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setCurrentRole('merchant');
  };

  const value: RoleContextType = {
    user,
    currentRole,
    setCurrentRole,
    hasMultipleRoles: (user?.roles.length ?? 0) > 1,
    isAuthenticated: !!user,
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
