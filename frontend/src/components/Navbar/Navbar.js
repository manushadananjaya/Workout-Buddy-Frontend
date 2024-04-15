import React, { useState } from 'react';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800">
      <nav className="container mx-auto flex items-center justify-between py-4 text-white">
        {/* Logo with margin-right to prevent overlapping with screen border */}
        <Link to="/" className="text-xl font-bold text-white mr-4">
          Workout Buddy
        </Link>

        {/* Display user details and logout button on larger screens */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <p className="text-white">{`Welcome, ${user.email}`}</p>
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline text-white">
                Login
              </Link>
              <Link to="/signup" className="hover:underline text-white">
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Hamburger menu button for mobile */}
        <button
          className="block md:hidden text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Sidebar panel for mobile */}
        <div
          className={`md:hidden fixed inset-y-0 right-0 z-50 bg-gray-800 w-64 transition-transform transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-4">
            {user ? (
              <>
                <p className="text-white mb-4">{`Welcome, ${user.email}`}</p>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-white hover:underline mb-2"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-white hover:underline"
                  onClick={toggleMenu}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Backdrop for sidebar */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleMenu}
          ></div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
