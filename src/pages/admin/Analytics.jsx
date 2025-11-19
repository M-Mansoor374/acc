import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  HiUsers,
  HiTrendingUp,
  HiTrendingDown,
  HiChartBar,
  HiLightningBolt,
  HiBookOpen,
  HiClock,
} from 'react-icons/hi';

const AnalyticsComponent = () => {
  // Mock analytics data - replace with actual API call
  const analytics = useMemo(
    () => ({
      totalUsers: 1247,
      newUsersThisMonth: 89,
      activeUsers: 892,
      totalSimulations: 12,
      totalResources: 48,
      totalCompletions: 4923,
      averageCompletionRate: 78.5,
      engagementRate: 65.2,
      dailyActiveUsers: 456,
      weeklyActiveUsers: 1234,
      monthlyActiveUsers: 1890,
      userGrowth: 12.5,
      completionGrowth: 8.3,
      resourceDownloads: 15234,
      averageSessionTime: 24.5,
    }),
    [],
  );

  const statsCards = [
    {
      title: 'Total Users',
      value: analytics.totalUsers.toLocaleString(),
      change: `+${analytics.userGrowth}%`,
      trend: 'up',
      icon: HiUsers,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Active Users',
      value: analytics.activeUsers.toLocaleString(),
      change: `+${analytics.engagementRate}%`,
      trend: 'up',
      icon: HiTrendingUp,
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Total Completions',
      value: analytics.totalCompletions.toLocaleString(),
      change: `+${analytics.completionGrowth}%`,
      trend: 'up',
      icon: HiLightningBolt,
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Resource Downloads',
      value: analytics.resourceDownloads.toLocaleString(),
      change: '+15.2%',
      trend: 'up',
      icon: HiBookOpen,
      color: 'from-amber-500 to-orange-600',
    },
  ];

  const activityStats = [
    {
      label: 'Daily Active Users',
      value: analytics.dailyActiveUsers.toLocaleString(),
      percentage: 36.6,
      color: 'bg-blue-500',
    },
    {
      label: 'Weekly Active Users',
      value: analytics.weeklyActiveUsers.toLocaleString(),
      percentage: 99.0,
      color: 'bg-green-500',
    },
    {
      label: 'Monthly Active Users',
      value: analytics.monthlyActiveUsers.toLocaleString(),
      percentage: 100,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <HiTrendingUp className="w-4 h-4" />
                  ) : (
                    <HiTrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">User Activity</h3>
          <div className="space-y-6">
            {activityStats.map((activity, index) => (
              <div key={activity.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{activity.label}</span>
                  <span className="text-sm font-bold text-gray-900">{activity.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${activity.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-full rounded-full ${activity.color}`}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{activity.percentage}% of total users</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Metrics</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                  <HiChartBar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Average Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.averageCompletionRate}%</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                  <HiTrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Engagement Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.engagementRate}%</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                  <HiClock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Average Session Time</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.averageSessionTime} min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <HiLightningBolt className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Simulations</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalSimulations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <HiBookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Resources</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalResources}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <HiUsers className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">New Users (This Month)</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.newUsersThisMonth}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AnalyticsComponent);





