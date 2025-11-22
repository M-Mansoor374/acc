import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const QuizProgressComponent = ({ current, total, xp }) => {
  const progressPercent = useMemo(() => {
    if (total === 0) {
      return 0;
    }
    return Math.round((current / total) * 100);
  }, [current, total]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span className="font-semibold uppercase tracking-wider text-slate-200">
          Question {current} of {total}
        </span>
        <span className="font-medium text-indigo-300">{xp} XP</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
        <motion.div
          key={progressPercent}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/30"
        />
      </div>
    </div>
  );
};

QuizProgressComponent.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  xp: PropTypes.number.isRequired,
};

export const QuizProgress = memo(QuizProgressComponent);


