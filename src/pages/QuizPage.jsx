import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  fetchQuizQuestions,
  goToNextQuestion,
  goToPreviousQuestion,
  resetQuiz,
  selectAnswer,
  selectCanNavigateNext,
  selectCurrentQuestion,
  selectQuestionProgress,
  selectQuizState,
  selectResponseByQuestionId,
} from '../store/quizSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { QuizProgress } from '../components/quiz/QuizProgress';
import { AnswerOption } from '../components/quiz/AnswerOption';
import { QuizControls } from '../components/quiz/QuizControls';
import { QuizSummary } from '../components/quiz/QuizSummary';
import Header from '../login/Header';
import Footer from '../components/Footer';

const quizContainerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

const QuizPageComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);

  const quizState = useAppSelector(selectQuizState);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const progress = useAppSelector(selectQuestionProgress);
  const canNavigateNext = useAppSelector(selectCanNavigateNext);

  const currentResponse = useAppSelector(
    useMemo(
      () => selectResponseByQuestionId(currentQuestion?.id ?? ''),
      [currentQuestion?.id],
    ),
  );

  useEffect(() => {
    if (quizState.status === 'idle') {
      dispatch(fetchQuizQuestions());
    }
  }, [dispatch, quizState.status]);

  useEffect(() => {
    setIsHintVisible(false);
  }, [currentQuestion?.id]);

  const answeredCount = useMemo(
    () => Object.keys(quizState.responses).length,
    [quizState.responses],
  );

  const correctCount = useMemo(
    () =>
      Object.values(quizState.responses).reduce(
        (total, response) => (response.isCorrect ? total + 1 : total),
        0,
      ),
    [quizState.responses],
  );

  const accuracy = useMemo(() => {
    if (answeredCount === 0) {
      return 0;
    }
    return Math.round((correctCount / answeredCount) * 100);
  }, [answeredCount, correctCount]);

  const remainingQuestions = useMemo(
    () => Math.max(progress.total - answeredCount, 0),
    [answeredCount, progress.total],
  );

  const upcomingTopics = useMemo(() => {
    if (!quizState.questions.length) {
      return [];
    }
    return quizState.questions
      .slice(progress.current, progress.current + 3)
      .map((question, index) => ({
        id: question.id,
        topic: question.topic,
        difficulty: question.difficulty,
        order: progress.current + index + 1,
      }));
  }, [progress.current, quizState.questions]);

  const summaryBreakdown = useMemo(
    () =>
      quizState.questions.map((question, index) => {
        const response = quizState.responses[question.id];
        return {
          id: question.id,
          order: index + 1,
          prompt: question.prompt,
          topic: question.topic,
          xpValue: question.xpValue,
          isCorrect: Boolean(response?.isCorrect),
        };
      }),
    [quizState.questions, quizState.responses],
  );

  const handleSelect = useCallback(
    (optionId) => {
      if (!currentQuestion) {
        return;
      }
      dispatch(
        selectAnswer({
          questionId: currentQuestion.id,
          optionId,
        }),
      );
    },
    [currentQuestion, dispatch],
  );

  const handleNext = useCallback(() => {
    if (progress.current === progress.total) {
      setIsSummaryVisible(true);
      return;
    }
    dispatch(goToNextQuestion());
  }, [dispatch, progress.current, progress.total]);

  const handlePrevious = useCallback(() => {
    if (progress.current === 1) {
      return;
    }
    dispatch(goToPreviousQuestion());
  }, [dispatch, progress.current]);

  const handleRetry = useCallback(() => {
    setIsSummaryVisible(false);
    dispatch(resetQuiz());
    dispatch(fetchQuizQuestions());
  }, [dispatch]);

  const handleGoToDashboard = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  const handleToggleHint = useCallback(() => {
    if (!currentQuestion?.hint) {
      return;
    }
    setIsHintVisible((prev) => !prev);
  }, [currentQuestion?.hint]);

  const isLastQuestion = useMemo(
    () => progress.current === progress.total,
    [progress.current, progress.total],
  );

  useEffect(() => {
    if (isSummaryVisible) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isSummaryVisible]);

  let mainContent;

  if (quizState.status === 'failed') {
    mainContent = (
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
        <div className="w-full max-w-lg rounded-3xl border border-rose-500/30 bg-rose-500/10 p-8 text-center text-rose-100 shadow-2xl shadow-rose-900/40 sm:p-10">
          <h1 className="mb-3 text-2xl font-bold sm:text-3xl">We hit a snag</h1>
          <p className="mb-6 text-sm text-rose-200/80">{quizState.error}</p>
          <button
            type="button"
            onClick={() => dispatch(fetchQuizQuestions())}
            className="inline-flex items-center justify-center rounded-xl border border-rose-500/50 bg-rose-500/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-rose-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Retry Loading Quiz
          </button>
        </div>
      </main>
    );
  } else if (isSummaryVisible) {
    mainContent = (
      <main className="flex flex-1 flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12">
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 sm:gap-10">
          <QuizSummary
            xp={quizState.totalXp}
            medals={quizState.medals}
            onReplay={handleRetry}
            onGoToDashboard={handleGoToDashboard}
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl shadow-indigo-950/40 sm:p-8"
          >
            <h2 className="text-lg font-semibold text-white sm:text-xl md:text-2xl">Question Breakdown</h2>
            <ul className="mt-5 space-y-3">
              {summaryBreakdown.map((entry) => (
                <li
                  key={entry.id}
                  className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold uppercase tracking-wide text-indigo-300">
                      Question {entry.order}
                    </span>
                    <p className="text-sm text-slate-200 md:text-base">{entry.prompt}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-300">
                        Topic: {entry.topic}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-300">
                        XP: {entry.xpValue}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center justify-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${
                      entry.isCorrect
                        ? 'bg-emerald-500/20 text-emerald-200'
                        : 'bg-rose-500/20 text-rose-200'
                    }`}
                  >
                    {entry.isCorrect ? 'Correct' : 'Needs Review'}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>
      </main>
    );
  } else if (quizState.status === 'loading' || !currentQuestion) {
    mainContent = (
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex w-full max-w-2xl flex-col gap-5 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 sm:p-10">
          <div className="h-5 w-44 animate-pulse rounded-full bg-slate-700/70" />
          <div className="h-3 w-64 animate-pulse rounded-full bg-slate-800/80" />
          <div className="h-32 w-full animate-pulse rounded-2xl bg-slate-800/70" />
          <div className="h-32 w-full animate-pulse rounded-2xl bg-slate-800/70" />
          <div className="h-10 w-48 animate-pulse rounded-full bg-slate-800/70" />
        </div>
      </main>
    );
  } else {
    const questionOptions = currentQuestion.options ?? [];
    const hasSelectedAnswer = Boolean(currentResponse);
    const hintAvailable = Boolean(currentQuestion.hint);

    mainContent = (
      <main className="flex flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-2xl shadow-indigo-950/40 sm:gap-8 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-3 text-left">
              <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-indigo-200">
                Acceptopia Quiz Lab
              </span>
              <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Master one concept at a time, earn XP, and track your mastery.
              </h1>
              <p className="text-sm text-slate-300 md:text-base">
                Carefully curated questions designed to mirror the upcoming production environment.
                Stay focused, leverage hints when needed, and keep your streak alive.
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center shadow-lg"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Answered
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {answeredCount}
                  <span className="text-sm text-slate-400"> / {progress.total}</span>
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center shadow-lg shadow-emerald-900/30"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">
                  Accuracy
                </p>
                <p className="mt-2 text-2xl font-bold text-white">{accuracy}%</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4 text-center shadow-lg shadow-indigo-900/30"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200">
                  Total XP
                </p>
                <p className="mt-2 text-2xl font-bold text-white">{quizState.totalXp}</p>
              </motion.div>
            </div>
          </div>
          <QuizProgress current={progress.current} total={progress.total} xp={quizState.totalXp} />
        </section>

        <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:gap-8">
          <AnimatePresence mode="wait">
            <motion.section
              key={currentQuestion.id}
              variants={quizContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex flex-col gap-5 rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:gap-6 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <span className="inline-flex items-center rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200">
                  Topic: {currentQuestion.topic}
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200">
                  Difficulty: {currentQuestion.difficulty}
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200">
                  Est. Time: {currentQuestion.estimatedTime}
                </span>
                <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-200">
                  +{currentQuestion.xpValue} XP
                </span>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="text-xl font-semibold text-white sm:text-2xl md:text-3xl"
              >
                {currentQuestion.prompt}
              </motion.h2>

              <div className="flex flex-col gap-3 sm:gap-4">
                {questionOptions.map((option) => (
                  <AnswerOption
                    key={option.id}
                    option={option}
                    isSelected={currentResponse?.optionId === option.id}
                    isRevealed={hasSelectedAnswer}
                    onSelect={() => handleSelect(option.id)}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-3 text-left md:flex-row md:items-center md:gap-3">
                  <button
                    type="button"
                    onClick={handleToggleHint}
                    className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                      hintAvailable
                        ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-200 hover:bg-indigo-500/20'
                        : 'cursor-not-allowed border-slate-700 bg-slate-800 text-slate-500'
                    }`}
                    disabled={!hintAvailable}
                  >
                    {hintAvailable ? (isHintVisible ? 'Hide Hint' : 'Reveal Hint') : 'Hint Unavailable'}
                  </button>
                  <span className="text-xs text-slate-400">
                    Reinforce understanding with curated hints and micro-strategies.
                  </span>
                </div>
                <QuizControls
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  canGoPrevious={progress.current > 1}
                  canGoNext={canNavigateNext}
                  isLastQuestion={isLastQuestion}
                />
              </div>

              <AnimatePresence>
                {isHintVisible && hintAvailable && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5 text-sm text-indigo-100 shadow-inner shadow-indigo-900/30"
                  >
                    <p className="font-semibold uppercase tracking-wide text-indigo-200">Instructor Hint</p>
                    <p className="mt-2 leading-relaxed">{currentQuestion.hint}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4 sm:p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                  Quick Checklist
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-slate-400">
                  <li>• Read the question twice and anchor on the primary objective.</li>
                  <li>• Evaluate each option for accuracy, clarity, and alignment with best practices.</li>
                  <li>• Use hints sparingly—build intuition for future production scenarios.</li>
                </ul>
              </div>
            </motion.section>
          </AnimatePresence>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/40 sm:p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Session Stats</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-slate-800/60 bg-slate-900/80 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Correct</p>
                  <p className="text-lg font-semibold text-white">{correctCount}</p>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-slate-900/80 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Remaining</p>
                  <p className="text-lg font-semibold text-white">{remainingQuestions}</p>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-slate-900/80 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Current Step</p>
                  <p className="text-lg font-semibold text-white">
                    {progress.current} / {progress.total}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-slate-900/80 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">XP Potential</p>
                  <p className="text-lg font-semibold text-white">
                    {quizState.totalXp + currentQuestion.xpValue}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/40 sm:p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Coming Up Next
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {upcomingTopics.length === 0 ? (
                  <li className="rounded-2xl border border-slate-800/60 bg-slate-900/80 p-4 text-center text-slate-400">
                    You are on the final question—finish strong!
                  </li>
                ) : (
                  upcomingTopics.map((topic) => (
                    <li
                      key={topic.id}
                      className="flex flex-col gap-1 rounded-2xl border border-slate-800/60 bg-slate-900/80 p-4"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-indigo-200">
                        Question {topic.order}
                      </span>
                      <span className="text-sm font-semibold text-white">{topic.topic}</span>
                      <span className="text-xs text-slate-400">Difficulty: {topic.difficulty}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/40 sm:p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Pro Tips from Acceptopia Coaches
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-400">
                <li>Anchor your answer in accessibility, performance, and scalability best practices.</li>
                <li>Leverage keyboard navigation to move quickly—no time lost between options.</li>
                <li>Reflect on incorrect responses immediately to lock in the correct rationale.</li>
              </ul>
            </div>
          </motion.aside>
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <Header />
      {mainContent}
      <Footer />
    </div>
  );
};

export const QuizPage = memo(QuizPageComponent);

