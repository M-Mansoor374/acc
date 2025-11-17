import React, { memo } from 'react';
import PropTypes from 'prop-types';

const buttonBaseClasses =
  'inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-40';

const QuizControlsComponent = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  isLastQuestion,
}) => (
  <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <button
      type="button"
      onClick={onPrevious}
      disabled={!canGoPrevious}
      className={`${buttonBaseClasses} bg-slate-800 text-slate-200 hover:-translate-y-0.5 hover:bg-slate-700`}
    >
      Previous
    </button>
    <button
      type="button"
      onClick={onNext}
      disabled={!canGoNext}
      className={`${buttonBaseClasses} bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40`}
    >
      {isLastQuestion ? 'Finish' : 'Next'}
    </button>
  </div>
);

QuizControlsComponent.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  canGoPrevious: PropTypes.bool.isRequired,
  canGoNext: PropTypes.bool.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
};

export const QuizControls = memo(QuizControlsComponent);


