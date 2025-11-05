import React, { memo } from 'react';
import { motion } from 'framer-motion';

const ActivityItem = memo(({ icon, title, description, time, xp, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-xl shadow-sm p-4 flex items-center space-x-4 hover:shadow-md transition-shadow duration-200"
      aria-label={title}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600" aria-hidden="true">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
      {xp && (
        <div className="flex-shrink-0">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
            +{xp} XP
          </span>
        </div>
      )}
    </motion.div>
  );
});

ActivityItem.displayName = 'ActivityItem';

export default ActivityItem;