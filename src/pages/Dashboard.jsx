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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8" aria-label="Dashboard main content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-6 sm:space-y-8"
        >
          {/* Enhanced Welcome Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-white overflow-hidden"
            aria-label="Welcome section"
          >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 w-32 h-32 sm:w-64 sm:h-64 bg-yellow-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 sm:-bottom-20 sm:-left-20 w-32 h-32 sm:w-64 sm:h-64 bg-pink-400/20 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1 w-full">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4"
                >
                  <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-1.5 sm:gap-2">
                    <HiStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                    <span className="text-xs sm:text-sm font-semibold">Level {userLevel}</span>
                  </div>
                  <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-1.5 sm:gap-2">
                    <HiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-semibold">Rank #{stats.rank}</span>
                  </div>
                </motion.div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 leading-tight">
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">{userName}</span>!
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6">
                  Keep learning, earning XP, and unlocking new achievements!
                </p>
                
                {/* XP Progress Bar */}
                <div className="max-w-md w-full">
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <span className="text-xs sm:text-sm font-medium">Progress to Level {userLevel + 1}</span>
                    <span className="text-xs sm:text-sm font-semibold">{stats.xp} / {stats.nextLevelXP} XP</span>
                  </div>
                  <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2.5 sm:h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full relative overflow-hidden"
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
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Avatar/Profile Icon */}
              <div className="hidden md:flex items-center justify-center flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center shadow-2xl"
                  aria-label="User profile"
                >
                  <HiUserCircle className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
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
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <HiClock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  Daily Goals
                </h2>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  {dailyGoals.filter(g => g.completed).length} / {dailyGoals.length} completed
                </span>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {dailyGoals.map((goal, index) => (
                  <motion.div
                    key={goal.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 sm:gap-4"
                  >
                    <div className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${
                      goal.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`}>
                      {goal.completed && <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs sm:text-sm font-medium truncate ${
                          goal.completed ? 'text-gray-800' : 'text-gray-600'
                        }`}>
                          {goal.label}
                        </span>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 sm:h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                          className={`h-full rounded-full ${
                            goal.completed ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
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
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2"
            >
              <HiLightBulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
              Quick Access
            </motion.h2>
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
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                <HiStar className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                Achievements
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md' 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className={`flex justify-center mb-2 sm:mb-3 ${achievement.color}`}>
                      <div className="w-5 h-5 sm:w-6 sm:h-6">
                        {achievement.icon}
                      </div>
                    </div>
                    <p className={`text-center text-xs sm:text-sm font-semibold ${
                      achievement.earned ? 'text-gray-800' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </p>
                    {achievement.earned && (
                      <div className="flex justify-center mt-1.5 sm:mt-2">
                        <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Recent Activity Section */}
          <section aria-label="Recent activity">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2"
            >
              <HiChartBar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              Recent Activity
            </motion.h2>
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <div className="space-y-2 sm:space-y-3">
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
                className="mt-4 sm:mt-6 w-full py-2.5 sm:py-3 text-sm sm:text-base text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2"
                aria-label="View all activity"
              >
                View All Activity
                <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </section>

          {/* Enhanced Motivational Banner */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
            aria-label="Motivational banner"
          >
            <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-center text-white overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-pink-400/10"></div>
              <div className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 w-32 h-32 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 sm:-bottom-20 sm:-left-20 w-32 h-32 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6"
                >
                  <HiFire className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  <span className="text-xs sm:text-sm font-semibold">{stats.streak} Day Streak!</span>
                </motion.div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight px-2">
                  Stay consistent — earn XP every day and climb the leaderboard!
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                  Your daily progress matters. Every quiz, every lesson, every achievement brings you closer to your goals.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContinueLearning}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/50 text-base sm:text-lg flex items-center justify-center gap-2 mx-auto"
                  aria-label="Continue learning"
                >
                  Continue Learning
                  <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
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

