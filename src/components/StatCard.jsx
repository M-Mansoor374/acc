import React from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiFire, HiBadgeCheck } from 'react-icons/hi';

const StatCard = ({ type, value, label, delay = 0 }) => {
  const icons = {
    xp: <HiStar className="w-8 h-8 text-green-600" />,
    streak: <HiFire className="w-8 h-8 text-yellow-500" />,
    medals: <HiBadgeCheck className="w-8 h-8 text-indigo-600" />,
  };

  const icon = icons[type] || icons.xp;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center space-y-3 transition-all duration-200"
    >
      <div className={`flex items-center justify-center w-16 h-16 rounded-full ${
        type === 'xp' ? 'bg-green-100' :
        type === 'streak' ? 'bg-yellow-100' :
        'bg-indigo-100'
      }`}>
        {icon}
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-600 mt-1">{label}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;