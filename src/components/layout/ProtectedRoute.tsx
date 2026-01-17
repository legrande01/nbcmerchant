import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';
import { UserRole } from '@/contexts/RoleContext';

// Define route prefixes/patterns for each role
const ROLE_ROUTES: Record<UserRole, string[]> = {
  merchant: [
    '/orders',
    '/products',
    '/store',
    '/finance',
    '/marketing',
    '/reports',
  ],
  driver: [
    '/driver',
  ],
  transport_admin: [
    '/admin',
  ],
};

// Shared routes accessible by all authenticated users
const SHARED_ROUTES = ['/help', '/settings'];

// Default landing routes per role
const DEFAULT_ROUTES: Record<UserRole, string> = {
  merchant: '/',
  driver: '/',
  transport_admin: '/',
};

function isRouteAllowedForRole(pathname: string, role: UserRole): boolean {
  // Root path is always allowed (dashboard handles role-based rendering)
  if (pathname === '/') {
    return true;
  }

  // Shared routes are always allowed
  if (SHARED_ROUTES.some(route => pathname.startsWith(route))) {
    return true;
  }

  // Check if the route matches the role's allowed prefixes
  const allowedPrefixes = ROLE_ROUTES[role] || [];
  return allowedPrefixes.some(prefix => pathname.startsWith(prefix));
}

export function ProtectedRoute() {
  const { isAuthenticated, currentRole, isLoading } = useRole();
  const location = useLocation();

  // Show nothing while loading auth state to prevent flicker
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Check if current route is allowed for the user's role
  if (currentRole && !isRouteAllowedForRole(location.pathname, currentRole)) {
    // Redirect to the default route for this role
    const defaultRoute = DEFAULT_ROUTES[currentRole];
    return <Navigate to={defaultRoute} replace />;
  }

  return <Outlet />;
}
