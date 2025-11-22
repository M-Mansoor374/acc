import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoGithub
} from 'react-icons/io5';
import { SiDiscord } from 'react-icons/si';
import { HiStar, HiArrowUp, HiMail } from 'react-icons/hi';

const Footer = memo(() => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
  };
  const productLinks = [
    { name: 'Features', path: '/#features' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Rewards', path: '/resources' },
  ];

  const companyLinks = [
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#support' },
    { name: 'Blog', path: '/resources' },
  ];

  const resourceLinks = [
    { name: 'Resources', path: '/resources' },
    { name: 'Help Center', path: '/portal' },
    { name: 'Community', path: '/simulation' },
  ];

  const legalLinks = [
    { name: 'Privacy', path: '/legal/privacy' },
    { name: 'Terms', path: '/legal/terms' },
    { name: 'Security', path: '/legal/security' },
  ];

  const socialLinks = [
    { 
      name: 'Twitter', 
      icon: IoLogoTwitter, 
      url: 'https://twitter.com',
      color: 'hover:text-blue-400 hover:border-blue-400'
    },
    { 
      name: 'GitHub', 
      icon: IoLogoGithub, 
      url: 'https://github.com',
      color: 'hover:text-gray-300 hover:border-gray-300'
    },
    { 
      name: 'LinkedIn', 
      icon: IoLogoLinkedin, 
      url: 'https://linkedin.com',
      color: 'hover:text-blue-400 hover:border-blue-400'
    },
    { 
      name: 'Discord', 
      icon: SiDiscord, 
      url: 'https://discord.com',
      color: 'hover:text-indigo-400 hover:border-indigo-400'
    },
  ];

  const renderLinkColumn = (title, links) => (
    <div className="flex flex-col">
      <h3 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4 uppercase tracking-wider">
        {title}
      </h3>
      <ul className="flex flex-col gap-2 sm:gap-3">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-1 group"
              aria-label={link.name}
            >
              <span className="relative">
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-400 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer 
      className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden"
      aria-label="Footer"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8 relative z-10">
        <div className="py-8 sm:py-10 md:py-12 lg:py-14">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-12 xl:gap-16">
            {/* Brand Section - Left Side */}
            <div className="flex flex-col gap-3 sm:gap-4 text-center lg:text-left lg:flex-shrink-0 lg:w-80 xl:w-96">
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    className="sm:w-12 sm:h-12 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                  >
                    {/* Hexagon */}
                    <polygon
                      points="24,4 38,12 38,28 24,36 10,28 10,12"
                      fill="none"
                      stroke="rgb(56,189,248)"
                      strokeWidth="2"
                      className="drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]"
                    />
                    {/* Circle inside */}
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
                  className="text-xl sm:text-2xl md:text-3xl font-bold relative"
                  aria-label="Acceptopia Home"
                >
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">
                    Acceptopia
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent blur-sm opacity-50 -z-10">
                    Acceptopia
                  </span>
                </Link>
              </div>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white px-2 sm:px-0">
                Gamify Your Learning Journey
              </h3>

              <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed px-2 sm:px-0">
                Transforming education through gamification, real-time progress tracking, and rewarding achievements. Join the future of learning today.
              </p>

              {/* Newsletter Subscription */}
              <div className="mt-2">
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 px-2 sm:px-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-sm"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-lg font-semibold text-sm hover:from-sky-600 hover:to-indigo-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
                  >
                    <HiMail className="w-4 h-4" />
                    {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
                  </motion.button>
                </form>
                {isSubscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-emerald-400 mt-2 px-2 sm:px-0"
                  >
                    Thanks for subscribing! Check your email for confirmation.
                  </motion.p>
                )}
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 pt-1 sm:pt-2">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/50 ${social.color}`}
                      aria-label={`Follow us on ${social.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Navigation Links - Right Side */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-6 md:gap-6 lg:gap-8">
              <div className="text-center sm:text-center md:text-left">
                {renderLinkColumn('PRODUCT', productLinks)}
              </div>

              <div className="text-center sm:text-center md:text-left">
                {renderLinkColumn('COMPANY', companyLinks)}
              </div>

              <div className="text-center sm:text-center md:text-left">
                {renderLinkColumn('RESOURCES', resourceLinks)}
              </div>

              <div className="text-center sm:text-center md:text-left">
                {renderLinkColumn('LEGAL', legalLinks)}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 pt-4 sm:pt-5 md:pt-6 pb-4 sm:pb-6 md:pb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <div className="text-center sm:text-left">
              <p className="mb-2">
                © {new Date().getFullYear()} Acceptopia. All rights reserved.
              </p>
              <div className="flex items-center gap-4 justify-center sm:justify-start text-xs">
                <span className="flex items-center gap-1">
                  <HiStar className="text-amber-400" /> Trusted by 10,000+ students
                </span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="mb-2">
                <span className="inline-flex items-center">
                  Made with <span className="text-red-500 mx-1">❤️</span> for learners worldwide
                </span>
              </p>
              <p className="text-xs text-gray-500">
                Empowering the next generation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full shadow-lg shadow-sky-500/50 hover:shadow-xl hover:shadow-sky-500/70 transition-all duration-300 group"
            aria-label="Back to top"
          >
            <HiArrowUp className="w-5 h-5 group-hover:animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;

