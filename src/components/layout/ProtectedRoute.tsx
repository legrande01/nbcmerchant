import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';
import { UserRole } from '@/contexts/RoleContext';
import { useEffect, useRef } from 'react';

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

// Role-specific fallback routes for recovery
const FALLBACK_ROUTES: Record<UserRole, string> = {
  merchant: '/orders',
  driver: '/driver/deliveries',
  transport_admin: '/admin/deliveries',
};

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

// Session storage key to track fallback redirect
const FALLBACK_REDIRECT_KEY = 'route_fallback_used';

export function ProtectedRoute() {
  const { isAuthenticated, currentRole, isLoading } = useRole();
  const location = useLocation();
  const renderAttemptRef = useRef(0);
  const lastPathRef = useRef(location.pathname);

  // Reset render attempt counter when path changes
  useEffect(() => {
    if (lastPathRef.current !== location.pathname) {
      renderAttemptRef.current = 0;
      lastPathRef.current = location.pathname;
    }
  }, [location.pathname]);

  // Track render attempts to detect potential loops
  useEffect(() => {
    if (!isLoading && isAuthenticated && currentRole) {
      renderAttemptRef.current += 1;
      
      // If we've attempted to render more than 3 times rapidly, trigger fallback
      if (renderAttemptRef.current > 3) {
        const fallbackUsed = sessionStorage.getItem(FALLBACK_REDIRECT_KEY);
        
        if (!fallbackUsed) {
          console.warn('[ProtectedRoute] Detected potential routing loop, triggering fallback redirect');
          sessionStorage.setItem(FALLBACK_REDIRECT_KEY, 'true');
          const fallbackRoute = FALLBACK_ROUTES[currentRole];
          window.location.href = fallbackRoute;
        }
      }
    }
  });

  // Clear fallback flag on successful navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      sessionStorage.removeItem(FALLBACK_REDIRECT_KEY);
    }, 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

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
