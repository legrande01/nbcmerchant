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
  user: User;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  hasMultipleRoles: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Mock user with multiple roles for demonstration
const mockUser: User = {
  id: 'user-1',
  name: 'James Kioko',
  email: 'james.kioko@email.com',
  roles: ['merchant', 'driver'], // User has both roles
};

export function RoleProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>(mockUser.roles[0]);

  const value: RoleContextType = {
    user: mockUser,
    currentRole,
    setCurrentRole,
    hasMultipleRoles: mockUser.roles.length > 1,
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
