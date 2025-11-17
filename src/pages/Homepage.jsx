import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiAcademicCap,
  HiLightBulb,
  HiGift,
  HiArrowRight,
  HiStar,
  HiFire,
  HiBadgeCheck,
  HiChartBar,
  HiBookOpen,
  HiUsers,
  HiChatAlt2,
  HiMail,
  HiPhone,
  HiSparkles,
  HiShieldCheck,
} from 'react-icons/hi';
import Header from '../guest/Header';
import Footer from '../components/Footer';

const headingFont = "font-['Montserrat',sans-serif]";
const bodyFont = "font-['Open_Sans',sans-serif]";

const Homepage = memo(() => {
  useEffect(() => {
    const existing = document.querySelector("link[data-acceptopia-fonts='true']");
    if (existing) {
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap';
    link.setAttribute('data-acceptopia-fonts', 'true');
    document.head.appendChild(link);
  }, []);

  const compactNumberFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1,
      }),
    [],
  );

  const stats = useMemo(
    () => [
      {
        id: 'learners',
        icon: <HiUsers className="h-6 w-6" />,
        target: 10000,
        label: 'Active Learners',
        formatter: (value) => `${compactNumberFormatter.format(value)}+`,
      },
      {
        id: 'quizzes',
        icon: <HiBadgeCheck className="h-6 w-6" />,
        target: 50000,
        label: 'Quizzes Completed',
        formatter: (value) => `${compactNumberFormatter.format(value)}+`,
      },
      {
        id: 'xp',
        icon: <HiStar className="h-6 w-6" />,
        target: 1_000_000,
        label: 'XP Earned',
        formatter: (value) => `${compactNumberFormatter.format(value)}+`,
      },
      {
        id: 'colleges',
        icon: <HiAcademicCap className="h-6 w-6" />,
        target: 500,
        label: 'Colleges Listed',
        formatter: (value) => `${compactNumberFormatter.format(value)}+`,
      },
    ],
    [compactNumberFormatter],
  );

const features = [
    {
      icon: <HiLightBulb className="w-10 h-10" />,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with engaging quizzes and earn XP points as you progress. Track your improvement over time.',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: <HiAcademicCap className="w-10 h-10" />,
      title: 'College Discovery',
      description: 'Explore your dream universities with detailed information, admission requirements, and success stories.',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      icon: <HiGift className="w-10 h-10" />,
      title: 'Rewards System',
      description: 'Unlock achievements, earn medals, and climb leaderboards. Make learning fun and rewarding.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <HiChartBar className="w-10 h-10" />,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and personalized insights.',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: <HiBookOpen className="w-10 h-10" />,
      title: 'Rich Resources',
      description: 'Access comprehensive study materials, guides, and tips from experts and successful students.',
      color: 'from-indigo-500 to-blue-600',
    },
    {
      icon: <HiFire className="w-10 h-10" />,
      title: 'Daily Streaks',
      description: 'Build consistent learning habits with daily streaks and unlock special rewards.',
      color: 'from-red-500 to-orange-500',
    },
  ];

