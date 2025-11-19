import React, { memo, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  HiSearch,
  HiPlus,
  HiPencil,
  HiTrash,
  HiFilter,
  HiDocument,
  HiPhotograph,
  HiVideoCamera,
} from 'react-icons/hi';

const ResourcesComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock resource data - replace with actual API call
  const resources = useMemo(
    () => [
      {
        id: 1,
        title: 'Introduction to React',
        category: 'Tutorial',
        type: 'PDF',
        size: '2.5 MB',
        uploadDate: '2024-10-15',
        downloads: 1247,
        icon: HiDocument,
      },
      {
        id: 2,
        title: 'Design Principles Guide',
        category: 'Guide',
        type: 'PDF',
        size: '1.8 MB',
        uploadDate: '2024-10-10',
        downloads: 892,
        icon: HiDocument,
      },
      {
        id: 3,
        title: 'UI Components Showcase',
        category: 'Reference',
        type: 'Image',
        size: '5.2 MB',
        uploadDate: '2024-09-20',
        downloads: 634,
        icon: HiPhotograph,
      },
      {
        id: 4,
        title: 'Advanced JavaScript Course',
        category: 'Course',
        type: 'Video',
        size: '125 MB',
        uploadDate: '2024-09-15',
        downloads: 2156,
        icon: HiVideoCamera,
      },
    ],
    [],
  );

  const categories = ['all', 'Tutorial', 'Guide', 'Reference', 'Course'];

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterCategory === 'all' || resource.category === filterCategory;
      return matchesSearch && matchesFilter;
    });
  }, [resources, searchQuery, filterCategory]);

  const handleEdit = (resourceId) => {
    console.log('Edit resource:', resourceId);
  };

  const handleDelete = (resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      console.log('Delete resource:', resourceId);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'PDF':
        return 'bg-red-100 text-red-700';
      case 'Image':
        return 'bg-blue-100 text-blue-700';
      case 'Video':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <HiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <HiPlus className="w-5 h-5 inline mr-2" />
          Upload Resource
        </motion.button>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(resource.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <HiPencil className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(resource.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <HiTrash className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900">{resource.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium text-gray-900">{resource.size}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Downloads:</span>
                  <span className="font-medium text-gray-900">{resource.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Uploaded:</span>
                  <span className="font-medium text-gray-900">{resource.uploadDate}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-200">
          <p className="text-gray-500">No resources found</p>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-2">Total Resources</p>
          <p className="text-3xl font-bold text-gray-900">{resources.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-2">Total Downloads</p>
          <p className="text-3xl font-bold text-blue-600">
            {resources.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-2">PDF Files</p>
          <p className="text-3xl font-bold text-red-600">
            {resources.filter((r) => r.type === 'PDF').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-2">Videos</p>
          <p className="text-3xl font-bold text-purple-600">
            {resources.filter((r) => r.type === 'Video').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(ResourcesComponent);





