import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Determine active link based on current path
  const getActiveLink = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path === '/dashboard') return 'Dashboard';
    return path.split('/')[1]?.charAt(0).toUpperCase() + path.split('/')[1]?.slice(1) || 'Home';
  };
  
  const activeLink = getActiveLink();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Resources', path: '/resources' },
    { name: 'Profile', path: '/profile' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full bg-white shadow-md"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link
              to="/"
              className="text-2xl md:text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200"
              aria-label="Acceptopia Home"
            >
              Acceptopia
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}>
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    activeLink === link.name
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  aria-current={activeLink === link.name ? 'page' : undefined}
                >
                  {link.name}
                  {activeLink === link.name && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                aria-label="Get Started"
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-200"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3 }}
                className="py-4 space-y-2"
              >
                {navLinks.map((link, index) => (
                  <Link key={link.name} to={link.path} onClick={handleLinkClick}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                        activeLink === link.name
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                      aria-current={activeLink === link.name ? 'page' : undefined}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                ))}
                <Link to="/dashboard" onClick={handleLinkClick}>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    aria-label="Get Started"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
