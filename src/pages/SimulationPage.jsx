import React, { memo, useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineLightningBolt,
  HiOutlineSparkles,
  HiOutlineRefresh,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineChartPie,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { IoTrophyOutline, IoRibbonOutline } from 'react-icons/io5';

const simulations = [
  {
    id: 1,
    title: 'Mindful Decision Challenge',
    description: 'Make thoughtful choices under pressure and master calm decision-making.',
    difficulty: 'Medium',
    xpReward: 150,
    steps: [
      {
        question: 'You’re faced with a tough choice — what do you do?',
        options: ['Pause and think', 'React immediately'],
        correct: 0,
        feedback: [
          'You anchor yourself, evaluate the data, and move with clarity.',
          'Acting impulsively causes misalignment across the team.',
        ],
        delta: [60, 20],
      },
      {
        question: 'How do you handle feedback?',
        options: ['Ignore it', 'Learn from it'],
        correct: 1,
        feedback: [
          'Feedback dismissed. Growth stalls and XP gain drops.',
          'You iterate with insight, unlocking a momentum streak.',
        ],
        delta: [20, 80],
      },
    ],
  },
  {
    id: 2,
    title: 'Creative Sprint Simulation',
    description: 'Navigate a 48-hour sprint to craft an engaging product concept.',
    difficulty: 'Hard',
    xpReward: 240,
    steps: [
      {
        question: 'Kickoff begins. Where do you focus first?',
        options: ['Define the challenge statement', 'Jump straight into design artifacts'],
        correct: 0,
        feedback: [
          'You set the wrong tone, leaving teammates uncertain.',
          'Clear problem framing fuels a focused creative burst.',
        ],
        delta: [40, 80],
      },
      {
        question: 'Mid-sprint feedback arrives—how do you adapt?',
        options: ['Double down on the original plan', 'Run a quick alignment check-in'],
        correct: 1,
        feedback: [
          'Ignoring feedback costs valuable insight and momentum.',
          'Alignment multiplies synergy; your team syncs and iterates fast.',
        ],
        delta: [35, 90],
      },
      {
        question: 'Pitch prep time: what’s your priority?',
        options: ['Polish visuals endlessly', 'Craft a resonant narrative'],
        correct: 1,
        feedback: [
          'Great visuals, but the story lacks connection — judges are confused.',
          'Narrative clarity wins hearts and unlocks bonus XP.',
        ],
        delta: [45, 110],
      },
    ],
  },
  {
    id: 3,
    title: 'Empathy Feedback Loop',
    description: 'Practice delivering and receiving feedback in a collaborative setting.',
    difficulty: 'Easy',
    xpReward: 120,
    steps: [
      {
        question: 'Teammate shares a vulnerable insight — how do you respond?',
        options: ['Offer empathetic validation', 'Change the subject quickly'],
        correct: 0,
        feedback: [
          'You build trust and create space for honest collaboration.',
          'The conversation shuts down; trust dissolves.',
        ],
        delta: [70, 25],
      },
      {
        question: 'You receive constructive criticism. What next?',
        options: ['Log it for action items', 'Defend your decisions'],
        correct: 0,
        feedback: [
          'You transform critique into momentum. Growth unlocked.',
          'Defensiveness blocks learning; XP remains low.',
        ],
        delta: [60, 30],
      },
    ],
  },
];

const leaderboard = [
  { id: 'lb-01', name: 'NovaByte', xp: 4820, badge: 'Aurora Tier' },
  { id: 'lb-02', name: 'EchoBloom', xp: 4560, badge: 'Lumen Tier' },
  { id: 'lb-03', name: 'AtlasCraft', xp: 4370, badge: 'Nebula Tier' },
];

const badges = [
  {
    id: 'badge-beginner',
    name: 'Momentum Explorer',
    requirement: 'Complete 1 simulation',
    gradient: 'from-sky-400 via-indigo-400 to-purple-400',
  },
  {
    id: 'badge-pro',
    name: 'Decision Virtuoso',
    requirement: 'Score 400+ XP in total',
    gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
  },
  {
    id: 'badge-master',
    name: 'Simulation Sage',
    requirement: 'Finish all hard simulations',
    gradient: 'from-amber-400 via-orange-400 to-rose-400',
  },
];

const baseCardClasses =
  'rounded-3xl border border-slate-100 bg-white/90 shadow-lg shadow-sky-100/60 backdrop-blur transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-200/40 focus-within:-translate-y-1 focus-within:shadow-2xl focus-within:shadow-sky-200/40';

const SimulationPageComponent = () => {
  const [activeSimulationId, setActiveSimulationId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [results, setResults] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const activeSimulation = useMemo(
    () => simulations.find((simulation) => simulation.id === activeSimulationId) ?? null,
    [activeSimulationId],
  );

  const progressPercent = useMemo(() => {
    if (!activeSimulation) {
      return 0;
    }
    return Math.round((currentStep / activeSimulation.steps.length) * 100);
  }, [activeSimulation, currentStep]);

  const startSimulation = useCallback((simulationId) => {
    setActiveSimulationId(simulationId);
    setCurrentStep(0);
    setXpEarned(0);
    setResults([]);
    setIsComplete(false);
  }, []);

  const handleChoice = useCallback(
    (choiceIndex) => {
      if (!activeSimulation || isComplete) {
        return;
      }
      const step = activeSimulation.steps[currentStep];
      const isCorrect = step.correct === choiceIndex;
      const xpDelta = step.delta?.[choiceIndex] ?? (isCorrect ? 60 : 25);
      const newXpTotal = xpEarned + xpDelta;
      const stepFeedback = step.feedback?.[choiceIndex] ?? (isCorrect ? 'Excellent decision!' : 'Let’s iterate on that move.');

      setResults((prev) => [
        ...prev,
        {
          stepIndex: currentStep,
          question: step.question,
          chosen: step.options[choiceIndex],
          isCorrect,
          feedback: stepFeedback,
          xpGained: xpDelta,
        },
      ]);

      const nextStepIndex = currentStep + 1;
      const complete = nextStepIndex >= activeSimulation.steps.length;
      setCurrentStep(nextStepIndex);
      setXpEarned(newXpTotal);
      setIsComplete(complete);
    },
    [activeSimulation, currentStep, isComplete, xpEarned],
  );

  const handleRetry = useCallback(() => {
    if (!activeSimulation) {
      return;
    }
    setCurrentStep(0);
    setXpEarned(0);
    setResults([]);
    setIsComplete(false);
  }, [activeSimulation]);

  const handleBackToSelection = useCallback(() => {
    setActiveSimulationId(null);
    setCurrentStep(0);
    setXpEarned(0);
    setResults([]);
    setIsComplete(false);
  }, []);

  return (
    <div className="flex min-h-screen flex-col gap-16 bg-gradient-to-br from-white via-slate-50 to-sky-50 px-4 py-16 text-slate-900 sm:px-10 lg:px-16">
      {/* Hero Section */}
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Simulation Arena
        </motion.span>
        <motion.h1
          className="text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
        >
          Step into immersive scenarios and power up your skills
        </motion.h1>
        <motion.p
          className="max-w-3xl text-base leading-relaxed text-slate-500 sm:text-lg"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          Choose a simulation, make pivotal decisions, and earn XP while practicing the soft skills that define high-impact
          collaborators.
        </motion.p>
      </section>

      <div className="grid gap-12 xl:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-12">
          {/* Simulation Selection */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Choose your simulation</h2>
                <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
                  Each challenge amplifies a different dimension of your creative and collaborative flow.
                </p>
              </div>
              {activeSimulation && (
                <button
                  type="button"
                  onClick={handleBackToSelection}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 shadow-sm shadow-sky-100 transition hover:border-sky-300 hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  Return to list
                </button>
              )}
            </div>
            <motion.div
              layout
              className="grid gap-6 md:grid-cols-2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 }}
            >
              {simulations.map((simulation) => {
                const isActive = activeSimulationId === simulation.id;
                return (
                  <motion.article
                    key={simulation.id}
                    layout
                    className={`${baseCardClasses} p-6 ${isActive ? 'border-sky-200 shadow-sky-200/70' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">
                        <HiOutlineLightningBolt className="h-4 w-4" />
                        Sim #{simulation.id}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                        {simulation.difficulty}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-col gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">{simulation.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-500">{simulation.description}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
                        <IoTrophyOutline className="h-4 w-4" />
                        {simulation.xpReward} XP Bonus
                      </span>
                      <button
                        type="button"
                        onClick={() => startSimulation(simulation.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-md shadow-indigo-400/40 transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                      >
                        Start Simulation
                        <HiOutlineArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </section>

          {/* Active Simulation View */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Simulation Console</h2>
                <p className="text-sm text-slate-500 sm:text-base">
                  Track progress, respond to prompts, and watch your XP climb.
                </p>
              </div>
              {activeSimulation && (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">
                  <HiOutlineChartPie className="h-4 w-4" />
                  Step {Math.min(currentStep + 1, activeSimulation.steps.length)} of {activeSimulation.steps.length}
                </span>
              )}
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-[1px] shadow-2xl shadow-slate-900/40">
              <div className="relative flex flex-col gap-8 rounded-[28px] bg-slate-900/95 p-8 sm:p-12">
                <div className="absolute -top-36 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 opacity-30 blur-3xl" />
                <div className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-25 blur-[110px]" />

                <div className="relative flex flex-col gap-4 text-white">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold sm:text-xl">
                      {activeSimulation ? activeSimulation.title : 'Pick a simulation to begin'}
                    </h3>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                      <HiOutlineSparkles className="h-4 w-4" />
                      XP Total {xpEarned}
                    </span>
                  </div>

                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>

                  {!activeSimulation && (
                    <p className="text-sm text-slate-300">
                      Select a simulation from the deck above to enter a guided scenario and earn experience.
                    </p>
                  )}

                  {activeSimulation && !isComplete && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="flex flex-col gap-6"
                      >
                        <div className="flex flex-col gap-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
                            Scenario Prompt
                          </p>
                          <h4 className="text-lg font-semibold leading-snug text-white sm:text-xl">
                            {activeSimulation.steps[currentStep].question}
                          </h4>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {activeSimulation.steps[currentStep].options.map((option, index) => (
                            <motion.button
                              key={option}
                              type="button"
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleChoice(index)}
                              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-left text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                            >
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/40 text-xs uppercase tracking-[0.3em] text-white/80">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span>{option}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {activeSimulation && isComplete && (
                    <AnimatePresence>
                      <motion.div
                        key="simulation-complete"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-lg shadow-slate-900/40"
                      >
                        <div className="flex flex-col items-center gap-2 text-center">
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-400/40">
                            <IoRibbonOutline className="h-6 w-6" aria-hidden="true" />
                          </span>
                          <h4 className="text-xl font-semibold text-white sm:text-2xl">Simulation Complete</h4>
                          <p className="text-sm text-slate-200 sm:text-base">
                            You collected <span className="font-semibold text-white">{xpEarned} XP</span> out of{' '}
                            {activeSimulation.xpReward} possible rewards.
                          </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {results.map((result) => (
                            <div
                              key={result.stepIndex}
                              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/10 p-4 text-slate-200"
                            >
                              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                                Step {result.stepIndex + 1}
                              </span>
                              <p className="text-sm font-semibold text-white">{result.question}</p>
                              <p className="text-sm text-slate-100">
                                You chose: <span className="font-semibold text-white">{result.chosen}</span>
                              </p>
                              <p className="text-xs text-slate-300">{result.feedback}</p>
                              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                                +{result.xpGained} XP
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={handleRetry}
                            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                          >
                            <HiOutlineRefresh className="h-4 w-4" />
                            Retry simulation
                          </button>
                          <button
                            type="button"
                            onClick={handleBackToSelection}
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-md shadow-indigo-400/40 transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          >
                            Try another
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Gamification Sidebar */}
        <aside className="flex flex-col gap-10">
          <section className={`${baseCardClasses} flex flex-col gap-5 p-6`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Leaderboard Pulse</h3>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                <HiOutlineShieldCheck className="h-4 w-4" />
                Weekly
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {leaderboard.map((entry, index) => (
                <motion.article
                  key={entry.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-sky-100 bg-white/80 px-4 py-3 shadow-sm shadow-sky-100/60"
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 text-sm font-bold text-white shadow-md shadow-indigo-300/40">
                      #{index + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900">{entry.name}</span>
                      <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">{entry.badge}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">XP {entry.xp}</span>
                </motion.article>
              ))}
            </div>
          </section>

          <section className={`${baseCardClasses} flex flex-col gap-5 p-6`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Badge Preview</h3>
              <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-600">
                <HiOutlineUserGroup className="h-4 w-4" />
                Squad Goals
              </span>
            </div>
            <div className="grid gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-sky-100 bg-white/80 px-4 py-3 shadow-sm shadow-sky-100/60"
                >
                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${badge.gradient} text-white shadow-md shadow-sky-100/70`}>
                    <IoRibbonOutline className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">{badge.name}</span>
                    <span className="text-xs text-slate-500">{badge.requirement}</span>
                  </div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-xs font-semibold text-slate-500">
                    Soon
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className={`${baseCardClasses} flex flex-col gap-4 p-6`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Your Session Snapshot</h3>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
                <IoRibbonOutline className="h-4 w-4" />
                {xpEarned} XP
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Track XP earned during this session. Complete more simulations to unlock badge tiers and climb the leaderboard.
            </p>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
                initial={{ width: '10%' }}
                animate={{ width: `${Math.min(100, Math.max(10, (xpEarned / 400) * 100))}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                <HiOutlineShieldCheck className="h-4 w-4" />
                Consistency Boost
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                <HiOutlineSparkles className="h-4 w-4" />
                Bonus unlocked at 400 XP
              </span>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export const SimulationPage = memo(SimulationPageComponent);







