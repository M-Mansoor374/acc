import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const AnswerOptionComponent = ({ option, isSelected, isRevealed, onSelect }) => {
  const variant = useMemo(() => {
    if (!isRevealed) {
      return 'default';
    }
    if (option.isCorrect) {
      return 'correct';
    }
    if (isSelected) {
      return 'incorrect';
    }
    return 'default';
  }, [isRevealed, option.isCorrect, isSelected]);

  const optionClasses = useMemo(() => {
    const baseClasses =
      'relative flex w-full items-center gap-3 rounded-xl border px-5 py-4 text-left text-base font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900';

    if (variant === 'correct') {
      return `${baseClasses} border-emerald-400/70 bg-emerald-500/20 text-emerald-200 shadow-lg shadow-emerald-500/30`;
    }

    if (variant === 'incorrect') {
      return `${baseClasses} border-rose-400/70 bg-rose-500/20 text-rose-200 shadow-lg shadow-rose-500/30`;
    }

    return `${baseClasses} border-slate-700 bg-slate-800/60 text-slate-200 shadow-lg shadow-slate-900/60 hover:border-indigo-400 hover:bg-slate-800/80`;
  }, [variant]);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={optionClasses}
      whileHover={{ scale: isRevealed ? 1 : 1.01 }}
      whileTap={{ scale: isRevealed ? 1 : 0.99 }}
      layout
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-100">
        {option.label}
      </span>
      <span className="flex-1 text-slate-100">{option.value}</span>
      {variant === 'correct' && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200"
        >
          Correct
        </motion.span>
      )}
      {variant === 'incorrect' && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-full bg-rose-400/20 px-3 py-1 text-xs font-semibold text-rose-200"
        >
          Try Again
        </motion.span>
      )}
    </motion.button>
  );
};

AnswerOptionComponent.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool,
  isRevealed: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

AnswerOptionComponent.defaultProps = {
  isSelected: false,
  isRevealed: false,
};

export const AnswerOption = memo(AnswerOptionComponent);


