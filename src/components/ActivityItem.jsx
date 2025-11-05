import React, { memo } from 'react';
import { motion } from 'framer-motion';

const ActivityItem = memo(({ icon, title, description, time, xp, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl p-4 flex items-center space-x-4 hover:shadow-lg transition-all duration-200 border border-gray-200/50 hover:border-blue-300"
      aria-label={title}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md" aria-hidden="true">
        <div className="w-6 h-6">
          {icon}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-600 mt-0.5">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
      {xp && (
        <div className="flex-shrink-0">
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md">
            +{xp} XP
          </span>
        </div>
      )}
    </motion.div>
  );
});

ActivityItem.displayName = 'ActivityItem';

export default ActivityItem;