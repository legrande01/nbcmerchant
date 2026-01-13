// This file is kept for backward compatibility but now uses AuthContext
// All role functionality is now handled by AuthContext with real backend validation

import { createContext, useContext, ReactNode } from 'react';
import { useAuth, AppRole } from '@/contexts/AuthContext';

export type UserRole = AppRole;

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

export function RoleProvider({ children }: { children: ReactNode }) {
  const { user: authUser, profile, roles, currentRole, setCurrentRole, hasMultipleRoles } = useAuth();

  // Transform auth user to legacy format for backward compatibility
  const user: User = {
    id: authUser?.id || 'anonymous',
    name: profile?.full_name || authUser?.email?.split('@')[0] || 'Guest',
    email: authUser?.email || '',
    roles: roles as UserRole[],
    avatar: profile?.avatar_url || undefined,
  };

  const value: RoleContextType = {
    user,
    currentRole: currentRole as UserRole,
    setCurrentRole: setCurrentRole as (role: UserRole) => void,
    hasMultipleRoles,
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
