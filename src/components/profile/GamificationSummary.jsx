import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { HiLightningBolt, HiStar, HiFire, HiBadgeCheck } from 'react-icons/hi';

const progressVariants = {
  hidden: { width: 0 },
  visible: (width) => ({
    width,
    transition: { duration: 0.8, ease: 'easeOut' },
  }),
};

const GamificationSummaryComponent = ({ gamification }) => {
  const xpPercent = useMemo(() => {
    if (!gamification.nextLevelXp) {
      return 0;
    }
    return Math.min(100, Math.round((gamification.xp / gamification.nextLevelXp) * 100));
  }, [gamification.xp, gamification.nextLevelXp]);

  return (
    <motion.section
      className="flex flex-col gap-5 sm:gap-6 md:gap-7 rounded-2xl sm:rounded-3xl md:rounded-[32px] border border-slate-800 bg-gradient-to-br from-slate-900/95 via-slate-950 to-indigo-950/85 p-4 sm:p-6 md:p-8 lg:p-9 shadow-2xl shadow-slate-950/50"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 sm:px-4 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] sm:tracking-[0.35em] text-indigo-200">
            Progress Pulse
          </div>
          <h2 className="text-lg sm:text-xl md:text-[1.85rem] font-semibold text-white">
            Performance Snapshot
          </h2>
          <p className="max-w-xl text-xs sm:text-sm md:text-base text-indigo-100/80">
          Track your XP, streaks, and medal progress. Stay consistent to unlock exclusive
          Acceptopia perks.
        </p>
        </div>
      <div className="flex flex-wrap gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-2.5 sm:p-3 text-[10px] sm:text-[11px] text-indigo-100">
          <div className="flex min-w-[100px] sm:min-w-[120px] flex-1 flex-col gap-0.5 sm:gap-1 rounded-xl sm:rounded-2xl bg-slate-900/60 p-2 sm:p-3 text-center sm:text-left">
            <span className="font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70">Level</span>
            <span className="text-base sm:text-lg md:text-xl font-bold text-white">{gamification.level}</span>
          </div>
          <div className="flex min-w-[100px] sm:min-w-[120px] flex-1 flex-col gap-0.5 sm:gap-1 rounded-xl sm:rounded-2xl bg-slate-900/60 p-2 sm:p-3 text-center sm:text-left">
            <span className="font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70">XP</span>
            <span className="text-base sm:text-lg md:text-xl font-bold text-white">
              {gamification.xp.toLocaleString()}
            </span>
          </div>
        <div className="flex min-w-[100px] sm:min-w-[120px] flex-1 flex-col gap-0.5 sm:gap-1 rounded-xl sm:rounded-2xl bg-slate-900/60 p-2 sm:p-3 text-center sm:text-left">
          <span className="font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70">Streak</span>
            <span className="text-base sm:text-lg md:text-xl font-bold text-white">{gamification.streak} d</span>
          </div>
        </div>
      </div>

    <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
        <motion.div
          whileHover={{ y: -4 }}
          className="flex w-full min-w-0 flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-indigo-500/30 bg-indigo-500/10 p-4 sm:p-5 md:p-6 text-white shadow-lg shadow-indigo-900/30"
        >
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.18em] md:tracking-[0.28em] text-indigo-100">
              Total XP
            </span>
            <div className="flex justify-center sm:justify-end">
              <HiLightningBolt className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-100" />
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-2xl font-bold">
            {gamification.xp.toLocaleString()} <span className="text-[10px] sm:text-xs md:text-sm font-medium">XP</span>
          </p>
          <p className="break-words text-[10px] sm:text-xs md:text-sm leading-relaxed text-indigo-100/80">
            Level {gamification.level} • Next unlock at {gamification.nextLevelXp.toLocaleString()} XP
          </p>
          <div className="mt-2 h-1.5 sm:h-2 overflow-hidden rounded-full bg-indigo-500/20 sm:mt-4">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/30"
              variants={progressVariants}
              initial="hidden"
              animate="visible"
              custom={`${xpPercent}%`}
            />
          </div>
        </motion.div>

      <motion.div
        whileHover={{ y: -4 }}
        className="flex w-full min-w-0 flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-4 sm:p-5 md:p-6 text-emerald-50 shadow-lg shadow-emerald-900/30"
      >
        <div className="flex flex-col items-center gap-1.5 sm:gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.18em] md:tracking-[0.28em] text-emerald-100">
            Streak
          </span>
          <div className="flex justify-center sm:justify-end">
            <HiFire className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-100" />
          </div>
        </div>
        <p className="text-base sm:text-lg md:text-2xl font-bold">{gamification.streak} days</p>
        <p className="break-words text-[10px] sm:text-xs md:text-sm leading-relaxed text-emerald-100/80">
          Longest streak: {gamification.maxStreak} days
        </p>
        <div className="mt-2 break-words rounded-xl sm:rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-[11px] md:text-xs font-semibold uppercase tracking-wide text-emerald-100/90 sm:mt-4">
          Keep up the pace to activate Weekly Accelerator rewards.
        </div>
      </motion.div>
      </div>

      <div className="space-y-3 sm:space-y-4 rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2">
          <HiBadgeCheck className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-200" />
          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-indigo-100">
            Medals In Progress
          </h3>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {gamification.medals.map((medal) => {
            const percent = Math.min(100, Math.max(0, Math.round(medal.progress)));
            return (
              <motion.div
                key={medal.id}
                className="rounded-xl sm:rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 sm:p-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col gap-1.5 sm:gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-white">{medal.label}</p>
                    <p className="text-[10px] sm:text-xs text-slate-400">{medal.description}</p>
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-indigo-200">
                    {percent}% complete
                  </span>
                </div>
                <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 overflow-hidden rounded-full bg-slate-800/80">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/30"
                    variants={progressVariants}
                    initial="hidden"
                    animate="visible"
                    custom={`${percent}%`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

GamificationSummaryComponent.propTypes = {
  gamification: PropTypes.shape({
    xp: PropTypes.number.isRequired,
    nextLevelXp: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    streak: PropTypes.number.isRequired,
    maxStreak: PropTypes.number.isRequired,
    medals: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        progress: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export const GamificationSummary = memo(GamificationSummaryComponent);


