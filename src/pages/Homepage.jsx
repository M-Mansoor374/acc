import React, { memo } from 'react';
import { motion } from 'framer-motion';
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
  HiUsers
} from 'react-icons/hi';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Homepage = memo(() => {
  const stats = [
    { icon: <HiUsers className="w-6 h-6" />, value: '10K+', label: 'Active Learners' },
    { icon: <HiBadgeCheck className="w-6 h-6" />, value: '50K+', label: 'Quizzes Completed' },
    { icon: <HiStar className="w-6 h-6" />, value: '1M+', label: 'XP Earned' },
    { icon: <HiAcademicCap className="w-6 h-6" />, value: '500+', label: 'Colleges Listed' },
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2"
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
        <section className="py-8 sm:py-12 md:py-16 -mt-8 sm:-mt-10 md:-mt-12 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 text-center border border-gray-100"
                  >
                    <div className="flex justify-center mb-2 sm:mb-3 text-blue-600">
                      <div className="w-5 h-5 sm:w-6 sm:h-6">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 sm:mb-12 md:mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
                  Everything You Need to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Succeed
                  </span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                  Powerful features designed to make your college application journey smooth and rewarding.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -8 }}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 sm:mb-12 md:mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
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
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 sm:mb-12 md:mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
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
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
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

