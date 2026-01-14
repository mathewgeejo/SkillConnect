import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  FiHome, FiUser, FiBriefcase, FiFileText, FiAward, FiImage,
  FiStar, FiMessageSquare, FiBell, FiSettings, FiLogOut, FiMenu, FiX,
  FiUsers, FiShield, FiBarChart
} from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import AIHelperBot from '../components/AIHelperBot';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Role-based menu items
  const getMenuItems = () => {
    if (user?.role === 'worker') {
      return [
        { path: '/dashboard/worker', icon: FiHome, label: 'Dashboard' },
        { path: '/dashboard/worker/profile', icon: FiUser, label: 'Profile' },
        { path: '/dashboard/worker/jobs', icon: FiBriefcase, label: 'Browse Jobs' },
        { path: '/dashboard/worker/applications', icon: FiFileText, label: 'Applications' },
        { path: '/dashboard/worker/certificates', icon: FiAward, label: 'Certificates' },
        { path: '/dashboard/worker/portfolio', icon: FiImage, label: 'Portfolio' },
        { path: '/dashboard/worker/reviews', icon: FiStar, label: 'Reviews' },
        { path: '/dashboard/worker/messages', icon: FiMessageSquare, label: 'Messages' },
        { path: '/dashboard/worker/notifications', icon: FiBell, label: 'Notifications' },
        { path: '/dashboard/worker/settings', icon: FiSettings, label: 'Settings' },
      ];
    }

    if (user?.role === 'employer') {
      return [
        { path: '/dashboard/employer', icon: FiHome, label: 'Dashboard' },
        { path: '/dashboard/employer/profile', icon: FiUser, label: 'Profile' },
        { path: '/dashboard/employer/jobs', icon: FiBriefcase, label: 'My Jobs' },
        { path: '/dashboard/employer/workers', icon: FiUsers, label: 'Find Workers' },
        { path: '/dashboard/employer/reviews', icon: FiStar, label: 'Reviews' },
        { path: '/dashboard/employer/messages', icon: FiMessageSquare, label: 'Messages' },
        { path: '/dashboard/employer/notifications', icon: FiBell, label: 'Notifications' },
        { path: '/dashboard/employer/settings', icon: FiSettings, label: 'Settings' },
      ];
    }

    if (user?.role === 'admin') {
      return [
        { path: '/dashboard/admin', icon: FiHome, label: 'Dashboard' },
        { path: '/dashboard/admin/users', icon: FiUsers, label: 'Users' },
        { path: '/dashboard/admin/certificates', icon: FiAward, label: 'Certificates' },
        { path: '/dashboard/admin/jobs', icon: FiBriefcase, label: 'Jobs' },
        { path: '/dashboard/admin/reviews', icon: FiStar, label: 'Reviews' },
        { path: '/dashboard/admin/messages', icon: FiMessageSquare, label: 'Messages' },
        { path: '/dashboard/admin/notifications', icon: FiBell, label: 'Notifications' },
        { path: '/dashboard/admin/settings', icon: FiSettings, label: 'Settings' },
      ];
    }

    return [];
  };

  const menuItems = getMenuItems();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-primary-800 text-white flex-shrink-0 transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 border-b border-primary-700">
          {sidebarOpen && (
            <Link to="/" className="font-heading text-xl font-bold">
              SkillConnect
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-primary-700 rounded-lg"
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? 'bg-secondary-500 text-white'
                        : 'text-gray-300 hover:bg-primary-700'
                    }`}
                  >
                    <Icon size={20} />
                    {sidebarOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto p-4 border-t border-primary-700 space-y-2">
          <button
            onClick={handleGoHome}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-primary-700 transition w-full"
          >
            <FiHome size={20} />
            {sidebarOpen && <span>Back to Home</span>}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 transition w-full"
          >
            <FiLogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 capitalize">{user?.role} Dashboard</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={`/dashboard/${user?.role}/notifications`}
              className="relative p-2 text-gray-600 hover:text-secondary-500 transition"
            >
              <FiBell size={24} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>

            <Link to={`/dashboard/${user?.role}/profile`}>
              <img
                src={user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.name}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* AI Helper Bot */}
      <AIHelperBot />
    </div>
  );
};

export default DashboardLayout;
