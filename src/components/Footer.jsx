import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoInstagram
} from 'react-icons/io5';

const Footer = memo(() => {
  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Resources', path: '/resources' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: IoLogoFacebook, 
      url: 'https://facebook.com' 
    },
    { 
      name: 'LinkedIn', 
      icon: IoLogoLinkedin, 
      url: 'https://linkedin.com' 
    },
    { 
      name: 'Twitter', 
      icon: IoLogoTwitter, 
      url: 'https://twitter.com' 
    },
    { 
      name: 'Instagram', 
      icon: IoLogoInstagram, 
      url: 'https://instagram.com' 
    },
  ];

  const handleSocialClick = useCallback((url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <footer 
      className="w-full bg-white border-t border-gray-200 shadow-md py-6 sm:py-8 px-4 sm:px-6"
      aria-label="Footer"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-start lg:gap-12">
          {/* Brand Section */}
          <div className="flex flex-col space-y-3 text-center sm:text-left w-full lg:w-auto">
            <Link 
              to="/" 
              className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200"
              aria-label="Acceptopia Home"
            >
              Acceptopia
            </Link>
            <p className="text-xs sm:text-sm text-gray-800 font-medium max-w-xs mx-auto sm:mx-0">
              Empowering learners through gamified education.
            </p>
          </div>

          {/* Navigation Links Section */}
          <nav 
            className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 w-full lg:w-auto"
            aria-label="Footer Navigation"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs sm:text-sm text-gray-800 hover:text-yellow-400 transition-colors duration-200 font-medium text-center sm:text-left whitespace-nowrap"
                aria-label={link.name}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Media Section */}
          <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full lg:w-auto">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSocialClick(social.url);
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-800 hover:text-yellow-400 transition-colors duration-200 rounded-full active:scale-95"
                  aria-label={`Follow us on ${social.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;

