import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenu, HiOutlineMoon, HiOutlineSun, HiOutlineUserCircle, HiX } from 'react-icons/hi';

const authedNavLinks = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'quizzes', label: 'Quizzes', path: '/quiz' },
  { id: 'simulation', label: 'Simulation', path: '/simulation' },
  { id: 'resources', label: 'Resources', path: '/resources' },
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
    if (pathname === '/quiz') return 'Quizzes';
    if (pathname === '/simulation') return 'Simulation';
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
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 md:h-20 items-center justify-between gap-2 sm:gap-4 md:gap-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex flex-none items-center gap-2 sm:gap-3">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative flex-shrink-0"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 48 48"
                className="sm:w-10 sm:h-10 md:w-12 md:h-12 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
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
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold relative"
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

          <div className="hidden flex-none items-center gap-2 sm:gap-3 pl-2 lg:flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleThemeToggle}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-sky-100/60 bg-white/80 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 shadow-sm shadow-sky-200/60 transition-colors duration-200 hover:bg-white"
            >
              {theme === 'light' ? (
                <HiOutlineMoon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-sky-500" />
              ) : (
                <HiOutlineSun className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
              )}
              <span className="hidden xl:inline">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </motion.button>

            <div className="relative" ref={profileMenuRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.32em] text-white shadow-lg shadow-sky-300/40 transition-transform duration-200 hover:shadow-xl"
                aria-haspopup="menu"
                aria-expanded={isProfileMenuOpen}
              >
                <HiOutlineUserCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="whitespace-nowrap">Profile</span>
              </motion.button>
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 z-50 mt-3 w-52 overflow-hidden rounded-2xl border border-sky-100 bg-white/95 shadow-xl shadow-sky-200/40 backdrop-blur"
                    role="menu"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-sky-50 hover:text-sky-600"
                      onClick={() => setIsProfileMenuOpen(false)}
                      role="menuitem"
                    >
                      View Profile
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-sky-50 hover:text-sky-600"
                      onClick={() => setIsProfileMenuOpen(false)}
                      role="menuitem"
                    >
                      Edit Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full px-4 py-3 text-left text-sm font-semibold text-rose-500 transition hover:bg-rose-50 hover:text-rose-600"
                      role="menuitem"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-600 transition hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white lg:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <HiX className="h-5 w-5 sm:h-6 sm:w-6" /> : <HiMenu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
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

                <div className="flex flex-1 flex-col gap-6 px-5 py-6">
                  <div className="flex flex-col divide-y divide-sky-100 rounded-2xl border border-sky-100 bg-white">
                    {authedNavLinks.map((link, index) => (
                      <Link key={link.id} to={link.path} onClick={handleLinkClick}>
                        <motion.div
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex items-center justify-between gap-2 px-5 py-3 text-sm font-semibold transition-colors duration-150 ${
                            activeLink === link.label ? 'text-sky-600' : 'text-slate-500 hover:text-sky-600'
                          }`}
                        >
                          <span>{link.label}</span>
                          <span
                            className={`h-2 w-2 rounded-full transition ${
                              activeLink === link.label ? 'bg-sky-500' : 'bg-sky-100'
                            }`}
                          />
                        </motion.div>
                      </Link>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleThemeToggle}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-sky-100 bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm shadow-sky-100 transition hover:bg-sky-50"
                    >
                      {theme === 'light' ? (
                        <HiOutlineMoon className="h-5 w-5 text-sky-500" />
                      ) : (
                        <HiOutlineSun className="h-5 w-5 text-amber-400" />
                      )}
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </motion.button>
                    <div className="flex flex-col gap-2 rounded-3xl border border-sky-100 bg-white/80 p-4 shadow-lg shadow-sky-200/50">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-400">Account</h4>
                      <button
                        type="button"
                        onClick={() => {
                          handleLinkClick();
                          setIsProfileMenuOpen(false);
                          navigate('/profile');
                        }}
                        className="flex items-center justify-between rounded-xl border border-transparent bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-600 transition hover:border-sky-200 hover:bg-white"
                      >
                        View Profile
                        <span className="text-xs">→</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleLinkClick();
                          setIsProfileMenuOpen(false);
                          navigate('/profile');
                        }}
                        className="flex items-center justify-between rounded-xl border border-transparent bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-sky-200 hover:bg-white"
                      >
                        Edit Profile
                        <span className="text-xs">→</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleLinkClick();
                          handleSignOut();
                        }}
                        className="flex items-center justify-between rounded-xl border border-transparent bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-500 transition hover:border-rose-200 hover:bg-white"
                      >
                        Sign Out
                        <span className="text-xs">↗</span>
                      </button>
                    </div>
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


