import React, { memo } from 'react';
import { motion } from 'framer-motion';
import StatCard from './StatCard';

const DashboardStats = memo(() => {
  // Placeholder values as specified
  const stats = {
    xp: {
      value: 1200,
      current: 1200,
      max: 2000, // Next level threshold
      progress: 60, // (1200 / 2000) * 100
    },
    streak: {
      value: 7,
      label: 'days',
    },
    medals: {
      value: 3,
    },
  };

  const xpProgress = Math.min((stats.xp.current / stats.xp.max) * 100, 100);

  return (
    <section className="w-full">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <span className="text-white text-lg">📊</span>
        </div>
        <span>Your Progress Overview</span>
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* XP Points Card */}
        <StatCard
          icon={
            <span className="text-3xl" role="img" aria-label="XP Points">
              ⭐
            </span>
          }
          value={stats.xp.value.toLocaleString()}
          label="XP Points"
          progress={xpProgress}
          delay={0.1}
        />

        {/* Daily Streaks Card */}
        <StatCard
          icon={
            <span className="text-3xl" role="img" aria-label="Daily Streak">
              🔥
            </span>
          }
          value={`${stats.streak.value} ${stats.streak.label}`}
          label="Daily Streak"
          delay={0.2}
        />

        {/* Medals Card */}
        <StatCard
          icon={
            <span className="text-3xl" role="img" aria-label="Medals">
              🏅
            </span>
          }
          value={stats.medals.value}
          label="Medals Earned"
          delay={0.3}
        />
      </div>
    </section>
  );
});

DashboardStats.displayName = 'DashboardStats';

export default DashboardStats;

