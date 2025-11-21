import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenu, HiOutlineMoon, HiOutlineSun, HiOutlineUserCircle, HiX } from 'react-icons/hi';

const authedNavLinks = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'quizzes', label: 'Quizzes', path: '/quiz' },
  { id: 'simulation', label: 'Simulation', path: '/simulation' },
  { id: 'resources', label: 'Resources', path: '/resources' },
  { id: 'friends-group', label: 'Group', path: '/admin/friends-group' },
];

const LoginHeaderComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const profileMenuRef = useRef(null);

  // Check authentication - redirect to login if not authenticated
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('acceptopia-authenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/portal', { replace: true, state: { from: location } });
    }
  }, [navigate, location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('acceptopia-theme');
    if (storedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('acceptopia-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('acceptopia-theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  const getActiveLink = () => {
    const { pathname } = location;
    if (pathname === '/dashboard' || pathname === '/') return 'Dashboard';
    if (pathname === '/profile') return 'Profile';
    if (pathname === '/quiz') return 'Quizzes';
    if (pathname === '/simulation') return 'Simulation';
    if (pathname === '/rewards') return 'Rewards';
    if (pathname === '/admin/friends-group') return 'Group';
    if (pathname === '/resources') return 'Resources';
    return '';
  };

  const activeLink = getActiveLink();

  const handleThemeToggle = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const handleSignOut = useCallback(() => {
    sessionStorage.removeItem('acceptopia-authenticated');
    setIsProfileMenuOpen(false);
    navigate('/portal', { replace: true });
  }, [navigate]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
        isScrolled
          ? 'border-sky-100 bg-white/95 backdrop-blur shadow-lg shadow-sky-200/60'
          : 'border-transparent bg-white/85 backdrop-blur-sm'
      }`}
    >
      <nav className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 md:h-20 items-center justify-between gap-1.5 sm:gap-2 md:gap-4 lg:gap-6 overflow-visible">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex flex-none items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0 flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative flex-shrink-0"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 48 48"
                className="sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
              >
                <polygon
                  points="24,4 38,12 38,28 24,36 10,28 10,12"
                  fill="none"
                  stroke="rgb(56,189,248)"
                  strokeWidth="2"
                  className="drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]"
                />
                <circle
                  cx="24"
                  cy="20"
                  r="8"
                  fill="none"
                  stroke="rgb(56,189,248)"
                  strokeWidth="2"
                  className="drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]"
                />
              </svg>
            </motion.div>
            <Link
              to="/dashboard"
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold relative truncate"
              aria-label="Acceptopia Dashboard"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">
                Acceptopia
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent blur-sm opacity-50 -z-10">
                Acceptopia
              </span>
            </Link>
          </motion.div>

          <div className="hidden flex-1 items-center justify-start gap-2 sm:gap-3 md:gap-4 pl-2 sm:pl-4 md:pl-6 lg:flex">
            {authedNavLinks.map((link) => (
              <Link key={link.id} to={link.path}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ y: 0 }}
                  className={`relative inline-flex items-center rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.26em] transition-all duration-200 ${
                    activeLink === link.label
                      ? 'bg-sky-50 text-sky-600 shadow-inner shadow-sky-100 ring-1 ring-sky-100'
                      : 'text-slate-500 hover:bg-sky-50 hover:text-sky-600'
                  }`}
                  aria-current={activeLink === link.label ? 'page' : undefined}
                >
                  <span className="whitespace-nowrap">{link.label}</span>
                  {activeLink === link.label && (
                    <motion.span
                      layoutId="loginActiveIndicator"
                      className="absolute -bottom-2 left-4 sm:left-6 right-4 sm:right-6 h-0.5 rounded-full bg-sky-500"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex flex-none items-center gap-1.5 sm:gap-2 md:gap-3 pl-1 sm:pl-2">
            {/* Theme Toggle Button - Visible on all screens */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleThemeToggle}
              className="inline-flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 rounded-full border border-sky-100/60 bg-white/80 px-2 sm:px-2.5 md:px-3 lg:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 shadow-sm shadow-sky-200/60 transition-colors duration-200 hover:bg-white h-8 w-8 sm:h-9 sm:w-9 md:h-auto md:w-auto flex-shrink-0 z-10"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <HiOutlineMoon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4 md:w-4 text-sky-500" />
              ) : (
                <HiOutlineSun className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4 md:w-4 text-amber-400" />
              )}
              <span className="hidden xl:inline">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </motion.button>

            {/* Profile Button - Visible on all screens */}
            <div className="relative" ref={profileMenuRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="inline-flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 px-2 sm:px-3 md:px-4 lg:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.26em] md:tracking-[0.32em] text-white shadow-lg shadow-sky-300/40 transition-transform duration-200 hover:shadow-xl h-8 w-8 sm:h-9 sm:w-9 md:h-auto md:w-auto flex-shrink-0 z-10"
                aria-haspopup="menu"
                aria-expanded={isProfileMenuOpen}
              >
                <HiOutlineUserCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                <span className="hidden md:inline whitespace-nowrap">Profile</span>
              </motion.button>
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 z-50 mt-2 sm:mt-3 w-48 sm:w-52 overflow-hidden rounded-xl sm:rounded-2xl border border-sky-100 bg-white/95 shadow-xl shadow-sky-200/40 backdrop-blur"
                    role="menu"
                  >
                    <Link
                      to="/profile"
                      className="block px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-600 transition hover:bg-sky-50 hover:text-sky-600"
                      onClick={() => setIsProfileMenuOpen(false)}
                      role="menuitem"
                    >
                      View Profile
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-600 transition hover:bg-sky-50 hover:text-sky-600"
                      onClick={() => setIsProfileMenuOpen(false)}
                      role="menuitem"
                    >
                      Edit Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-semibold text-rose-500 transition hover:bg-rose-50 hover:text-rose-600"
                      role="menuitem"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button - Mobile Only */}
            <button
              onClick={toggleMobileMenu}
              className="inline-flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-600 transition hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white lg:hidden flex-shrink-0 z-10"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <HiX className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" /> : <HiMenu className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="login-mobile-nav"
              className="fixed inset-0 z-[60] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
                onClick={toggleMobileMenu}
                role="button"
                tabIndex={-1}
                aria-label="Close navigation"
              />
              <motion.aside
                className="absolute right-0 top-0 flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white text-slate-700 shadow-2xl shadow-sky-200/70"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-sky-100 px-5 py-4">
                  <Link to="/dashboard" className="text-lg font-semibold relative flex items-center gap-2" onClick={handleLinkClick}>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 48 48"
                      className="sm:w-8 sm:h-8 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]"
                    >
                      <polygon
                        points="24,4 38,12 38,28 24,36 10,28 10,12"
                        fill="none"
                        stroke="rgb(56,189,248)"
                        strokeWidth="2"
                        className="drop-shadow-[0_0_4px_rgba(56,189,248,0.8)]"
                      />
                      <circle
                        cx="24"
                        cy="20"
                        r="8"
                        fill="none"
                        stroke="rgb(56,189,248)"
                        strokeWidth="2"
                        className="drop-shadow-[0_0_4px_rgba(56,189,248,0.8)]"
                      />
                    </svg>
                    <span className="text-base sm:text-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(139,92,246,0.5)]">
                      Acceptopia
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={toggleMobileMenu}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-100 bg-white text-sky-600 hover:bg-sky-50"
                    aria-label="Close menu"
                  >
                    <HiX className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-1 flex-col min-h-0">
                  {/* Scrollable Menu Items */}
                  <div className="flex-1 overflow-y-auto px-5 py-6">
                    <div className="flex flex-col gap-3">
                      {/* Dashboard */}
                      <Link to="/dashboard" onClick={handleLinkClick} className="w-full">
                        <motion.button
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 }}
                          className={`w-full flex items-center justify-between gap-2 px-4 py-4 rounded-xl text-base font-semibold transition-colors duration-150 border-2 ${
                            activeLink === 'Dashboard' 
                              ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-md' 
                              : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300'
                          }`}
                        >
                          <span>Dashboard</span>
                          <span className={`h-2.5 w-2.5 rounded-full ${activeLink === 'Dashboard' ? 'bg-sky-500' : 'bg-sky-100'}`} />
                        </motion.button>
                      </Link>

                      {/* Profile */}
                      <Link to="/profile" onClick={handleLinkClick} className="w-full">
                        <motion.button
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className={`w-full flex items-center justify-between gap-2 px-4 py-4 rounded-xl text-base font-semibold transition-colors duration-150 border-2 ${
                            activeLink === 'Profile' 
                              ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-md' 
                              : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300'
                          }`}
                        >
                          <span>Profile</span>
                          <span className={`h-2.5 w-2.5 rounded-full ${activeLink === 'Profile' ? 'bg-sky-500' : 'bg-sky-100'}`} />
                        </motion.button>
                      </Link>

                      {/* Quizzes */}
                      <Link to="/quiz" onClick={handleLinkClick} className="w-full">
                        <motion.button
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 }}
                          className={`w-full flex items-center justify-between gap-2 px-4 py-4 rounded-xl text-base font-semibold transition-colors duration-150 border-2 ${
                            activeLink === 'Quizzes' 
                              ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-md' 
                              : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300'
                          }`}
                        >
                          <span>Quizzes</span>
                          <span className={`h-2.5 w-2.5 rounded-full ${activeLink === 'Quizzes' ? 'bg-sky-500' : 'bg-sky-100'}`} />
                        </motion.button>
                      </Link>

                      {/* Simulations */}
                      <Link to="/simulation" onClick={handleLinkClick} className="w-full">
                        <motion.button
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className={`w-full flex items-center justify-between gap-2 px-4 py-4 rounded-xl text-base font-semibold transition-colors duration-150 border-2 ${
                            activeLink === 'Simulation' 
                              ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-md' 
                              : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300'
                          }`}
                        >
                          <span>Simulations</span>
                          <span className={`h-2.5 w-2.5 rounded-full ${activeLink === 'Simulation' ? 'bg-sky-500' : 'bg-sky-100'}`} />
                        </motion.button>
                      </Link>

                      {/* Rewards */}
                      <Link to="/rewards" onClick={handleLinkClick} className="w-full">
                        <motion.button
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 }}
                          className={`w-full flex items-center justify-between gap-2 px-4 py-4 rounded-xl text-base font-semibold transition-colors duration-150 border-2 ${
                            activeLink === 'Rewards' 
                              ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-md' 
                              : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300'
                          }`}
                        >
                          <span>Rewards</span>
                          <span className={`h-2.5 w-2.5 rounded-full ${activeLink === 'Rewards' ? 'bg-sky-500' : 'bg-sky-100'}`} />
                        </motion.button>
                      </Link>

                      {/* Group */}
                      <Link to="/admin/friends-group" onClick={handleLinkClick} className="w-full">
                        <motion.button
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className={`w-full flex items-center justify-between gap-2 px-4 py-4 rounded-xl text-base font-semibold transition-colors duration-150 border-2 ${
                            activeLink === 'Group' 
                              ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-md' 
                              : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300'
                          }`}
                        >
                          <span>Group</span>
                          <span className={`h-2.5 w-2.5 rounded-full ${activeLink === 'Group' ? 'bg-sky-500' : 'bg-sky-100'}`} />
                        </motion.button>
                      </Link>

                      {/* Resources */}
                      <Link to="/resources" onClick={handleLinkClick} className="w-full">
                        <motion.button
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35 }}
                          className={`w-full flex items-center justify-between gap-2 px-4 py-4 rounded-xl text-base font-semibold transition-colors duration-150 border-2 ${
                            activeLink === 'Resources' 
                              ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-md' 
                              : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300'
                          }`}
                        >
                          <span>Resources</span>
                          <span className={`h-2.5 w-2.5 rounded-full ${activeLink === 'Resources' ? 'bg-sky-500' : 'bg-sky-100'}`} />
                        </motion.button>
                      </Link>

                      {/* Settings */}
                      <Link to="/profile" onClick={handleLinkClick} className="w-full">
                        <motion.button
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className="w-full flex items-center justify-between gap-2 px-4 py-4 rounded-xl text-base font-semibold transition-colors duration-150 border-2 bg-white text-slate-700 border-sky-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300"
                        >
                          <span>Settings</span>
                          <span className="h-2.5 w-2.5 rounded-full bg-sky-100" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>

                  {/* Fixed Bottom Section */}
                  <div className="p-5 border-t border-sky-200 bg-sky-50/50 space-y-3">
                    {/* Theme Toggle */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleThemeToggle}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-sky-100 bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm shadow-sky-100 transition hover:bg-sky-50"
                    >
                      {theme === 'light' ? (
                        <HiOutlineMoon className="h-5 w-5 text-sky-500" />
                      ) : (
                        <HiOutlineSun className="h-5 w-5 text-amber-400" />
                      )}
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </motion.button>

                    {/* Logout Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        handleLinkClick();
                        handleSignOut();
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-rose-300/40 transition hover:shadow-xl hover:scale-[1.02]"
                    >
                      <span>Logout</span>
                      <span className="text-sm">↗</span>
                    </motion.button>
                  </div>
                </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export const Header = memo(LoginHeaderComponent);
export default Header;


