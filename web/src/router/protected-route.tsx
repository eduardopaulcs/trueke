import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Wait for the initial session check before deciding whether to redirect.
  if (isLoading) return null;

  if (!isAuthenticated) {
    // Preserve the original destination so the login page can redirect back after auth.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
