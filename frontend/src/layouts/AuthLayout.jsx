import { Outlet, Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const AuthLayout = () => {
  const { isAuthenticated, user } = useAuthStore();

  // Redirect if already authenticated
  if (isAuthenticated) {
    const dashboardRoute = user?.role === 'worker'
      ? '/dashboard/worker'
      : user?.role === 'employer'
      ? '/dashboard/employer'
      : user?.role === 'admin'
      ? '/dashboard/admin'
      : '/';
    return <Navigate to={dashboardRoute} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
