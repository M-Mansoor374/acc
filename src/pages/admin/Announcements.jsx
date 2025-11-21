import React, { memo, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiSpeakerphone,
  HiClock,
  HiCheckCircle,
} from 'react-icons/hi';

const AnnouncementsComponent = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'New Simulation Available',
      message: 'Check out our new "Leadership Crisis Management" simulation!',
      type: 'info',
      status: 'active',
      createdDate: '2024-11-15',
      expiryDate: '2024-12-15',
      priority: 'high',
    },
    {
      id: 2,
      title: 'System Maintenance',
      message: 'Scheduled maintenance on November 20th from 2 AM to 4 AM EST.',
      type: 'warning',
      status: 'active',
      createdDate: '2024-11-10',
      expiryDate: '2024-11-20',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Welcome New Users!',
      message: 'Welcome to Acceptopia! Start your learning journey today.',
      type: 'success',
      status: 'active',
      createdDate: '2024-11-01',
      expiryDate: null,
      priority: 'low',
    },
    {
      id: 4,
      title: 'Holiday Schedule',
      message: 'Our platform will have limited support during the holiday season.',
      type: 'info',
      status: 'draft',
      createdDate: '2024-11-18',
      expiryDate: '2024-12-25',
      priority: 'medium',
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const activeAnnouncements = useMemo(
    () => announcements.filter((a) => a.status === 'active'),
    [announcements],
  );

  const draftAnnouncements = useMemo(
    () => announcements.filter((a) => a.status === 'draft'),
    [announcements],
  );

  const getTypeColor = (type) => {
    switch (type) {
      case 'info':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'success':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === id ? { ...a, status: a.status === 'active' ? 'draft' : 'active' } : a,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Announcements</h2>
          <p className="text-sm text-gray-600 mt-1">Manage system-wide announcements and notifications</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <HiPlus className="w-5 h-5 inline mr-2" />
          Create Announcement
        </motion.button>
      </div>

      {/* Active Announcements */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <HiCheckCircle className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Active Announcements</h3>
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            {activeAnnouncements.length}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeAnnouncements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`bg-white rounded-xl shadow-lg border-2 ${getTypeColor(announcement.type)} p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center">
                    <HiSpeakerphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`w-2 h-2 rounded-full ${getPriorityColor(announcement.priority)}`}
                      />
                      <span className="text-xs text-gray-600 capitalize">{announcement.priority} priority</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setEditingId(announcement.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <HiPencil className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(announcement.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <HiTrash className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">{announcement.message}</p>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <HiClock className="w-4 h-4" />
                  <span>Created: {announcement.createdDate}</span>
                </div>
                {announcement.expiryDate && (
                  <span>Expires: {announcement.expiryDate}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        {activeAnnouncements.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-200">
            <p className="text-gray-500">No active announcements</p>
          </div>
        )}
      </div>

      {/* Draft Announcements */}
      {draftAnnouncements.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <HiClock className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Draft Announcements</h3>
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
              {draftAnnouncements.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {draftAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 opacity-75"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <HiSpeakerphone className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                      <span className="text-xs text-gray-500">Draft</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleStatus(announcement.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Activate"
                    >
                      <HiCheckCircle className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditingId(announcement.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <HiPencil className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(announcement.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <HiTrash className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">{announcement.message}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Create/Edit Modal Placeholder */}
      <AnimatePresence>
        {(isCreating || editingId) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => {
              setIsCreating(false);
              setEditingId(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? 'Edit Announcement' : 'Create New Announcement'}
              </h3>
              <p className="text-gray-600 mb-4">Announcement form will be implemented here.</p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(AnnouncementsComponent);









