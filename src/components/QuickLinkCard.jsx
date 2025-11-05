import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';

const QuickLinkCard = memo(({ icon, title, description, delay = 0, onClick }) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-xl group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${title}: ${description}`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
});

QuickLinkCard.displayName = 'QuickLinkCard';

export default QuickLinkCard;