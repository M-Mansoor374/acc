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
        <div className="flex h-16 items-center justify-between gap-6 md:h-20">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex flex-none items-center">
            <Link
              to="/dashboard"
              className="text-2xl font-bold text-sky-700 transition-colors duration-200 hover:text-sky-500 md:text-3xl"
              aria-label="Acceptopia Dashboard"
            >
              Acceptopia
            </Link>
          </motion.div>

          <div className="hidden flex-1 items-center justify-start gap-4 pl-6 md:flex">
            {authedNavLinks.map((link) => (
              <Link key={link.id} to={link.path}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ y: 0 }}
                  className={`relative inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.26em] transition-all duration-200 ${
                    activeLink === link.label
                      ? 'bg-sky-50 text-sky-600 shadow-inner shadow-sky-100 ring-1 ring-sky-100'
                      : 'text-slate-500 hover:bg-sky-50 hover:text-sky-600'
                  }`}
                  aria-current={activeLink === link.label ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  {activeLink === link.label && (
                    <motion.span
                      layoutId="loginActiveIndicator"
                      className="absolute -bottom-2 left-6 right-6 h-0.5 rounded-full bg-sky-500"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="hidden flex-none items-center gap-3 pl-2 md:flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleThemeToggle}
              className="inline-flex items-center gap-2 rounded-full border border-sky-100/60 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 shadow-sm shadow-sky-200/60 transition-colors duration-200 hover:bg-white"
            >
              {theme === 'light' ? (
                <HiOutlineMoon className="h-4 w-4 text-sky-500" />
              ) : (
                <HiOutlineSun className="h-4 w-4 text-amber-400" />
              )}
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </motion.button>

            <div className="relative" ref={profileMenuRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 px-5 py-2 text-sm font-semibold uppercase tracking-[0.32em] text-white shadow-lg shadow-sky-300/40 transition-transform duration-200 hover:shadow-xl"
                aria-haspopup="menu"
                aria-expanded={isProfileMenuOpen}
              >
                <HiOutlineUserCircle className="h-5 w-5" />
                Profile
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-600 transition hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white md:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="login-mobile-nav"
              className="fixed inset-0 z-[60] md:hidden"
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
                  <Link to="/dashboard" className="text-lg font-semibold text-sky-700" onClick={handleLinkClick}>
                    Acceptopia
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


