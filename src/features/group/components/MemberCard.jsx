import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { HiFire, HiSparkles, HiBadgeCheck } from 'react-icons/hi';

const progressPresets = [
  { label: 'Quiz Progress', accent: 'from-emerald-400 to-lime-500' },
  { label: 'Simulation Completion', accent: 'from-sky-500 to-indigo-500' },
];

const MemberCard = ({ member }) => {
  const xpPercent = Math.min(100, Math.round((member.xp / 5200) * 100));
  const progressEntries = [
    {
      ...progressPresets[0],
      value: member.quizProgress,
    },
    {
      ...progressPresets[1],
      value: member.simulationProgress,
    },
  ];

  return (
    <motion.div
      layout
      whileHover={{ y: -4, scale: 1.02 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20 dark:from-slate-900/95 dark:via-indigo-900/20 dark:to-slate-900/95 border-2 border-indigo-200/40 dark:border-indigo-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-xl shadow-indigo-900/20 hover:shadow-2xl hover:shadow-indigo-500/30 flex flex-col gap-3 sm:gap-4 h-full transition-all"
    >
      {/* Header with Avatar and XP Badge */}
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className={`h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${member.accent?.gradient || 'from-indigo-500 to-purple-600'} flex items-center justify-center text-white text-base sm:text-lg md:text-xl font-bold tracking-wide shadow-lg flex-shrink-0`}
          >
            {member.avatarInitials}
          </motion.div>
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-500 dark:text-indigo-400 font-bold">
              Friend
            </p>
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white truncate">
              {member.name}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 leading-snug truncate">
              {member.role}
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 dark:from-yellow-400/10 dark:to-orange-500/10 border-2 border-yellow-500/40 dark:border-yellow-400/30 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold text-yellow-700 dark:text-yellow-300 whitespace-nowrap flex-shrink-0">
          {member.xp.toLocaleString()} XP
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600 dark:text-indigo-400 font-bold">
          <span>XP Progress</span>
          <span>{xpPercent}%</span>
        </div>
        <div className="h-2 sm:h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpPercent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg"
          ></motion.div>
        </div>
      </div>

      {/* Streak and Medals */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-sm">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/5 dark:to-orange-500/5 rounded-lg sm:rounded-xl border-2 border-amber-400/30 dark:border-amber-500/20 p-2 sm:p-3 flex flex-col gap-0.5 sm:gap-1 shadow-md"
        >
          <p className="text-[9px] sm:text-[10px] text-amber-700 dark:text-amber-400 font-semibold uppercase tracking-wider">
            Streak
          </p>
          <p className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-1">
            <HiFire className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
            <span>{member.streak}</span>
            <span className="text-[10px] sm:text-xs font-normal text-slate-600 dark:text-slate-400">days</span>
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 dark:from-pink-500/5 dark:to-purple-500/5 rounded-lg sm:rounded-xl border-2 border-pink-400/30 dark:border-pink-500/20 p-2 sm:p-3 flex flex-col gap-0.5 sm:gap-1 shadow-md"
        >
          <p className="text-[9px] sm:text-[10px] text-pink-700 dark:text-pink-400 font-semibold uppercase tracking-wider">
            Medals
          </p>
          <p className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-1">
            <HiSparkles className="w-3 h-3 sm:w-4 sm:h-4 text-pink-500" />
            {member.medals}
          </p>
        </motion.div>
      </div>

      {/* Badges */}
      {member.badges && member.badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {member.badges.map((badge) => (
            <motion.span
              key={`${member.id}-${badge}`}
              whileHover={{ scale: 1.1 }}
              className="text-[9px] sm:text-[10px] font-bold bg-gradient-to-r from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-400/40 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-sm"
            >
              {badge}
            </motion.span>
          ))}
        </div>
      )}

      {/* Progress Indicators */}
      <div className="space-y-2 sm:space-y-3">
        {progressEntries.map((progress) => (
          <div key={progress.label}>
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-600 dark:text-slate-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-semibold mb-1">
              <span className="truncate">{progress.label}</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{progress.value}%</span>
            </div>
            <div className="h-1.5 sm:h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress.value}%` }}
                transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                className={`h-full rounded-full bg-gradient-to-r ${progress.accent} shadow-md`}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Focus Areas */}
      {member.focusAreas && member.focusAreas.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] pt-2 border-t border-indigo-200/40 dark:border-indigo-500/20">
          {member.focusAreas.map((area) => (
            <span
              key={`${member.id}-${area}`}
              className="px-2 py-0.5 sm:py-1 bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 rounded-full font-medium"
            >
              {area}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default memo(MemberCard);

