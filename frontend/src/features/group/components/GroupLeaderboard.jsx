import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HiBadgeCheck } from 'react-icons/hi';

const rankingBadges = ['Champion', 'First Runner', 'Second Runner', 'Rising'];

const badgeGradients = [
  'from-yellow-400 to-orange-500',
  'from-slate-300 to-slate-500',
  'from-amber-500 to-orange-500',
  'from-sky-400 to-indigo-500',
];

const GroupLeaderboard = ({ entries }) => {
  const maxXp = useMemo(() => {
    if (!entries.length) return 1;
    return Math.max(...entries.map((entry) => entry.xp));
  }, [entries]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 dark:from-slate-900/95 dark:via-purple-900/20 dark:to-slate-900/95 border-2 border-purple-200/40 dark:border-purple-500/30 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 shadow-xl shadow-purple-900/30 hover:shadow-2xl hover:shadow-purple-500/40 flex flex-col gap-3 sm:gap-4 transition-all h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="space-y-0.5 sm:space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/50">
              <HiBadgeCheck className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
            <p className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-purple-600 dark:text-purple-400 font-bold">
              Leaderboard
            </p>
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            Top Friends
          </h3>
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="text-2xl sm:text-3xl"
        >
          🏆
        </motion.div>
      </div>

      {/* Leaderboard Entries */}
      <div className="space-y-3 sm:space-y-4">
        {entries.map((entry, index) => {
          const widthPercent = `${Math.floor((entry.xp / maxXp) * 100)}%`;
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="space-y-1.5 sm:space-y-2"
            >
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <motion.span
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-gradient-to-r ${badgeGradients[index] || 'from-slate-400 to-slate-500'} text-white shadow-lg flex-shrink-0`}
                  >
                    #{index + 1}
                  </motion.span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base font-bold text-slate-900 dark:text-white truncate">
                      {entry.name}
                    </p>
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-slate-600 dark:text-slate-400 font-semibold">
                      {rankingBadges[index] || 'Contender'}
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-400/40 dark:border-indigo-500/30 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 flex-shrink-0">
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-indigo-700 dark:text-indigo-300 whitespace-nowrap">
                    {entry.xp.toLocaleString()} XP
                  </p>
                </div>
              </div>
              <div className="h-2 sm:h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: widthPercent }}
                  transition={{ duration: 1, delay: index * 0.15, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${badgeGradients[index] || 'from-slate-400 to-slate-500'} shadow-lg`}
                ></motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Message */}
      {entries.length === 0 && (
        <div className="text-center py-6 sm:py-8">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            No members yet. Invite friends to compete!
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default memo(GroupLeaderboard);


