import React, { memo, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';
import { ResourceCard } from '../components/resources/ResourceCard';
import { FeaturedResource } from '../components/resources/FeaturedResource';
import { resourceCategories, resources } from '../data/resources';

const sortResources = (items, option) => {
  const sorted = [...items];
  switch (option) {
    case 'popular':
      return sorted.sort((a, b) => (b.engagementScore ?? 0) - (a.engagementScore ?? 0));
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'recent':
    default:
      return sorted.sort(
        (a, b) => new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime(),
      );
  }
};

const ResourcesPageComponent = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('recent');

  const metrics = useMemo(() => {
    const total = resources.length;
    const newCount = resources.filter((resource) => resource.isNew).length;
    const averageEngagement =
      total === 0
        ? 0
        : Math.round(
            resources.reduce(
              (sum, resource) => sum + (resource.engagementScore ?? 0),
              0,
            ) / total,
          );
    const guides = resources.filter((resource) => resource.category === 'guides').length;
    return [
      { label: 'Resources Live', value: total },
      { label: 'New This Month', value: newCount },
      { label: 'Avg. Engagement', value: `${averageEngagement}%` },
      { label: 'Premium Guides', value: guides },
    ];
  }, []);

  const featuredResources = useMemo(
    () => resources.filter((resource) => resource.isFeatured),
    [],
  );

  const primaryFeatured = useMemo(() => featuredResources.at(0) ?? null, [featuredResources]);

  const filteredResources = useMemo(() => {
    let dataset = [...resources];

    if (activeCategory === 'featured') {
      dataset = dataset.filter((resource) => resource.isFeatured);
    } else if (activeCategory !== 'all') {
      dataset = dataset.filter((resource) => resource.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase();
      dataset = dataset.filter(
        (resource) =>
          resource.title.toLowerCase().includes(lower) ||
          resource.description.toLowerCase().includes(lower) ||
          resource.tags?.some((tag) => tag.toLowerCase().includes(lower)),
      );
    }

    return sortResources(dataset, sortOption);
  }, [activeCategory, searchQuery, sortOption]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <UserHeader />
      <main className="flex flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12">
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 sm:gap-12">
          <div className="relative overflow-hidden rounded-[28px] border border-indigo-500/25 bg-gradient-to-br from-indigo-500/20 via-slate-900 to-slate-950 px-4 py-8 text-center shadow-2xl shadow-indigo-900/40 sm:px-8 sm:py-10">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-indigo-400 blur-3xl" />
              <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-sky-500 blur-3xl" />
            </div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-white"
            >
              Acceptopia Resource Vault
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative mt-5 text-2xl font-bold text-white sm:text-3xl md:text-5xl"
            >
              Strategic tools, expert playbooks, and community drops — curated weekly by our coaches.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base"
            >
              Build momentum with high-impact resources spanning admissions strategy, productivity,
              scholarship funding, and community accountability. Filter, sort, and save your
              favorites for the journey ahead.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200 
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.05,
                  boxShadow: "0 20px 50px rgba(99, 102, 241, 0.3)"
                }}
                className="rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-indigo-950/50 px-4 py-5 text-center shadow-xl shadow-slate-950/40 sm:rounded-3xl cursor-pointer transition-all duration-300 hover:border-indigo-500/40"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {metric.label}
                </p>
                <motion.p 
                  className="mt-2 text-xl font-bold bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent sm:text-2xl"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                >
                  {metric.value}
                </motion.p>
              </motion.div>
            ))}
          </div>

          {primaryFeatured && <FeaturedResource resource={primaryFeatured} />}

          <motion.div
            className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-indigo-950/30 p-4 shadow-xl shadow-slate-950/40 backdrop-blur-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:p-5"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="flex flex-wrap gap-2">
              {resourceCategories.map((category) => (
                <motion.button
                  key={category.id}
                  type="button"
                  className={`rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/50'
                      : 'bg-slate-800/70 text-slate-200 hover:bg-slate-700 hover:text-white'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={activeCategory === category.id ? { 
                    boxShadow: [
                      "0 0 20px rgba(99, 102, 241, 0.4)",
                      "0 0 30px rgba(99, 102, 241, 0.6)",
                      "0 0 20px rgba(99, 102, 241, 0.4)"
                    ]
                  } : {}}
                  transition={{ 
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-1 sm:items-center sm:justify-end">
              <motion.div 
                className="relative flex-1 min-w-[200px]"
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all duration-300 hover:border-slate-700"
                  placeholder="🔍 Search resources..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </motion.div>
              <motion.select
                className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 sm:min-w-[180px] cursor-pointer transition-all duration-300 hover:border-slate-700"
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <option value="recent">📅 Newest First</option>
                <option value="popular">🔥 Most Engaging</option>
                <option value="alphabetical">🔤 A - Z</option>
              </motion.select>
            </div>
          </motion.div>

          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="sync">
              {filteredResources.length === 0 ? (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="col-span-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 text-center text-slate-300 shadow-xl shadow-slate-950/40"
                >
                  No resources matched your filters. Try adjusting the category, search, or sort
                  options to discover more tools.
                </motion.div>
              ) : (
                filteredResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ 
                      duration: 0.4,
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 150
                    }}
                  >
                    <ResourceCard resource={resource} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export const ResourcesPage = memo(ResourcesPageComponent);

