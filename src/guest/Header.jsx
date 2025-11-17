import React, { memo, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenu, HiOutlineUserAdd, HiX } from 'react-icons/hi';

const guestNavLinks = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'features', label: 'Features / Explore', path: '/#features' },
  { id: 'resources', label: 'Resources', path: '/#resources' },
  { id: 'about', label: 'About', path: '/#about' },
  { id: 'support', label: 'Contact / Support', path: '/#support' },
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

  const getActiveLink = () => {
    const { pathname, hash } = location;
    if (pathname === '/' && (!hash || hash === '#home')) {
      return 'Home';
    }
    if (pathname === '/features' || hash === '#features') return 'Features / Explore';
    if (hash === '#resources') return 'Resources';
    if (hash === '#about') return 'About';
    if (hash === '#support') return 'Contact / Support';
    if (pathname === '/portal') return 'Login';
    if (pathname === '/signup') return 'Sign Up';
    return '';
  };

  const activeLink = getActiveLink();

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
              to="/"
              className="text-2xl font-bold text-sky-700 transition-colors duration-200 hover:text-sky-500 md:text-3xl"
              aria-label="Acceptopia Home"
            >
              Acceptopia
            </Link>
          </motion.div>

          <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
            {guestNavLinks.map((link) => (
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
                  <span className="flex items-center gap-2">{link.label}</span>
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
            ))}
          </div>

          <div className="hidden flex-none items-center pl-4 md:flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/portal')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-sky-300/40 transition-transform duration-200 hover:scale-[1.04] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-white"
            >
              <HiOutlineUserAdd className="h-5 w-5" />
              Portal
            </motion.button>
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
              key="guest-mobile-nav"
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
                  <Link to="/" className="text-lg font-semibold text-sky-700" onClick={handleLinkClick}>
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
                    {guestNavLinks.map((link, index) => (
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

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      handleLinkClick();
                      navigate('/portal');
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-sky-300/40 transition hover:shadow-xl"
                  >
                    <HiOutlineUserAdd className="h-5 w-5" />
                    Portal
                  </motion.button>
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