const StatCard = memo(({ icon, label, target, formatter, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.65 });
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(formatter(0));

  useEffect(() => {
    const unsubscribe = motionValue.on('change', (latest) => {
      setDisplayValue(formatter(Math.round(latest)));
    });
    return () => {
      unsubscribe();
    };
  }, [formatter, motionValue]);

  useEffect(() => {
    if (isInView) {
      const animation = animate(motionValue, target, {
        duration: 2.4,
        ease: [0.23, 1, 0.32, 1],
      });
      return () => {
        animation.stop();
      };
    }
    return undefined;
  }, [isInView, motionValue, target]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-6 py-7 text-center shadow-lg shadow-sky-100/60"
    >
      <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10 text-sky-600">
        {icon}
      </span>
      <span className="text-2xl font-bold text-slate-900 sm:text-3xl">{displayValue}</span>
      <span className="mt-2 text-xs font-medium uppercase tracking-[0.28em] text-slate-500">{label}</span>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

const resourcePreviewItems = [
  {
    id: 'strategy',
    title: 'Admissions Strategy Guides',
    description: 'Step-by-step playbooks covering timeline planning, essay prompts, and application positioning.',
    callout: 'Guided PDFs & Checklists',
    highlights: ['Application Timeline Blueprint', 'Essay Brainstorm Canvas', 'Admission Pitch Framework'],
  },
  {
    id: 'scholarships',
    title: 'Scholarship Explorer',
    description: 'Curated scholarship opportunities updated monthly with eligibility and deadline snapshots.',
    callout: 'Funding Spotlight Series',
    highlights: ['STEM Innovators Grant', 'First-Gen Scholars Fund', 'Creative Impact Fellowship'],
  },
  {
    id: 'skills',
    title: 'Skill Boost Sessions',
    description: 'Micro-courses to sharpen interviews, portfolios, and leadership storytelling for your applications.',
    callout: 'On-Demand Workshops',
    highlights: ['Storytelling for Admissions', 'Portfolio Polish Lab', 'Interview Flow Practice'],
  },
];

const aboutHighlights = [
  {
    id: 'roadmaps',
    title: 'Personalized Roadmaps',
    description: 'Adaptive milestones and nudges that reshape with every breakthrough you make.',
    badge: 'Adaptive Guidance',
  },
  {
    id: 'community',
    title: 'Collaborative Community',
    description: 'Join squads, celebrate wins, and collect insights from globally diverse applicants.',
    badge: 'Peer Momentum',
  },
  {
    id: 'playbooks',
    title: 'Expert Playbooks',
    description: 'Unlock frameworks, masterclasses, and annotated essays curated by admissions mentors.',
    badge: 'Mentor Crafted',
  },
  {
    id: 'transparency',
    title: 'Progress Transparency',
    description: 'Interactive dashboards reveal streaks, readiness scores, and action priorities at a glance.',
    badge: 'Data Visibility',
  },
];

const supportHighlights = [
  {
    id: 'coaching',
    title: '1:1 Coaching Calls',
    description: 'Meet with an admissions coach for strategic planning, essay feedback, and accountability check-ins.',
    icon: HiPhone,
    accent: 'from-emerald-400/30 via-emerald-500/20 to-sky-400/30',
    cta: 'Book a Session',
    href: 'mailto:coaches@acceptopia.com',
  },
  {
    id: 'desk',
    title: 'Priority Support Desk',
    description: 'Get answers in under 24 hours from our support specialists—no bots, just real humans.',
    icon: HiMail,
    accent: 'from-sky-400/30 via-indigo-500/25 to-purple-500/25',
    cta: 'Email Support',
    href: 'mailto:support@acceptopia.com',
  },
  {
    id: 'community',
    title: 'Community Fireside',
    description: 'Join live Discord salons, workshops, and roundtables hosted by mentors and alumni.',
    icon: HiChatAlt2,
    accent: 'from-purple-400/30 via-fuchsia-500/25 to-rose-400/30',
    cta: 'Join Discord',
    href: 'https://discord.com/invite/acceptopia',
  },
];

  const howItWorks = [
    {
      step: '01',
      title: 'Sign Up & Create Profile',
      description: 'Join thousands of learners on their journey to college acceptance.',
    },
    {
      step: '02',
      title: 'Take Quizzes & Earn XP',
      description: 'Test your knowledge, earn points, and track your progress.',
    },
    {
      step: '03',
      title: 'Explore Colleges',
      description: 'Discover universities that match your interests and goals.',
    },
    {
      step: '04',
      title: 'Unlock Achievements',
      description: 'Earn medals, climb leaderboards, and celebrate your success.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'High School Senior',
      content: 'Acceptopia helped me discover my dream college and stay motivated throughout my application process!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'College Student',
      content: 'The gamified learning experience made studying fun. I earned over 5000 XP in just one month!',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Graduate',
      content: 'Thanks to Acceptopia, I found the perfect college and got accepted to my top choice university.',
      rating: 5,
    },
  ];

  const communityHighlight = supportHighlights[2];

  return (
    <div className={`min-h-screen bg-gray-50 ${bodyFont}`}>
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-7xl mx-auto py-12 sm:py-16 md:py-20 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6"
              >
                <HiStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <span className="text-xs sm:text-sm font-medium">Trusted by 10,000+ Students</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2 ${headingFont}`}
              >
                Your Journey to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  College Acceptance
                </span>
                <br />
                Starts Here
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4"
              >
                Learn, earn XP, discover colleges, and unlock achievements. Make your college application journey fun and rewarding.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
              >
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/50 text-base sm:text-lg flex items-center justify-center gap-2"
                  >
                    Get Started Free
                    <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/30 text-base sm:text-lg"
                >
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 sm:h-20 md:h-24">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      <main className="relative">
        {/* Stats Section */}
        <section className="py-12 sm:py-16 md:py-20 -mt-8 sm:-mt-10 md:-mt-12 relative z-10">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
              >
                {stats.map((stat, index) => (
                  <StatCard
                    key={stat.id}
                    icon={stat.icon}
                    label={stat.label}
                    target={stat.target}
                    formatter={stat.formatter}
                    index={index}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative overflow-hidden py-16 sm:py-20 md:py-24">
          {/* Enchanting Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-indigo-50 via-purple-50 to-pink-50" />
          <div className="absolute inset-0">
            <motion.div 
              animate={{ 
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute -top-32 right-12 h-64 w-64 rounded-full bg-gradient-to-br from-amber-300/40 via-orange-300/30 to-pink-300/40 blur-[120px]" 
            />
            <motion.div 
              animate={{ 
                x: [0, -80, 0],
                y: [0, 100, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ 
                duration: 25, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute top-1/3 -left-12 h-72 w-72 rounded-full bg-gradient-to-br from-blue-300/40 via-cyan-300/35 to-indigo-300/40 blur-[110px]" 
            />
            <motion.div 
              animate={{ 
                x: [0, 60, 0],
                y: [0, -80, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 18, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-br from-purple-300/40 via-fuchsia-300/35 to-rose-300/40 blur-[130px]" 
            />
            <motion.div 
              animate={{ 
                x: [0, -50, 0],
                y: [0, 70, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{ 
                duration: 22, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.5
              }}
              className="absolute top-1/2 right-1/4 h-60 w-60 rounded-full bg-gradient-to-br from-emerald-300/30 via-teal-300/25 to-cyan-300/30 blur-[100px]" 
            />
          </div>

          {/* Sparkle Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="container relative mx-auto px-6 sm:px-8 lg:px-12 z-10">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="mx-auto mb-12 sm:mb-14 max-w-3xl text-center"
              >
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-100 via-purple-100 to-fuchsia-100 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-purple-700 shadow-lg shadow-purple-200/50 backdrop-blur-sm border border-purple-200/50"
                >
                  <HiSparkles className="w-4 h-4 text-amber-500" />
                  Acceptopia Features
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`mt-5 text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight ${headingFont}`}
                >
                  Enchant your college journey with gamified growth
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="mt-3 text-base sm:text-lg text-slate-700 font-medium"
                >
                  Earn XP, unlock rewards, and stay in motion with immersive learning loops designed for future scholars.
                </motion.p>
              </motion.div>

              <div className="relative flex flex-col gap-10">
                <motion.div 
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-200/60 via-purple-200/50 to-fuchsia-200/60 blur-3xl" 
                  aria-hidden="true" 
                />
                <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
                  {features.map((feature, index) => (
                    <motion.article
                      key={feature.title}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.55, delay: index * 0.08 }}
                      whileHover={{ y: -12, scale: 1.02 }}
                      className="group relative flex h-full flex-col gap-4 rounded-3xl border-2 border-white/80 bg-gradient-to-br from-white/90 via-white/80 to-white/90 p-6 sm:p-8 shadow-2xl shadow-purple-200/30 backdrop-blur-xl overflow-hidden"
                    >
                      {/* Animated Gradient Border on Hover */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, 
                            rgba(139, 92, 246, 0.3), 
                            rgba(168, 85, 247, 0.3), 
                            rgba(217, 70, 239, 0.3),
                            rgba(236, 72, 153, 0.3)
                          )`,
                          padding: '2px',
                        }}
                      >
                        <div className="absolute inset-[2px] rounded-3xl bg-white/95" />
                      </motion.div>

                      {/* Glowing Background Effect */}
                      <motion.div
                        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, 
                            rgba(139, 92, 246, 0.4), 
                            rgba(168, 85, 247, 0.4), 
                            rgba(217, 70, 239, 0.4)
                          )`,
                        }}
                      />

                      {/* Sparkle Particles */}
                      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute rounded-full bg-white/80"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              width: '3px',
                              height: '3px',
                            }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        ))}
                      </div>

                      <div className="relative z-10">
                        <motion.div 
                          whileHover={{ 
                            scale: 1.15, 
                            rotate: [0, -5, 5, -5, 0],
                          }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 300,
                            damping: 10
                          }}
                          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-2xl shadow-purple-400/50 transition-all duration-500 group-hover:shadow-purple-500/70`}
                        >
                          <motion.div
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity, 
                              ease: "easeInOut" 
                            }}
                          >
                            {feature.icon}
                          </motion.div>
                        </motion.div>
                        <h3 className={`mt-4 text-xl font-semibold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent ${headingFont}`}>
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-700 leading-relaxed font-medium">
                          {feature.description}
                        </p>
                        <motion.div 
                          whileHover={{ x: 5 }}
                          className="mt-auto flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-600 transition-colors duration-300 group-hover:text-purple-700"
                        >
                          Learn More
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity, 
                              ease: "easeInOut" 
                            }}
                          >
                            <HiArrowRight className="h-4 w-4" />
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                        }}
                      />
                    </motion.article>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.01 }}
                  className="relative overflow-hidden rounded-3xl"
                >
                  {/* Animated Gradient Border */}
                  <motion.div
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-3xl p-[2px]"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6, #a855f7, #d946ef, #ec4899, #f59e0b, #8b5cf6)',
                      backgroundSize: '300% 300%',
                    }}
                  >
                    <div className="relative flex flex-col items-center gap-4 rounded-[28px] bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 px-6 py-10 text-center sm:px-10 sm:py-12 backdrop-blur-sm border border-white/50">
                      {/* Floating Sparkles */}
                      <div className="absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute rounded-full bg-gradient-to-br from-amber-300 to-pink-300"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              width: `${Math.random() * 6 + 3}px`,
                              height: `${Math.random() * 6 + 3}px`,
                            }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                              y: [0, -20, 0],
                            }}
                            transition={{
                              duration: Math.random() * 3 + 2,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                            }}
                          />
                        ))}
                      </div>

                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-100 via-purple-100 to-fuchsia-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-purple-700 shadow-md border border-purple-200/50 relative z-10"
                      >
                        <HiSparkles className="w-3 h-3 text-amber-500" />
                        Feature Spotlight
                      </motion.span>
                      <h3 className={`text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent relative z-10 ${headingFont}`}>
                        Unlock themed seasons, streak boosters, and mentor-led quests
                      </h3>
                      <p className="max-w-2xl text-sm text-slate-700 font-medium relative z-10">
                        Experience Acceptopia's living world where fresh challenges, guild upgrades, and reward drops keep your application journey energized.
                      </p>
                      <Link
                        to="/features"
                        className="relative z-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-[1.05] hover:shadow-purple-500/70"
                      >
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                        >
                          Explore Full Feature Tour
                        </motion.span>
                        <HiArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50">
          {/* Beautiful Background Accents */}
          <div className="absolute inset-0">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/15 rounded-full blur-3xl" 
            />
          </div>

          <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-12 z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4 sm:space-y-5 md:space-y-6 w-full"
              >
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-blue-500/30"
                >
                  Why Acceptopia
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight ${headingFont}`}
                >
                  Built to support every learner on the road to acceptance
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed"
                >
                  Acceptopia blends gamified learning, curated resources, and a supportive community to help students stay motivated and informed throughout the admissions journey. Our platform adapts to your goals, celebrates achievements, and connects you with insights that matter.
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  {aboutHighlights.map((item, index) => {
                    const colorSchemes = [
                      { 
                        gradient: 'from-blue-500 to-cyan-500', 
                        bg: 'from-blue-50 to-cyan-50', 
                        border: 'border-blue-200',
                        text: 'text-blue-700',
                        badge: 'bg-blue-100 text-blue-700',
                        number: 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white',
                        hover: 'hover:border-blue-300 hover:shadow-blue-200/50'
                      },
                      { 
                        gradient: 'from-purple-500 to-pink-500', 
                        bg: 'from-purple-50 to-pink-50', 
                        border: 'border-purple-200',
                        text: 'text-purple-700',
                        badge: 'bg-purple-100 text-purple-700',
                        number: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white',
                        hover: 'hover:border-purple-300 hover:shadow-purple-200/50'
                      },
                      { 
                        gradient: 'from-indigo-500 to-blue-500', 
                        bg: 'from-indigo-50 to-blue-50', 
                        border: 'border-indigo-200',
                        text: 'text-indigo-700',
                        badge: 'bg-indigo-100 text-indigo-700',
                        number: 'bg-gradient-to-br from-indigo-500 to-blue-500 text-white',
                        hover: 'hover:border-indigo-300 hover:shadow-indigo-200/50'
                      },
                      { 
                        gradient: 'from-emerald-500 to-teal-500', 
                        bg: 'from-emerald-50 to-teal-50', 
                        border: 'border-emerald-200',
                        text: 'text-emerald-700',
                        badge: 'bg-emerald-100 text-emerald-700',
                        number: 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white',
                        hover: 'hover:border-emerald-300 hover:shadow-emerald-200/50'
                      },
                    ];
                    const colors = colorSchemes[index % colorSchemes.length];
                    
                    return (
                      <motion.article
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group relative"
                      >
                        <div className={`relative h-full min-h-[220px] sm:min-h-[240px] rounded-xl border-2 ${colors.border} bg-gradient-to-br ${colors.bg} p-5 sm:p-6 md:p-7 shadow-sm hover:shadow-xl ${colors.hover} transition-all duration-500 flex flex-col overflow-hidden`}>
                          {/* Hover Gradient Overlay */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                          />
                          
                          {/* Animated Accent Line */}
                          <motion.div
                            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}`}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                          />
                          
                          <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
                            <div className="flex items-center gap-3">
                              <motion.div 
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg ${colors.number} font-semibold text-sm sm:text-base shadow-lg`}
                              >
                                {String(index + 1).padStart(2, '0')}
                              </motion.div>
                              <motion.span 
                                whileHover={{ scale: 1.05 }}
                                className={`inline-flex items-center gap-1.5 rounded-full ${colors.badge} px-3 py-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider border`}
                              >
                                {item.badge}
                              </motion.span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3 flex-grow relative z-10">
                            <h3 className={`text-lg sm:text-xl font-semibold text-slate-900 leading-tight transition-colors duration-300 ${headingFont}`} style={{ color: 'inherit' }}>
                              {item.title}
                            </h3>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed flex-grow">
                              {item.description}
                            </p>
                          </div>
                          <div className={`mt-6 pt-4 border-t ${colors.border} relative z-10`}>
                            <motion.div 
                              whileHover={{ x: 5 }}
                              className={`flex items-center gap-2 text-xs font-medium ${colors.text} uppercase tracking-wider cursor-pointer`}
                            >
                              <span>Learn More</span>
                              <motion.div
                                animate={{ x: [0, 4, 0] }}
                                transition={{ 
                                  duration: 1.5, 
                                  repeat: Infinity, 
                                  ease: "easeInOut" 
                                }}
                              >
                                <HiArrowRight className="w-3 h-3" />
                              </motion.div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </motion.div>

              {/* Acceptance Snapshot Card */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="relative w-full mt-8 lg:mt-0 group"
              >
                <div className="relative rounded-xl border-2 border-indigo-200 bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/30 p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl hover:border-indigo-300 transition-all duration-500 space-y-6 overflow-hidden">
                  {/* Animated Background Gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  {/* Top Accent Line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <motion.h3 
                      whileHover={{ scale: 1.05 }}
                      className={`text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent ${headingFont}`}
                    >
                      Acceptance Snapshot
                    </motion.h3>
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      animate={{ 
                        boxShadow: [
                          '0 0 0 0 rgba(59, 130, 246, 0.4)',
                          '0 0 0 4px rgba(59, 130, 246, 0)',
                          '0 0 0 0 rgba(59, 130, 246, 0)',
                        ],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity 
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-1 text-xs font-medium text-white shadow-md"
                    >
                      <motion.span 
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity 
                        }}
                        className="h-2 w-2 rounded-full bg-white"
                      />
                      Live Data
                    </motion.span>
                  </div>
                  <div className="relative z-10 grid grid-cols-2 gap-4">
                    {[
                      { label: 'Avg. Application Lift', value: '37%', color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50' },
                      { label: 'Community Events Monthly', value: '18+', color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50' },
                      { label: 'Mentor Sessions Booked', value: '3,200', color: 'from-indigo-500 to-blue-500', bg: 'from-indigo-50 to-blue-50' },
                      { label: 'Success Stories Shared', value: '4,500+', color: 'from-emerald-500 to-teal-500', bg: 'from-emerald-50 to-teal-50' },
                    ].map((metric, idx) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 + idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        className={`rounded-lg bg-gradient-to-br ${metric.bg} p-4 text-center border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md`}
                      >
                        <motion.div 
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: idx * 0.3
                          }}
                          className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-1`}
                        >
                          {metric.value}
                        </motion.div>
                        <div className="text-xs font-medium uppercase tracking-wide text-slate-600">
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative z-10 rounded-lg border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/80 via-blue-50/80 to-purple-50/80 p-5 shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="text-3xl text-indigo-300 font-serif leading-none mt-1"
                      >
                        "
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-3">
                          Acceptopia's personalized challenges and accountability loop gave me the clarity I needed during application crunch time.
                        </p>
                        <p className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                          — Jordan P., Stanford Admit
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Resources Preview Section */}
        <section id="resources" className="relative overflow-hidden py-12 sm:py-16 md:py-20 bg-gradient-to-br from-violet-50/30 via-indigo-50/20 to-blue-50/30">
          {/* Beautiful Background Accents */}
          <div className="absolute inset-0">
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-0 left-1/4 w-96 h-96 bg-violet-400/15 rounded-full blur-3xl" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.5
              }}
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl" 
            />
          </div>

          <div className="container relative mx-auto px-6 sm:px-8 lg:px-12 z-10">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10 sm:mb-14"
              >
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-violet-500/30"
                >
                  <HiSparkles className="w-3 h-3" />
                  Resources Preview
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`mt-4 text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-violet-900 to-indigo-900 bg-clip-text text-transparent ${headingFont}`}
                >
                  Explore the toolkit awaiting inside Acceptopia
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-3 text-sm sm:text-base md:text-lg text-slate-700 max-w-2xl mx-auto px-4"
                >
                  Sample the playbooks, scholarship highlights, and skill boosts you can unlock after signing up.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {resourcePreviewItems.map((resource, index) => {
                  const colorSchemes = [
                    { 
                      gradient: 'from-amber-500 to-orange-500', 
                      bg: 'from-amber-50 to-orange-50', 
                      border: 'border-amber-200',
                      text: 'text-amber-700',
                      badge: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
                      highlight: 'from-amber-100 to-orange-100',
                      hover: 'hover:border-amber-300 hover:shadow-amber-200/50',
                      dot: 'from-amber-500 to-orange-500'
                    },
                    { 
                      gradient: 'from-rose-500 to-pink-500', 
                      bg: 'from-rose-50 to-pink-50', 
                      border: 'border-rose-200',
                      text: 'text-rose-700',
                      badge: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white',
                      highlight: 'from-rose-100 to-pink-100',
                      hover: 'hover:border-rose-300 hover:shadow-rose-200/50',
                      dot: 'from-rose-500 to-pink-500'
                    },
                    { 
                      gradient: 'from-cyan-500 to-blue-500', 
                      bg: 'from-cyan-50 to-blue-50', 
                      border: 'border-cyan-200',
                      text: 'text-cyan-700',
                      badge: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
                      highlight: 'from-cyan-100 to-blue-100',
                      hover: 'hover:border-cyan-300 hover:shadow-cyan-200/50',
                      dot: 'from-cyan-500 to-blue-500'
                    },
                  ];
                  const colors = colorSchemes[index % colorSchemes.length];
                  
                  return (
                    <motion.article
                      key={resource.id}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: index * 0.08 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="group relative"
                    >
                      <div className={`relative flex flex-col gap-5 rounded-3xl border-2 ${colors.border} bg-gradient-to-br ${colors.bg} p-6 sm:p-8 shadow-lg hover:shadow-2xl ${colors.hover} transition-all duration-500 overflow-hidden`}>
                        {/* Hover Gradient Overlay */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                        />
                        
                        {/* Animated Accent Line */}
                        <motion.div
                          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}`}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                        />
                        
                        {/* Glow Effect */}
                        <div className={`absolute -top-20 right-0 h-32 w-32 rounded-full bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} aria-hidden="true" />
                        
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className={`inline-flex items-center rounded-full ${colors.badge} px-3 py-1 text-[11px] font-semibold tracking-[0.28em] uppercase shadow-md relative z-10`}
                        >
                          {resource.callout}
                        </motion.span>
                        <h3 className={`text-xl font-semibold text-slate-900 relative z-10 ${headingFont}`}>{resource.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed relative z-10">{resource.description}</p>
                        <div className="flex flex-col gap-2 relative z-10">
                          {resource.highlights.map((item, idx) => (
                            <motion.div
                              key={item}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                              whileHover={{ scale: 1.02, x: 4 }}
                              className={`flex items-center gap-2 rounded-xl border-2 ${colors.border} bg-gradient-to-r ${colors.highlight} px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] ${colors.text} cursor-pointer transition-all duration-300`}
                            >
                              <motion.span 
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: Infinity, 
                                  ease: "easeInOut",
                                  delay: idx * 0.2
                                }}
                                className={`h-2 w-2 rounded-full bg-gradient-to-r ${colors.dot}`}
                              />
                              {item}
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-auto pt-4 border-t border-slate-200 relative z-10">
                          <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
                            Preview Only · Full Access After Sign Up
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10 flex justify-center"
              >
                <Link
                  to="/signup"
                  className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-xl shadow-indigo-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50 overflow-hidden"
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="relative z-10"
                  >
                    View Complete Library
                  </motion.span>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="relative z-10"
                  >
                    <HiArrowRight className="h-4 w-4" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 sm:mb-12 md:mb-16"
              >
                <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2 ${headingFont}`}>
                  How It{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Works
                  </span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                  Start your journey in just a few simple steps
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {howItWorks.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 text-center relative z-10">
                      <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 sm:mb-4">
                        {step.step}
                      </div>
                      <h3 className={`text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 ${headingFont}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        {step.description}
                      </p>
                    </div>
                    {index < howItWorks.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
                        <HiArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 sm:mb-12 md:mb-16"
              >
                <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2 ${headingFont}`}>
                  Loved by{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Students
                  </span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                  See what our community has to say about their experience
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 border border-blue-100"
                  >
                    <div className="flex items-center gap-1 mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <HiStar key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="border-t border-blue-200 pt-3 sm:pt-4">
                      <p className={`font-semibold text-gray-900 text-sm sm:text-base ${headingFont}`}>{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="support" className="relative overflow-hidden py-16 sm:py-20 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
          <div className="absolute inset-0">
            <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="absolute top-1/3 right-10 h-44 w-44 rounded-full bg-purple-500/25 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
          </div>

          <div className="container relative mx-auto px-6 sm:px-8 lg:px-12 text-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:gap-12 lg:flex-row lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1 space-y-5 sm:space-y-6"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white">
                  Contact & Support
                  <HiSparkles className="h-4 w-4 text-amber-300" />
                </span>
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white ${headingFont}`}>
                  Enchanted help, right when you need it
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed">
                  Acceptopia’s support guild blends expert coaches, proactive guides, and a vibrant community so you’re never navigating the admissions adventure alone.
                </p>
                <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-slate-200">
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Response <span className="text-emerald-300">under 24h</span></span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Human-first support</span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Global time zones</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex-1 rounded-[34px] border border-white/15 bg-white/5 p-6 sm:p-8 shadow-2xl shadow-black/30 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-6 sm:gap-7">
                  <div className="flex items-center justify-between rounded-3xl border border-white/15 bg-white/10 px-5 py-4 shadow-inner shadow-black/20">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-purple-500 text-white shadow-lg shadow-indigo-900/40">
                        <HiShieldCheck className="h-6 w-6" />
                      </span>
                      <div>
                        <p className={`text-sm font-semibold text-white ${headingFont}`}>Always-On Guidance</p>
                        <p className="text-xs text-slate-200">Coaches, mentors, and peers ready to help.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Live
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {supportHighlights.slice(0, 2).map(({ id, title, description, icon: Icon, accent, cta, href }) => (
                      <a
                        key={id}
                        href={href}
                        className={`group relative flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 transition-transform duration-300 hover:-translate-y-1 hover:border-white/30`}
                        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        <div className={`absolute -top-16 right-0 h-32 w-32 rounded-full bg-gradient-to-br ${accent} blur-3xl opacity-60`} aria-hidden="true" />
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white shadow-md shadow-black/20 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className={`text-base font-semibold text-white ${headingFont}`}>{title}</h3>
                        <p className="text-xs text-slate-200 leading-relaxed">{description}</p>
                        <span className="mt-auto inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-200">
                          {cta}
                          <HiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </a>
                    ))}
                  </div>

                  <a
                    href={communityHighlight.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500/20 via-indigo-500/25 to-sky-500/20 px-6 py-5 shadow-xl shadow-black/25 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="absolute inset-0 opacity-40">
                      <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-purple-500/40 blur-3xl" />
                      <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-sky-500/35 blur-3xl" />
                    </div>
                    <div className="relative flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/20 text-white shadow-lg shadow-indigo-900/40 backdrop-blur">
                        <communityHighlight.icon className="h-6 w-6" />
                      </span>
                      <div className="space-y-1">
                        <p className={`text-sm font-semibold text-white ${headingFont}`}>{communityHighlight.title}</p>
                        <p className="text-xs text-slate-100 leading-relaxed">{communityHighlight.description}</p>
                      </div>
                    </div>
                    <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/90 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-900 shadow-lg shadow-black/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl">
                      <span className="absolute inset-0 rounded-full border border-white/50" aria-hidden="true" />
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/15 via-indigo-500/20 to-purple-500/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                      <span className="relative">{communityHighlight.cta}</span>
                      <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/40">
                        <HiArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent"></div>
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2 ${headingFont}`}>
                  Ready to Start Your Journey?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Join thousands of students who are already on their path to college acceptance. Start earning XP today!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  <Link to="/dashboard" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/50 text-base sm:text-lg flex items-center justify-center gap-2 mx-auto sm:mx-0"
                    >
                      Get Started Free
                      <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
});

Homepage.displayName = 'Homepage';

export default Homepage;

