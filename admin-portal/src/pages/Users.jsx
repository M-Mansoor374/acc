import React, { memo, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  HiSearch,
  HiUserRemove,
  HiUserAdd,
  HiShieldCheck,
  HiTrash,
  HiFilter,
  HiArrowLeft,
  HiMail,
  HiCalendar,
  HiClock,
  HiDotsVertical,
} from 'react-icons/hi';

const UsersComponent = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Mock user data - replace with actual API call
  const users = useMemo(
    () => [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'user',
        status: 'active',
        joinedDate: '2024-01-15',
        lastActive: '2024-11-18',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'user',
        status: 'active',
        joinedDate: '2024-02-20',
        lastActive: '2024-11-17',
      },
      {
        id: 3,
        name: 'Admin User',
        email: 'admin@acceptopia.com',
        role: 'admin',
        status: 'active',
        joinedDate: '2024-01-01',
        lastActive: '2024-11-18',
      },
      {
        id: 4,
        name: 'Suspended User',
        email: 'suspended@example.com',
        role: 'user',
        status: 'suspended',
        joinedDate: '2024-03-10',
        lastActive: '2024-10-15',
      },
    ],
    [],
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [users, searchQuery, filterStatus]);

  const handleSuspend = (userId) => {
    console.log('Suspend user:', userId);
    setActiveDropdown(null);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log('Delete user:', userId);
      setActiveDropdown(null);
    }
  };

  const handlePromote = (userId) => {
    console.log('Promote user to admin:', userId);
    setActiveDropdown(null);
  };

  const handleBack = () => {
    // Navigate back to overview or dashboard
    window.history.back();
  };

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      {/* Mobile Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBack}
        className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold transition-all shadow-lg"
      >
        <HiArrowLeft className="w-5 h-5" />
        <span className="text-sm">Back</span>
      </motion.button>

      {/* Header Actions */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>
          <div className="relative w-full sm:w-auto">
            <HiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white shadow-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base flex items-center justify-center gap-2"
        >
          <HiUserAdd className="w-5 h-5" />
          Add User
        </motion.button>
      </div>

      {/* Users Grid - Mobile Card View */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
          >
            <div className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full sm:rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl shadow-lg flex-shrink-0"
                >
                  {user.name.charAt(0).toUpperCase()}
                </motion.div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">
                        {user.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 mt-0.5">
                        <HiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{user.email}</span>
                      </div>
                    </div>

                    {/* Actions Dropdown */}
                    <div className="relative flex-shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <HiDotsVertical className="w-5 h-5 text-gray-600" />
                      </motion.button>

                      {activeDropdown === user.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
                        >
                          {user.role !== 'admin' && (
                            <button
                              onClick={() => handlePromote(user.id)}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-purple-600 hover:bg-purple-50 transition-colors"
                            >
                              <HiShieldCheck className="w-5 h-5" />
                              Promote to Admin
                            </button>
                          )}
                          <button
                            onClick={() => handleSuspend(user.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors ${
                              user.status === 'active'
                                ? 'text-orange-600 hover:bg-orange-50'
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                          >
                            <HiUserRemove className="w-5 h-5" />
                            {user.status === 'active' ? 'Suspend User' : 'Unsuspend User'}
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                          >
                            <HiTrash className="w-5 h-5" />
                            Delete User
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {user.role}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>

                  {/* Dates */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <HiCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                      <span className="font-medium">Joined:</span>
                      <span>{user.joinedDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <HiClock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                      <span className="font-medium">Last Active:</span>
                      <span>{user.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <HiSearch className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          </div>
          <p className="text-base sm:text-lg font-semibold text-gray-700 mb-2">No users found</p>
          <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-white to-blue-50 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 border border-blue-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <HiUserAdd className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Users</p>
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{users.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-white to-green-50 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 border border-green-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <HiShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Active Users</p>
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600">
            {users.filter((u) => u.status === 'active').length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-white to-red-50 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 border border-red-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
              <HiUserRemove className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Suspended</p>
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600">
            {users.filter((u) => u.status === 'suspended').length}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(UsersComponent);
