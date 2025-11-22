import React, { memo } from 'react';
import { motion } from 'framer-motion';

const ActivityItem = memo(({ icon, title, description, time, xp, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 hover:shadow-lg transition-all duration-200 border border-gray-200/50 hover:border-blue-300"
      aria-label={title}
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 w-full sm:w-auto">
        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md" aria-hidden="true">
          <div className="w-5 h-5 sm:w-6 sm:h-6">
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{title}</p>
          <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">{description}</p>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">{time}</p>
        </div>
      </div>
      {xp && (
        <div className="flex-shrink-0 ml-auto sm:ml-0">
          <span className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md">
            +{xp} XP
          </span>
        </div>
      )}
    </motion.div>
  );
});

ActivityItem.displayName = 'ActivityItem';

export default ActivityItem;