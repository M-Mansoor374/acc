import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import Header from '../../login/Header';
import Footer from '../../components/Footer';

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
  const navigate = useNavigate();
  const { simulationId } = useParams();
  const [activeSimulationId, setActiveSimulationId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [results, setResults] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  // Sync URL params with state
  useEffect(() => {
    if (simulationId) {
      const id = parseInt(simulationId, 10);
      if (id && simulations.some(sim => sim.id === id)) {
        setActiveSimulationId(id);
        // Reset simulation state when loading from URL
        setCurrentStep(0);
        setXpEarned(0);
        setResults([]);
        setIsComplete(false);
      } else {
        navigate('/simulation', { replace: true });
      }
    } else {
      setActiveSimulationId(null);
      setCurrentStep(0);
      setXpEarned(0);
      setResults([]);
      setIsComplete(false);
    }
  }, [simulationId, navigate]);

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
    navigate(`/simulation/${simulationId}`, { replace: true });
    setActiveSimulationId(simulationId);
    setCurrentStep(0);
    setXpEarned(0);
    setResults([]);
    setIsComplete(false);
  }, [navigate]);

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
    navigate('/simulation', { replace: true });
    setActiveSimulationId(null);
    setCurrentStep(0);
    setXpEarned(0);
    setResults([]);
    setIsComplete(false);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="relative flex flex-col gap-8 sm:gap-12 md:gap-16 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-3 sm:px-4 md:px-6 lg:px-10 xl:px-16 py-8 sm:py-12 md:py-16 text-white">
        {/* Enchanting Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {/* Large Animated Gradient Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 80, 0],
            y: [0, 60, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-400/40 via-purple-400/35 to-fuchsia-400/40 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.5, 0.25],
            x: [0, -100, 0],
            y: [0, 80, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-indigo-400/35 via-blue-400/30 to-cyan-400/35 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.45, 0.2],
            x: [0, 60, 0],
            y: [0, -70, 0],
            rotate: [0, -180, -360],
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-rose-400/30 via-pink-400/25 to-amber-400/30 rounded-full blur-[130px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
            y: [0, 100, 0],
            rotate: [180, 360, 180],
          }}
          transition={{ 
            duration: 22, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-emerald-400/25 via-teal-400/20 to-cyan-400/25 rounded-full blur-[110px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.18, 1],
            opacity: [0.15, 0.35, 0.15],
            x: [0, 70, 0],
            y: [0, -50, 0],
            rotate: [-90, 90, -90],
          }}
          transition={{ 
            duration: 16, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2.5
          }}
          className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-gradient-to-br from-amber-400/20 via-orange-400/15 to-yellow-400/20 rounded-full blur-[100px]" 
        />
        
        {/* Floating Sparkle Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -40, 0],
                x: [0, (Math.random() - 0.5) * 30, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 md:hidden pointer-events-none bg-gradient-to-b from-slate-950/95 via-slate-950/90 to-indigo-950/95" />
        
        {/* Animated Gradient Mesh Overlay */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.25) 0%, transparent 50%),
              radial-gradient(circle at 60% 60%, rgba(59, 130, 246, 0.25) 0%, transparent 50%)
            `,
            backgroundSize: '200% 200%',
          }}
        />
        
        {/* Shimmer Effect */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          style={{
            width: '50%',
            height: '100%',
          }}
        />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-3 sm:gap-5 md:gap-6 text-center px-3">
          <motion.span
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
          >
            <HiOutlineSparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            Simulation Arena
          </motion.span>
          <motion.h1
            className="text-[1.35rem] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-snug px-1"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
          >
            Step into immersive scenarios and power up your skills
          </motion.h1>
          <motion.p
            className="max-w-3xl text-[0.9rem] sm:text-sm md:text-base lg:text-lg leading-relaxed text-slate-200 px-1"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            Choose a simulation, make pivotal decisions, and earn XP while practicing the soft skills that define high-impact
            collaborators.
          </motion.p>
        </section>

        <div className="relative z-10 grid gap-8 sm:gap-10 md:gap-12 xl:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
            {/* Simulation Selection */}
            <section className="relative z-10 flex flex-col gap-4 sm:gap-5 md:gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4">
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-white">Choose your simulation</h2>
                  <p className="text-[0.9rem] sm:text-sm md:text-base leading-relaxed text-slate-300">
                    Each challenge amplifies a different dimension of your creative and collaborative flow.
                  </p>
                </div>
                {activeSimulation && (
                  <motion.button
                    type="button"
                    onClick={handleBackToSelection}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border-2 border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-violet-700 shadow-md hover:border-violet-300 hover:shadow-lg transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 self-start sm:self-auto min-h-[44px]"
                  >
                    Return to list
                  </motion.button>
                )}
              </div>
              <motion.div
                layout
                className={`relative z-10 grid gap-3 sm:gap-4 md:gap-6 ${
                  simulations.length === 2
                    ? 'sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                }`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 }}
              >
                {simulations.map((simulation) => {
                  const isActive = activeSimulationId === simulation.id;
                  const accentGradients = [
                    'from-amber-400 via-orange-500 to-rose-500',
                    'from-rose-500 via-pink-500 to-fuchsia-500',
                    'from-cyan-400 via-blue-500 to-indigo-500',
                  ];
                  const badgeColors = [
                    'bg-amber-400/15 text-amber-100 border border-amber-400/40',
                    'bg-rose-400/15 text-rose-100 border border-rose-400/40',
                    'bg-cyan-400/15 text-cyan-100 border border-cyan-400/40',
                  ];
                  const accent = accentGradients[(simulation.id - 1) % accentGradients.length];
                  const badgeColor = badgeColors[(simulation.id - 1) % badgeColors.length];
                  
                  return (
                    <motion.article
                      key={simulation.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (simulation.id - 1) * 0.08 }}
                      className="group relative h-full flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[32px] bg-slate-950/90 p-[1.5px] shadow-[0_25px_60px_-25px_rgba(15,118,255,0.45)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_35px_85px_-30px_rgba(129,140,248,0.55)] w-full"
                      whileHover={{ y: -6 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="absolute inset-[-120px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.12),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[28px] md:rounded-[30px] border border-white/5 bg-slate-950/75 p-3 sm:p-5 md:p-6 shadow-inner shadow-slate-900/70 backdrop-blur-xl">
                        <div className={`pointer-events-none absolute -top-32 right-0 h-48 w-48 rounded-full bg-gradient-to-br ${accent} opacity-30 blur-[140px] transition-all duration-500 group-hover:opacity-60`} />
                        <div className="pointer-events-none absolute -bottom-36 left-0 h-40 w-40 rounded-full bg-gradient-to-br from-slate-700/40 via-slate-900/30 to-transparent blur-[150px]" />
                        
                        <div className="relative flex flex-col gap-3 sm:gap-5 md:gap-6 flex-1">
                          {/* Badges */}
                          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                            <span className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 sm:px-3 md:px-3.5 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] sm:tracking-[0.32em] ${badgeColor}`}>
                              <HiOutlineLightningBolt className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              Sim #{simulation.id}
                            </span>
                            <span className={`inline-flex items-center rounded-full px-2.5 sm:px-3 md:px-3.5 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] sm:tracking-[0.32em] ${badgeColor}`}>
                              {simulation.difficulty}
                            </span>
                            <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-300">
                              SIMULATION
                            </span>
                          </div>
                          
                          {/* Title and Description */}
                          <div className="flex flex-col gap-2 sm:gap-3">
                            <h3 className="text-base sm:text-xl font-semibold text-white leading-tight">{simulation.title}</h3>
                            <p className="text-[0.85rem] sm:text-sm leading-relaxed text-slate-300/90 flex-1">
                              {simulation.description}
                            </p>
                          </div>
                          
                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[0.68rem] sm:text-[11px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.3em] text-slate-400">
                            <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-2 sm:px-3 py-1 text-indigo-100 whitespace-nowrap">
                              XP Reward <span className="font-bold text-white pl-1">{simulation.xpReward}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700/60 bg-slate-900/70 px-2 sm:px-3 py-1 text-[0.65rem] sm:text-[10px] text-slate-300">
                              Curated by <span className="font-semibold text-white/80">Acceptopia Team</span>
                            </span>
                          </div>
                        </div>
                        
                        {/* Footer with Button */}
                        <div className="relative mt-3 sm:mt-5 md:mt-6 flex flex-col gap-3 sm:gap-4">
                          <motion.button
                            type="button"
                            onClick={() => startSimulation(simulation.id)}
                            className="relative inline-flex items-center justify-between gap-2 sm:gap-3 overflow-hidden rounded-xl sm:rounded-2xl border border-transparent bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-3 sm:px-4 py-2 sm:py-3 text-[0.7rem] sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white shadow-xl shadow-indigo-500/40 transition-all duration-300 before:absolute before:inset-0 before:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_50%,rgba(255,255,255,0)_100%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 min-h-[44px]"
                            whileHover={{ scale: 1.035 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="whitespace-nowrap">Start Simulation</span>
                            <span className="inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/15 text-white shadow shadow-indigo-400/50">
                              →
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </section>

            {/* Active Simulation View */}
            <section className="relative z-10 flex flex-col gap-3 sm:gap-5 md:gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4">
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-white">Simulation Console</h2>
                  <p className="text-[0.85rem] sm:text-sm md:text-base text-slate-300">
                    Track progress, respond to prompts, and watch your XP climb.
                  </p>
                </div>
              {activeSimulation && (
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2.5 sm:px-4 py-1.5 sm:py-2 text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-white shadow-md self-start sm:self-auto"
                >
                  <HiOutlineChartPie className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Step {Math.min(currentStep + 1, activeSimulation.steps.length)} of {activeSimulation.steps.length}
                </motion.span>
              )}
            </div>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-[1px] shadow-2xl shadow-slate-900/40">
              <div className="relative flex flex-col gap-5 sm:gap-7 md:gap-8 rounded-2xl sm:rounded-[26px] md:rounded-[28px] bg-slate-900/95 p-3 sm:p-6 md:p-8 lg:p-12">
                <div className="absolute -top-36 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 opacity-30 blur-3xl" />
                <div className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-25 blur-[110px]" />

                <div className="relative flex flex-col gap-3 sm:gap-4 text-white">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-2 sm:gap-3">
                    <h3 className="text-[1rem] sm:text-lg md:text-xl font-semibold">
                      {activeSimulation ? activeSimulation.title : 'Pick a simulation to begin'}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 sm:px-4 py-1.5 sm:py-2 text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.22em] sm:tracking-[0.3em] text-white self-start sm:self-auto">
                      <HiOutlineSparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
                    <p className="text-[0.85rem] sm:text-sm text-slate-300">
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
                        className="flex flex-col gap-3 sm:gap-5 md:gap-6"
                      >
                        <div className="flex flex-col gap-2 sm:gap-3">
                          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] sm:tracking-[0.35em] text-slate-300">
                            Scenario Prompt
                          </p>
                          <h4 className="text-base sm:text-lg md:text-xl font-semibold leading-snug text-white">
                            {activeSimulation.steps[currentStep].question}
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-2">
                          {activeSimulation.steps[currentStep].options.map((option, index) => (
                            <motion.button
                              key={option}
                              type="button"
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleChoice(index)}
                              className="flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/10 p-2.5 sm:p-4 text-left text-[0.85rem] sm:text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 min-h-[44px]"
                            >
                              <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border border-white/40 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/80 flex-shrink-0">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span className="break-words">{option}</span>
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
                        className="flex flex-col gap-4 sm:gap-5 md:gap-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10 p-3 sm:p-5 md:p-6 shadow-lg shadow-slate-900/40"
                      >
                        <div className="flex flex-col items-center gap-2 text-center">
                          <span className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-400/40">
                            <IoRibbonOutline className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                          </span>
                          <h4 className="text-base sm:text-xl md:text-2xl font-semibold text-white">Simulation Complete</h4>
                          <p className="text-[0.85rem] sm:text-sm md:text-base text-slate-200">
                            You collected <span className="font-semibold text-white">{xpEarned} XP</span> out of{' '}
                            {activeSimulation.xpReward} possible rewards.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {results.map((result) => (
                            <div
                              key={result.stepIndex}
                              className="flex flex-col gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border border-white/10 bg-white/10 p-3 sm:p-4 text-slate-200"
                            >
                              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-slate-300">
                                Step {result.stepIndex + 1}
                              </span>
                              <p className="text-xs sm:text-sm font-semibold text-white">{result.question}</p>
                              <p className="text-xs sm:text-sm text-slate-100">
                                You chose: <span className="font-semibold text-white">{result.chosen}</span>
                              </p>
                              <p className="text-[10px] sm:text-xs text-slate-300">{result.feedback}</p>
                              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-emerald-300">
                                +{result.xpGained} XP
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 w-full">
                          <button
                            type="button"
                            onClick={handleRetry}
                            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-white/30 bg-white/10 px-4 sm:px-5 py-2 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 min-h-[44px] w-full sm:w-auto"
                          >
                            <HiOutlineRefresh className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            Retry simulation
                          </button>
                          <button
                            type="button"
                            onClick={handleBackToSelection}
                            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-4 sm:px-5 py-2 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white shadow-md shadow-indigo-400/40 transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-h-[44px] w-full sm:w-auto"
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
        <aside className="relative z-10 flex flex-col gap-5 sm:gap-8 md:gap-10 w-full">
          <section className="group relative overflow-hidden rounded-xl sm:rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/90 via-teal-50/80 to-cyan-50/80 flex flex-col gap-4 sm:gap-5 p-3 sm:p-5 md:p-6 shadow-lg hover:shadow-2xl hover:border-emerald-300 transition-all duration-500">
            {/* Hover Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
            />
            
            {/* Animated Accent Line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <h3 className="text-[0.95rem] sm:text-lg font-semibold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">Leaderboard Pulse</h3>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2.5 sm:px-3 py-1 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white shadow-md self-start sm:self-auto"
              >
                <HiOutlineShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Weekly
              </motion.span>
            </div>
            <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
              {leaderboard.map((entry, index) => {
                const rankColors = [
                  { gradient: 'from-amber-400 to-orange-400', bg: 'from-amber-50 to-orange-50', border: 'border-amber-200' },
                  { gradient: 'from-slate-400 to-gray-400', bg: 'from-slate-50 to-gray-50', border: 'border-slate-200' },
                  { gradient: 'from-orange-400 to-amber-400', bg: 'from-orange-50 to-amber-50', border: 'border-orange-200' },
                ];
                const rankColor = rankColors[index] || rankColors[1];
                
                return (
                  <motion.article
                    key={entry.id}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className={`group/item relative overflow-hidden flex items-center justify-between gap-3 sm:gap-4 rounded-lg sm:rounded-xl border-2 ${rankColor.border} bg-gradient-to-br ${rankColor.bg} px-3 sm:px-4 py-2.5 sm:py-3 shadow-md hover:shadow-lg transition-all duration-300`}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
                  >
                    {/* Hover Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${rankColor.gradient} opacity-0 group-hover/item:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative z-10 flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <motion.span 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br ${rankColor.gradient} text-xs sm:text-sm font-bold text-white shadow-lg flex-shrink-0`}
                      >
                        #{index + 1}
                      </motion.span>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[0.75rem] sm:text-sm font-semibold text-slate-900 truncate">{entry.name}</span>
                        <span className="text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.22em] sm:tracking-[0.3em] text-slate-500 truncate">{entry.badge}</span>
                      </div>
                    </div>
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="relative z-10 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.22em] sm:tracking-[0.3em] bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex-shrink-0"
                    >
                      XP {entry.xp}
                    </motion.span>
                  </motion.article>
                );
              })}
            </div>
          </section>

          <section className="group relative overflow-hidden rounded-xl sm:rounded-3xl border-2 border-fuchsia-200 bg-gradient-to-br from-fuchsia-50/90 via-pink-50/80 to-rose-50/80 flex flex-col gap-4 sm:gap-5 p-3 sm:p-5 md:p-6 shadow-lg hover:shadow-2xl hover:border-fuchsia-300 transition-all duration-500">
            {/* Hover Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
            />
            
            {/* Animated Accent Line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <h3 className="text-[0.95rem] sm:text-lg font-semibold bg-gradient-to-r from-fuchsia-700 to-pink-700 bg-clip-text text-transparent">Badge Preview</h3>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 px-2.5 sm:px-3 py-1 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white shadow-md self-start sm:self-auto"
              >
                <HiOutlineUserGroup className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Squad Goals
              </motion.span>
            </div>
            <div className="relative z-10 grid gap-3 sm:gap-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.03, y: -4 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group/item relative overflow-hidden flex items-center justify-between gap-2 sm:gap-3 rounded-lg sm:rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-rose-50/80 px-3 sm:px-4 py-2.5 sm:py-3 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {/* Hover Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${badge.gradient} opacity-0 group-hover/item:opacity-10 transition-opacity duration-300`} />
                  
                  <motion.span 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`relative z-10 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${badge.gradient} text-white shadow-lg flex-shrink-0`}
                  >
                    <IoRibbonOutline className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  </motion.span>
                  <div className="relative z-10 flex flex-col min-w-0 flex-1">
                    <span className="text-[0.8rem] sm:text-sm font-semibold text-slate-900 truncate">{badge.name}</span>
                    <span className="text-[0.65rem] sm:text-xs text-slate-600 truncate">{badge.requirement}</span>
                  </div>
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="relative z-10 inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100 text-[9px] sm:text-xs font-semibold text-purple-700 flex-shrink-0"
                  >
                    Soon
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="group relative overflow-hidden rounded-xl sm:rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/90 via-orange-50/80 to-yellow-50/80 flex flex-col gap-3 sm:gap-4 p-3 sm:p-5 md:p-6 shadow-lg hover:shadow-2xl hover:border-amber-300 transition-all duration-500">
            {/* Hover Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
            />
            
            {/* Animated Accent Line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <h3 className="text-[0.95rem] sm:text-lg font-semibold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">Your Session Snapshot</h3>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 sm:px-3 py-1 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white shadow-md self-start sm:self-auto"
              >
                <IoRibbonOutline className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {xpEarned} XP
              </motion.span>
            </div>
            <p className="relative z-10 text-[0.8rem] sm:text-sm text-slate-700">
              Track XP earned during this session. Complete more simulations to unlock badge tiers and climb the leaderboard.
            </p>
            <div className="relative z-10 h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-slate-200 shadow-inner">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 shadow-lg"
                initial={{ width: '10%' }}
                animate={{ width: `${Math.min(100, Math.max(10, (xpEarned / 400) * 100))}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 text-[0.7rem] sm:text-xs">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-2.5 sm:px-3 py-1 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-emerald-700 shadow-sm"
              >
                <HiOutlineShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Consistency Boost
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border-2 border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 px-2.5 sm:px-3 py-1 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-violet-700 shadow-sm"
              >
                <HiOutlineSparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Bonus unlocked at 400 XP
              </motion.span>
            </div>
          </section>
        </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const Simulation = memo(SimulationPageComponent);








