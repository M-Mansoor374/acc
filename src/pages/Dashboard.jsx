import React, { memo, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  HiAcademicCap, 
  HiGift, 
  HiBookOpen, 
  HiLightBulb,
  HiCheckCircle,
  HiStar,
  HiBadgeCheck,
  HiUserCircle,
  HiFire,
  HiTrendingUp,
  HiClock,
  HiArrowRight,
  HiChartBar
} from 'react-icons/hi';
import Header from '../components/Header';
import DashboardStats from '../components/DashboardStats/DashboardStats';
import QuickLinkCard from '../components/QuickLinkCard';
import ActivityItem from '../components/ActivityItem';
import Footer from '../components/Footer';

const Dashboard = memo(() => {
  const navigate = useNavigate();
  
  // Mock user data - replace with actual user data from context/state
  const userName = useMemo(() => 'Learner', []);
  const userLevel = useMemo(() => 5, []);
  const stats = useMemo(() => ({
    xp: 1250,
    streak: 7,
    medals: 12,
    nextLevelXP: 2000,
    rank: 42,
  }), []);

  const quickLinks = useMemo(() => [
    {
      icon: <HiLightBulb className="w-6 h-6" />,
      title: 'Take a Quiz',
      description: 'Test your knowledge and earn XP',
      path: '/quiz',
    },
    {
      icon: <HiAcademicCap className="w-6 h-6" />,
      title: 'Explore Colleges',
      description: 'Discover your dream universities',
      path: '/colleges',
    },
    {
      icon: <HiGift className="w-6 h-6" />,
      title: 'View Rewards',
      description: 'Check out available rewards',
      path: '/rewards',
    },
    {
      icon: <HiBookOpen className="w-6 h-6" />,
      title: 'Resources',
      description: 'Access learning materials',
      path: '/resources',
    },
  ], []);

  const recentActivities = useMemo(() => [
    {
      icon: <HiCheckCircle className="w-5 h-5" />,
      title: 'Completed Quiz: Math Basics',
      description: 'You scored 85%',
      time: '2 hours ago',
      xp: 50,
    },
    {
      icon: <HiBadgeCheck className="w-5 h-5" />,
      title: 'Badge Unlocked: Quick Learner',
      description: 'Complete 5 quizzes in a week',
      time: '5 hours ago',
      xp: 100,
    },
    {
      icon: <HiStar className="w-5 h-5" />,
      title: 'XP Earned: Daily Login',
      description: 'Logged in for 7 days straight',
      time: '1 day ago',
      xp: 25,
    },
    {
      icon: <HiCheckCircle className="w-5 h-5" />,
      title: 'Completed Quiz: Science Fundamentals',
      description: 'You scored 92%',
      time: '2 days ago',
      xp: 60,
    },
  ], []);

  const achievements = useMemo(() => [
    { icon: <HiStar className="w-6 h-6" />, title: 'Scholar', earned: true, color: 'text-yellow-500' },
    { icon: <HiFire className="w-6 h-6" />, title: 'Streak Master', earned: true, color: 'text-orange-500' },
    { icon: <HiBadgeCheck className="w-6 h-6" />, title: 'Quiz Champion', earned: true, color: 'text-blue-500' },
    { icon: <HiAcademicCap className="w-6 h-6" />, title: 'Perfect Score', earned: false, color: 'text-gray-400' },
  ], []);

  const dailyGoals = useMemo(() => [
    { label: 'Take 1 Quiz', completed: true, progress: 100 },
    { label: 'Earn 50 XP', completed: true, progress: 100 },
    { label: 'Study 30 minutes', completed: false, progress: 65 },
  ], []);

  const handleQuickLinkClick = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  const handleContinueLearning = useCallback(() => {
    navigate('/quiz');
  }, [navigate]);

  const xpProgress = useMemo(() => {
    return Math.min((stats.xp / stats.nextLevelXP) * 100, 100);
  }, [stats.xp, stats.nextLevelXP]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10" aria-label="Dashboard main content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-6 sm:space-y-8"
        >
          {/* Professional Welcome Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-white overflow-hidden border border-slate-700/50"
            aria-label="Welcome section"
          >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1 w-full">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4"
                >
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center gap-2 shadow-lg">
                    <HiStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                    <span className="text-xs sm:text-sm font-semibold">Level {userLevel}</span>
                  </div>
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center gap-2 shadow-lg">
                    <HiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-semibold">Rank #{stats.rank}</span>
                  </div>
                </motion.div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                  Welcome back, <br className="sm:hidden" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">{userName}</span>!
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl">
                  Keep learning, earning XP, and unlocking new achievements. Your journey to excellence continues.
                </p>
                
                {/* XP Progress Bar */}
                <div className="max-w-lg w-full">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-sm sm:text-base font-medium text-white/90">Progress to Level {userLevel + 1}</span>
                    <span className="text-sm sm:text-base font-bold text-white">{stats.xp} / {stats.nextLevelXP} XP</span>
                  </div>
                  <div className="w-full bg-slate-800/50 backdrop-blur-sm rounded-full h-3 sm:h-4 overflow-hidden border border-white/10 shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full relative overflow-hidden shadow-lg"
                    >
                      <motion.div
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Avatar/Profile Icon */}
              <div className="hidden md:flex items-center justify-center flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md border-2 border-white/20 flex items-center justify-center shadow-2xl"
                  aria-label="User profile"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-2xl"></div>
                  <HiUserCircle className="w-16 h-16 lg:w-20 lg:h-20 text-white relative z-10" />
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Progress Overview */}
          <DashboardStats />

          {/* Daily Goals Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            aria-label="Daily goals"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200/50 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <HiClock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span>Daily Goals</span>
                </h2>
                <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <span className="text-sm font-semibold text-gray-700">
                    {dailyGoals.filter(g => g.completed).length} / {dailyGoals.length} completed
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {dailyGoals.map((goal, index) => (
                  <motion.div
                    key={goal.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50/30 border border-gray-200/50 hover:border-blue-300 transition-all duration-200"
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-md ${
                      goal.completed ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gray-300'
                    }`}>
                      {goal.completed ? (
                        <HiCheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm sm:text-base font-semibold ${
                          goal.completed ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {goal.label}
                        </span>
                        <span className="text-sm font-bold text-gray-600 ml-2 flex-shrink-0">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                          className={`h-full rounded-full shadow-sm ${
                            goal.completed 
                              ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600' 
                              : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600'
                          }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Quick Access Section */}
          <section aria-label="Quick access links">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <HiLightBulb className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span>Quick Access</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {quickLinks.map((link, index) => (
                <QuickLinkCard
                  key={link.title}
                  icon={link.icon}
                  title={link.title}
                  description={link.description}
                  delay={0.1 * (index + 1)}
                  onClick={() => handleQuickLinkClick(link.path)}
                />
              ))}
            </div>
          </section>

          {/* Achievements Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            aria-label="Achievements"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200/50 backdrop-blur-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <HiStar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span>Achievements</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`p-5 sm:p-6 rounded-xl border-2 transition-all duration-200 ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-300 shadow-lg hover:shadow-xl' 
                        : 'bg-gray-50 border-gray-300 opacity-70'
                    }`}
                  >
                    <div className={`flex justify-center mb-3 ${achievement.color}`}>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                        {achievement.icon}
                      </div>
                    </div>
                    <p className={`text-center text-sm font-bold ${
                      achievement.earned ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </p>
                    {achievement.earned && (
                      <div className="flex justify-center mt-2">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                          <HiCheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Recent Activity Section */}
          <section aria-label="Recent activity">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <HiChartBar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span>Recent Activity</span>
              </h2>
            </motion.div>
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200/50 backdrop-blur-sm">
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <ActivityItem
                    key={index}
                    icon={activity.icon}
                    title={activity.title}
                    description={activity.description}
                    time={activity.time}
                    xp={activity.xp}
                    delay={0.1 * index}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleQuickLinkClick('/dashboard')}
                className="mt-6 w-full py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                aria-label="View all activity"
              >
                View All Activity
                <HiArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </section>

          {/* Professional Motivational Banner */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
            aria-label="Motivational banner"
          >
            <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 lg:p-16 text-center text-white overflow-hidden border border-slate-700/50">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg mb-6 shadow-lg"
                >
                  <HiFire className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-bold">{stats.streak} Day Streak!</span>
                </motion.div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight px-2">
                  Stay consistent — earn XP every day and climb the leaderboard!
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 max-w-3xl mx-auto px-4">
                  Your daily progress matters. Every quiz, every lesson, every achievement brings you closer to your goals.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContinueLearning}
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-blue-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/50 text-base sm:text-lg flex items-center justify-center gap-3 mx-auto"
                  aria-label="Continue learning"
                >
                  Continue Learning
                  <HiArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;

