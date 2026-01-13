import { Navigate, Outlet } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';

export function ProtectedRoute() {
  const { isAuthenticated } = useRole();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
