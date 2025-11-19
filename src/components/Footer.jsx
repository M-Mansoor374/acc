import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoGithub
} from 'react-icons/io5';
import { SiDiscord } from 'react-icons/si';
import { HiStar } from 'react-icons/hi';

const Footer = memo(() => {
  const productLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Rewards', path: '/rewards' },
  ];

  const companyLinks = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' },
  ];

  const resourceLinks = [
    { name: 'Resources', path: '/resources' },
    { name: 'Help Center', path: '/help' },
    { name: 'Community', path: '/community' },
  ];

  const legalLinks = [
    { name: 'Privacy', path: '/privacy' },
    { name: 'Terms', path: '/terms' },
    { name: 'Security', path: '/security' },
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

  const handleSocialClick = useCallback((url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const renderLinkColumn = (title, links) => (
    <div className="flex flex-col">
      <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="text-sm text-gray-400 hover:text-gray-200 transition-all duration-200 hover:underline inline-block"
              aria-label={link.name}
            >
              {link.name}
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

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-10 sm:py-12 lg:py-14">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            {/* Brand Section - Left Side */}
            <div className="flex flex-col gap-4 text-center lg:text-left lg:flex-shrink-0 lg:w-80 xl:w-96">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    className="drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
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
                  className="text-2xl sm:text-3xl font-bold relative"
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

              <h3 className="text-lg sm:text-xl font-semibold text-white">
                Gamify Your Learning Journey
              </h3>

              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Transforming education through gamification, real-time progress tracking, and rewarding achievements. Join the future of learning today.
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSocialClick(social.url);
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 transition-all duration-300 hover:opacity-80 ${social.color}`}
                      aria-label={`Follow us on ${social.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Navigation Links - Right Side */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              <div className="text-center md:text-left">
                {renderLinkColumn('PRODUCT', productLinks)}
              </div>

              <div className="text-center md:text-left">
                {renderLinkColumn('COMPANY', companyLinks)}
              </div>

              <div className="text-center md:text-left">
                {renderLinkColumn('RESOURCES', resourceLinks)}
              </div>

              <div className="text-center md:text-left">
                {renderLinkColumn('LEGAL', legalLinks)}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 pt-6 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-sm text-gray-400">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Acceptopia. All rights reserved.
            </p>
            <p className="text-center sm:text-right">
              <span className="inline-flex items-center">
                Made with <span className="text-red-500 mx-1">❤️</span> for learners worldwide.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;

