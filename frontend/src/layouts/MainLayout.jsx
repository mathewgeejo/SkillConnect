import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX, FiChevronDown, FiBell, FiUser } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

const MainLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (user?.role === 'worker') return '/dashboard/worker';
    if (user?.role === 'employer') return '/dashboard/employer';
    if (user?.role === 'admin') return '/dashboard/admin';
    return '/';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                SK
              </div>
              <span className="font-heading text-xl font-bold text-primary-800">
                SkillConnect Kerala
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link to="/" className="text-gray-700 hover:text-secondary-500 font-medium transition">
                Home
              </Link>
              <Link to="/workers" className="text-gray-700 hover:text-secondary-500 font-medium transition">
                Find Workers
              </Link>
              <Link to="/jobs" className="text-gray-700 hover:text-secondary-500 font-medium transition">
                Browse Jobs
              </Link>
              <Link to="/verify-certificate" className="text-gray-700 hover:text-secondary-500 font-medium transition">
                Verify Certificate
              </Link>
              <Link to="/pricing" className="text-gray-700 hover:text-secondary-500 font-medium transition">
                Pricing
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-secondary-500 font-medium transition">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-secondary-500 font-medium transition">
                Contact
              </Link>
            </div>

            {/* Auth Buttons / User Menu */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <img
                      src={user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.name}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{user?.name}</div>
                      <div className="text-sm text-gray-500 capitalize">{user?.role}</div>
                    </div>
                    <FiChevronDown className="text-gray-500" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                      <Link
                        to={getDashboardLink()}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to={`${getDashboardLink()}/profile`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to={`${getDashboardLink()}/settings`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/auth/login" className="btn btn-outline">
                    Login
                  </Link>
                  <Link to="/auth/signup" className="btn btn-primary">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <Link to="/" className="text-gray-700 hover:text-secondary-500 font-medium">
                  Home
                </Link>
                <Link to="/workers" className="text-gray-700 hover:text-secondary-500 font-medium">
                  Find Workers
                </Link>
                <Link to="/jobs" className="text-gray-700 hover:text-secondary-500 font-medium">
                  Browse Jobs
                </Link>
                <Link to="/verify-certificate" className="text-gray-700 hover:text-secondary-500 font-medium">
                  Verify Certificate
                </Link>
                <Link to="/pricing" className="text-gray-700 hover:text-secondary-500 font-medium">
                  Pricing
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-secondary-500 font-medium">
                  About
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-secondary-500 font-medium">
                  Contact
                </Link>
                <hr className="my-2" />
                {isAuthenticated ? (
                  <>
                    <Link to={getDashboardLink()} className="text-gray-700 hover:text-secondary-500 font-medium">
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className="text-left text-red-600 font-medium">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/auth/login" className="btn btn-outline w-full">
                      Login
                    </Link>
                    <Link to="/auth/signup" className="btn btn-primary w-full">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary-800 text-white mt-20">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center font-bold">
                  SK
                </div>
                <span className="font-heading text-lg font-bold">SkillConnect Kerala</span>
              </div>
              <p className="text-gray-300">
                Connecting verified skilled workers with employers in Kerala's Tier 3 cities.
              </p>
            </div>

            <div>
              <h3 className="font-heading font-bold mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
                <Link to="/features" className="text-gray-300 hover:text-white">Features</Link>
                <Link to="/pricing" className="text-gray-300 hover:text-white">Pricing</Link>
                <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold mb-4">For Workers</h3>
              <div className="flex flex-col gap-2">
                <Link to="/auth/signup" className="text-gray-300 hover:text-white">Sign Up</Link>
                <Link to="/workers" className="text-gray-300 hover:text-white">Browse Workers</Link>
                <Link to="/verify-certificate" className="text-gray-300 hover:text-white">Verify Certificate</Link>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold mb-4">For Employers</h3>
              <div className="flex flex-col gap-2">
                <Link to="/auth/signup" className="text-gray-300 hover:text-white">Sign Up</Link>
                <Link to="/jobs" className="text-gray-300 hover:text-white">Post a Job</Link>
                <Link to="/workers" className="text-gray-300 hover:text-white">Find Workers</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 SkillConnect Kerala. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
