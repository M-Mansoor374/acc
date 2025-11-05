import React, { memo } from 'react';
import { motion } from 'framer-motion';

const StatCard = memo(({ icon, value, label, progress, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 cursor-default"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{icon}</div>
          <div>
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
          </div>
        </div>
      </div>
      
      {progress !== undefined && (
        <div className="mt-4">
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: delay + 0.3, duration: 1, ease: 'easeOut' }}
              className="h-full bg-blue-600 rounded-full relative overflow-hidden"
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
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </motion.div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Progress: {progress}%</p>
        </div>
      )}
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

export default StatCard;

