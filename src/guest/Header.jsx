import React, { memo, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenu, HiOutlineUserAdd, HiX } from 'react-icons/hi';

const guestNavLinks = [
  { id: 'home', label: 'Home', path: '/', hash: null },
  { id: 'features', label: 'Features / Explore', path: '/', hash: '#features' },
  { id: 'resources', label: 'Resources', path: '/resources', hash: null },
  { id: 'about', label: 'About', path: '/', hash: '#about' },
  { id: 'support', label: 'Contact / Support', path: '/', hash: '#support' },
];

const baseNavClasses =
  'relative px-4 py-2 text-sm font-semibold tracking-wide rounded-xl transition-all duration-200 ease-out will-change-transform';
const baseNavHoverClasses =
  'before:absolute before:bottom-1.5 before:left-4 before:right-4 before:h-0.5 before:origin-center before:scale-x-0 before:rounded-full before:bg-current before:transition-transform before:duration-200 before:ease-out hover:before:scale-x-100';

const GuestHeaderComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash scrolling when navigating to homepage with hash
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  const getActiveLink = () => {
    const { pathname, hash } = location;
    if (pathname === '/' && (!hash || hash === '#home')) {
      return 'Home';
    }
    if (pathname === '/features' || hash === '#features') return 'Features / Explore';
    if (pathname === '/resources' || hash === '#resources') return 'Resources';
    if (hash === '#about') return 'About';
    if (hash === '#support') return 'Contact / Support';
    if (pathname === '/portal') return 'Login';
    if (pathname === '/signup') return 'Sign Up';
    return '';
  };

  const activeLink = getActiveLink();

  const handleLinkClick = (link) => {
    setIsMobileMenuOpen(false);
    
    // If link has a hash (like #features), handle navigation and scrolling
    if (link.hash) {
      if (location.pathname !== '/') {
        // Navigate to homepage first, then scroll after navigation
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(link.hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        // Already on homepage, just scroll
        const element = document.querySelector(link.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
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
              to="/"
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold relative"
              aria-label="Acceptopia Home"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">
                Acceptopia
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent blur-sm opacity-50 -z-10">
                Acceptopia
              </span>
            </Link>
          </motion.div>

          <div className="hidden flex-1 items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:flex">
            {guestNavLinks.map((link) => (
              link.hash ? (
                <motion.div
                  key={link.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  onClick={() => handleLinkClick(link)}
                  className={`${baseNavClasses} cursor-pointer ${
                    activeLink === link.label
                      ? 'bg-sky-50 text-sky-700 shadow-inner shadow-sky-100 before:bg-sky-500'
                      : 'text-slate-600 hover:-translate-y-0.5 hover:bg-sky-50/80 hover:text-sky-600'
                  } ${baseNavHoverClasses}`}
                  aria-current={activeLink === link.label ? 'page' : undefined}
                >
                  <span className="flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm">{link.label}</span>
                  {activeLink === link.label && (
                    <motion.div
                      layoutId="guestActiveIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-sky-500"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              ) : (
                <Link key={link.id} to={link.path}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className={`${baseNavClasses} ${
                      activeLink === link.label
                        ? 'bg-sky-50 text-sky-700 shadow-inner shadow-sky-100 before:bg-sky-500'
                        : 'text-slate-600 hover:-translate-y-0.5 hover:bg-sky-50/80 hover:text-sky-600'
                    } ${baseNavHoverClasses}`}
                    aria-current={activeLink === link.label ? 'page' : undefined}
                  >
                    <span className="flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm">{link.label}</span>
                    {activeLink === link.label && (
                      <motion.div
                        layoutId="guestActiveIndicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-sky-500"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              )
            ))}
          </div>

          <div className="flex flex-none items-center gap-2 sm:gap-3 pl-2 sm:pl-4">
            {/* Portal Button - Always Visible */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/portal')}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-sky-300/40 transition-transform duration-200 hover:scale-[1.04] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-white min-w-[40px] sm:min-w-auto"
              aria-label="Portal / Login"
            >
              <HiOutlineUserAdd className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="whitespace-nowrap hidden sm:inline">Portal</span>
            </motion.button>

            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={toggleMobileMenu}
              className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border-2 border-sky-300 bg-white text-sky-600 transition hover:bg-sky-50 hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white lg:hidden flex-shrink-0 shadow-md"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <HiX className="h-5 w-5 sm:h-6 sm:w-6" /> : <HiMenu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="guest-mobile-nav"
              className="fixed inset-0 z-[100] lg:hidden"
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
                  <Link to="/" className="text-lg font-semibold relative flex items-center gap-2" onClick={handleLinkClick}>
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
                  <div className="flex-1 overflow-y-auto px-5 py-6">
                    <div className="flex flex-col gap-3">
                      <motion.button
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 }}
                        onClick={() => handleLinkClick(guestNavLinks[0])}
                        className={`w-full flex items-center justify-between gap-2 px-4 py-4 rounded-xl text-base font-semibold transition-colors duration-150 border-2 ${
                          activeLink === 'Home' 
                            ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-md' 
                            : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300'
                        }`}
                      >
                        <span>Home</span>
                        <span className={`h-2.5 w-2.5 rounded-full ${activeLink === 'Home' ? 'bg-sky-500' : 'bg-sky-100'}`} />
                      </motion.button>

                      <motion.button
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        onClick={() => handleLinkClick(guestNavLinks[1])}
                        className={`w-full flex items-center justify-between gap-2 px-4 py-4 rounded-xl text-base font-semibold transition-colors duration-150 border-2 ${
                          activeLink === 'Features / Explore' 
                            ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-md' 
                            : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300'
                        }`}
                      >
                        <span>Features / Explore</span>
                        <span className={`h-2.5 w-2.5 rounded-full ${activeLink === 'Features / Explore' ? 'bg-sky-500' : 'bg-sky-100'}`} />
                      </motion.button>

                      <Link to="/resources" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                        <motion.button
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 }}
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

                      <motion.button
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={() => handleLinkClick(guestNavLinks[3])}
                        className={`w-full flex items-center justify-between gap-2 px-4 py-4 rounded-xl text-base font-semibold transition-colors duration-150 border-2 ${
                          activeLink === 'About' 
                            ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-md' 
                            : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300'
                        }`}
                      >
                        <span>About</span>
                        <span className={`h-2.5 w-2.5 rounded-full ${activeLink === 'About' ? 'bg-sky-500' : 'bg-sky-100'}`} />
                      </motion.button>

                      <motion.button
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        onClick={() => handleLinkClick(guestNavLinks[4])}
                        className={`w-full flex items-center justify-between gap-2 px-4 py-4 rounded-xl text-base font-semibold transition-colors duration-150 border-2 ${
                          activeLink === 'Contact / Support' 
                            ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-md' 
                            : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300'
                        }`}
                      >
                        <span>Contact / Support</span>
                        <span className={`h-2.5 w-2.5 rounded-full ${activeLink === 'Contact / Support' ? 'bg-sky-500' : 'bg-sky-100'}`} />
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-5 border-t border-sky-200 bg-sky-50/50">
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/portal');
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 px-5 py-4 text-base font-semibold uppercase tracking-wide text-white shadow-lg shadow-sky-300/40 transition hover:shadow-xl hover:scale-[1.02]"
                    >
                      <HiOutlineUserAdd className="h-5 w-5" />
                      <span>Portal / Login</span>
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

export const Header = memo(GuestHeaderComponent);
export default Header;







