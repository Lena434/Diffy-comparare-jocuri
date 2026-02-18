import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../contexts/AuthContext';
import { ROUTES } from './routes';

interface GuardProps {
  requireAuth?: boolean;
  publicOnly?: boolean;
  allowRoles?: UserRole[];
}

function Guard({ requireAuth = false, publicOnly = false, allowRoles }: GuardProps) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (publicOnly && isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  if (allowRoles && (!role || !allowRoles.includes(role))) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
}

export default Guard;
