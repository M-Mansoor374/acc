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
    { name: 'Features', path: '/' },
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
    <div className="flex flex-col space-y-3">
      <h3 className="text-sm font-bold text-white mb-2 pb-2 border-b border-blue-500/30">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
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
      className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden"
      aria-label="Footer"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section - Left */}
            <div className="lg:col-span-2 flex flex-col space-y-4">
              {/* Logo and Brand Name */}
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <HiStar className="w-7 h-7 text-white" />
                  </div>
                </motion.div>
                <Link 
                  to="/" 
                  className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-300 hover:to-purple-400 transition-all duration-300"
                  aria-label="Acceptopia Home"
                >
                  Acceptopia
                </Link>
              </div>

              {/* Tagline */}
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Gamify Your Learning Journey
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-md">
                Transforming education through gamification, real-time progress tracking, and rewarding achievements. Join the future of learning today.
              </p>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3 pt-2">
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
                      className={`w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color}`}
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

            {/* Navigation Links - Right (4 columns) */}
            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {renderLinkColumn('PRODUCT', productLinks)}
              {renderLinkColumn('COMPANY', companyLinks)}
              {renderLinkColumn('RESOURCES', resourceLinks)}
              {renderLinkColumn('LEGAL', legalLinks)}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-700/50 pt-6 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Acceptopia. All rights reserved.{' '}
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

