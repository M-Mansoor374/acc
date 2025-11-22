import React, { memo } from 'react';
import { motion } from 'framer-motion';

const StatCard = memo(({ icon, value, label, progress, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 transition-all duration-300 cursor-default border border-gray-200/50 backdrop-blur-sm hover:shadow-2xl"
    > 
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0">{icon}</div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wide">{label}</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-0.5 sm:mt-1">{value}</p>
          </div>
        </div>
      </div>
      
      {progress !== undefined && (
        <div className="mt-4 sm:mt-5">
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: delay + 0.3, duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full relative overflow-hidden shadow-sm"
            >
              <motion.div
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
          <p className="text-[10px] sm:text-xs font-semibold text-gray-600 mt-2 sm:mt-2.5">Progress: {progress}%</p>
        </div>
      )}
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

export default StatCard;

