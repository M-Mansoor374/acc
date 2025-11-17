import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const medalPalette = {
  Platinum: 'from-slate-100 via-slate-300 to-slate-100 text-slate-900 shadow-slate-200/40',
  Gold: 'from-amber-200 via-amber-300 to-amber-100 text-amber-800 shadow-amber-300/40',
  Silver: 'from-slate-200 via-slate-300 to-slate-100 text-slate-700 shadow-slate-300/40',
  Bronze: 'from-orange-200 via-orange-300 to-orange-100 text-orange-800 shadow-orange-300/40',
};

const QuizSummaryComponent = ({ xp, medals, onReplay, onGoToDashboard }) => {
  const medalChips = useMemo(
    () =>
      medals.map((medal) => {
        const palette = medalPalette[medal] ?? 'from-slate-200 via-slate-300 to-slate-100 text-slate-800';
        return (
          <motion.span
            key={medal}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r ${palette} px-4 py-1 text-sm font-semibold shadow-lg`}
          >
            {medal}
          </motion.span>
        );
      }),
    [medals],
  );

  return (
    <div className="flex flex-col items-center gap-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl">
      <motion.h2
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white"
      >
        Quiz Complete!
      </motion.h2>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center gap-3 rounded-3xl border border-indigo-400/40 bg-indigo-500/10 px-8 py-6 text-center"
      >
        <span className="text-sm uppercase tracking-[.3em] text-indigo-300">Total XP</span>
        <span className="text-5xl font-black text-white">{xp}</span>
      </motion.div>
      <div className="flex flex-wrap items-center justify-center gap-2">{medalChips}</div>
      <div className="flex flex-col gap-3 md:flex-row">
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          Retry Quiz
        </button>
        <button
          type="button"
          onClick={onGoToDashboard}
          className="inline-flex items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

QuizSummaryComponent.propTypes = {
  xp: PropTypes.number.isRequired,
  medals: PropTypes.arrayOf(PropTypes.string).isRequired,
  onReplay: PropTypes.func.isRequired,
  onGoToDashboard: PropTypes.func.isRequired,
};

export const QuizSummary = memo(QuizSummaryComponent);


