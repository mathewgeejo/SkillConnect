import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();

  // For development: allow access without authentication
  const isDevelopment = import.meta.env.DEV;
  
  if (!isDevelopment && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!isDevelopment && allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
