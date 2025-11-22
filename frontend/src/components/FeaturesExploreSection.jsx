import React, { memo, useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiLightningBolt,
  HiGift,
  HiChartBar,
  HiUsers,
  HiStar,
  HiCalendar,
} from 'react-icons/hi';
import { IoRocketOutline, IoBookmarksOutline } from 'react-icons/io5';

const sectionTransition = { duration: 0.45, ease: 'easeOut' };

const featureCards = Object.freeze([
  {
    id: 'challenges',
    title: 'Adaptive Challenges',
    description: 'Dynamic quests that adjust to your skill level and learning goals.',
    icon: HiLightningBolt,
    accent: 'from-sky-400 via-indigo-400 to-purple-400',
  },
  {
    id: 'rewards',
    title: 'Rewards Hub',
    description: 'Redeem trophies, streak boosters, and custom avatars with XP.',
    icon: HiGift,
    accent: 'from-amber-400 via-orange-400 to-rose-400',
  },
  {
    id: 'progress',
    title: 'Progress Tracker',
    description: 'Visual dashboards surface wins, trends, and actionable next steps.',
    icon: HiChartBar,
    accent: 'from-emerald-400 via-teal-400 to-sky-400',
  },
  {
    id: 'community',
    title: 'Guild Community',
    description: 'Join squads, share insights, and celebrate weekly highlights.',
    icon: HiUsers,
    accent: 'from-fuchsia-400 via-purple-400 to-sky-400',
  },
  {
    id: 'badges',
    title: 'Heroic Badges',
    description: 'Unlock themed badge runs and seasonal cosmetics as you level up.',
    icon: HiStar,
    accent: 'from-indigo-400 via-blue-400 to-cyan-400',
  },
  {
    id: 'events',
    title: 'Live Events',
    description: 'Sync with mentors during sprints, hackathons, and feedback jams.',
    icon: HiCalendar,
    accent: 'from-pink-400 via-rose-400 to-orange-400',
  },
]);

const exploreCategories = Object.freeze([
  { id: 'trending', label: 'Trending' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'users', label: 'Users' },
  { id: 'topics', label: 'Topics' },
]);

const exploreContent = Object.freeze({
  trending: [
    {
      id: 'trend-01',
      title: 'Design Sprint 2.0',
      description: 'Rapid prototype challenge focused on accessibility and UX clarity.',
      ctaLabel: 'Join Sprint',
      gradient: 'from-sky-400 via-indigo-400 to-purple-400',
    },
    {
      id: 'trend-02',
      title: 'AI Storycraft',
      description: 'Collaborate on narrative-driven prompts powered by AI copilots.',
      ctaLabel: 'View Prompt',
      gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    },
  ],
  challenges: [
    {
      id: 'challenge-rocket',
      title: 'Launch Blueprint',
      description: 'Week-long roadmap challenge for aspiring product managers.',
      ctaLabel: 'Start Challenge',
      gradient: 'from-purple-400 via-fuchsia-400 to-sky-400',
    },
    {
      id: 'challenge-ux',
      title: 'UX Quest: Flow Remix',
      description: 'Redesign onboarding flows for faster engagement wins.',
      ctaLabel: 'Remix Now',
      gradient: 'from-amber-400 via-orange-400 to-rose-400',
    },
  ],
  users: [
    {
      id: 'user-01',
      name: 'NovaByte',
      level: 'Aurora Tier',
      avatar: '/avatars/nova.png',
      highlight: 'Completed 12 streak weeks',
    },
    {
      id: 'user-02',
      name: 'PixelPulse',
      level: 'Lumen Tier',
      avatar: '/avatars/pixel.png',
      highlight: 'Top collaborator in September',
    },
    {
      id: 'user-03',
      name: 'CodeMuse',
      level: 'Nebula Tier',
      avatar: '/avatars/muse.png',
      highlight: 'Hosted 8 skill-sharing jams',
    },
  ],
  topics: [
    { id: 'topic-01', label: 'Gamified Learning' },
    { id: 'topic-02', label: 'Design Systems' },
    { id: 'topic-03', label: 'Creative Coding' },
    { id: 'topic-04', label: 'Wellness Sprints' },
    { id: 'topic-05', label: 'Gen-AI Tooling' },
  ],
});

const communityFeed = Object.freeze([
  {
    id: 'feed-01',
    user: 'LunaWave',
    avatar: '/avatars/luna.png',
    badge: 'Mythic Strategist',
    title: 'Wrapped the Accessibility Sprint with a new color token system!',
    ring: 'bg-gradient-to-r from-sky-400 via-purple-400 to-indigo-400',
  },
  {
    id: 'feed-02',
    user: 'AtlasCraft',
    avatar: '/avatars/atlas.png',
    badge: 'Vault Maker',
    title: 'Shared a dynamic resource kit for cohort retrospectives.',
    ring: 'bg-gradient-to-r from-fuchsia-400 via-rose-400 to-orange-400',
  },
  {
    id: 'feed-03',
    user: 'EchoBloom',
    avatar: '/avatars/echo.png',
    badge: 'Creative Bard',
    title: 'Collaborative story deck hit 500 votes in the gallery!',
    ring: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400',
  },
  {
    id: 'feed-04',
    user: 'QuantumFox',
    avatar: '/avatars/fox.png',
    badge: 'Challenge Architect',
    title: 'Published five micro-challenges for focus week.',
    ring: 'bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400',
  },
  {
    id: 'feed-05',
    user: 'MiraGlow',
    avatar: '/avatars/mira.png',
    badge: 'Community Catalyst',
    title: 'Facilitated the latest duel-mode ideation session.',
    ring: 'bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400',
  },
  {
    id: 'feed-06',
    user: 'ZenJax',
    avatar: '/avatars/zen.png',
    badge: 'Momentum Sage',
    title: 'Unlocked a 21-day flow streak with daily reflections.',
    ring: 'bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400',
  },
]);

const leaderboard = Object.freeze([
  { id: 'rank-01', rank: 1, name: 'NovaByte', score: '12,480', status: 'Streak Master' },
  { id: 'rank-02', rank: 2, name: 'EchoBloom', score: '11,905', status: 'Inspiration Curator' },
  { id: 'rank-03', rank: 3, name: 'AtlasCraft', score: '11,720', status: 'Collaboration Lead' },
  { id: 'rank-04', rank: 4, name: 'QuantumFox', score: '11,210', status: 'Challenge Architect' },
]);

const cardHoverClasses =
  'transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/20 focus-visible:-translate-y-1 focus-visible:shadow-xl focus-visible:shadow-sky-500/20';

const FeaturesExploreSectionComponent = () => {
  const [activeTab, setActiveTab] = useState('trending');

  const handleTabChange = useCallback((categoryId) => {
    setActiveTab(categoryId);
  }, []);

  const tabContent = useMemo(() => exploreContent[activeTab] ?? [], [activeTab]);
  const cardVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 18, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1, transition: sectionTransition },
      exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.2, ease: 'easeIn' } },
    }),
    [],
  );

  return (
    <div className="flex flex-col gap-24 bg-gradient-to-br from-white via-slate-50 to-sky-50 px-6 py-24 text-slate-900 sm:px-10 lg:px-16">
      {/* Intro / Hero Section */}
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center">
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-600"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={sectionTransition}
        >
          Discover Acceptopia
        </motion.span>
        <motion.h1
          className="text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ ...sectionTransition, delay: 0.05 }}
        >
          Where Growth Meets Gamification
        </motion.h1>
        <motion.p
          className="max-w-3xl text-base leading-relaxed text-slate-500 sm:text-lg"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ ...sectionTransition, delay: 0.1 }}
        >
          Explore a universe of adaptive challenges, vibrant communities, and progress rituals designed to elevate every
          learner&apos;s journey.
        </motion.p>
        <motion.button
          type="button"
          className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-indigo-400/40 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ ...sectionTransition, delay: 0.15 }}
        >
          Start Exploring
          <IoRocketOutline className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </section>

      {/* Feature Highlights */}
      <section aria-labelledby="feature-highlights-heading" className="flex flex-col gap-10">
        <div className="flex flex-col gap-3 text-center">
          <motion.h2
            id="feature-highlights-heading"
            className="text-2xl font-semibold text-slate-900 sm:text-3xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={sectionTransition}
          >
            Feature Highlights
          </motion.h2>
          <motion.p
            className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-500 sm:text-base"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ ...sectionTransition, delay: 0.05 }}
          >
            From lightning-fast quests to collaborative guilds, Acceptopia amplifies learning with vibrant gamified
            experiences.
          </motion.p>
        </div>
        <motion.div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ ...sectionTransition, delay: 0.1 }}
        >
          {featureCards.map(({ id, title, description, icon: Icon, accent }) => (
            <motion.article
              key={id}
              variants={{
                rest: { y: 0, scale: 1 },
                hover: { y: -8, scale: 1.02 },
              }}
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.99 }}
              className="group relative overflow-hidden rounded-[30px] bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-purple-500/15 p-[1.4px] shadow-[0_25px_60px_-25px_rgba(59,130,246,0.35)] transition-all duration-300"
              aria-label={title}
            >
              <div className="relative h-full rounded-[26px] border border-white/60 bg-white/95 p-6 shadow-inner shadow-sky-200/40">
                <div className={`pointer-events-none absolute -top-24 right-0 h-44 w-44 rounded-full bg-gradient-to-br ${accent} opacity-60 blur-[120px] transition-opacity duration-300 group-hover:opacity-80`} />
                <div className="relative flex h-full flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900/90 shadow-xl shadow-slate-900/40">
                      <span className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/15 via-white/5 to-transparent" />
                      <span className={`relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg shadow-sky-300/40 transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="inline-flex h-10 items-center rounded-full border border-slate-200 bg-slate-50/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500">
                      Acceptopia Lens
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{description}</p>
                  <div className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-slate-500 transition-colors duration-300 group-hover:text-slate-700">
                    Learn More
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 text-white shadow shadow-indigo-400/40">
                      <span className="text-[10px]">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Explore Section */}
      <section aria-labelledby="explore-heading" className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 text-center">
          <motion.h2
            id="explore-heading"
            className="text-2xl font-semibold text-slate-900 sm:text-3xl"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={sectionTransition}
          >
            Explore What&apos;s Pulsing Right Now
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...sectionTransition, delay: 0.05 }}
          >
            Switch between trending challenges, rising creators, and the topics fueling the Acceptopia universe.
          </motion.p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {exploreCategories.map(({ id, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleTabChange(id)}
                className={`relative inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
                  isActive
                    ? 'border-transparent bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-400/40'
                    : 'border-sky-200 bg-white/80 text-sky-600 hover:border-sky-300 hover:bg-sky-50'
                }`}
                aria-pressed={isActive}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="relative rounded-3xl border border-sky-100 bg-white/80 p-6 shadow-lg shadow-sky-200/40 backdrop-blur">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} {...cardVariants} className="grid gap-6 md:grid-cols-2">
              {tabContent.map((item) => {
                if (activeTab === 'users') {
                  return (
                    <article
                      key={item.id}
                      className={`flex items-center gap-4 rounded-3xl bg-white/90 p-5 shadow-md shadow-sky-100/50 backdrop-blur ${cardHoverClasses}`}
                    >
                      <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-sky-50">
                        <span className="absolute inset-0 rounded-full border border-dashed border-sky-200" aria-hidden="true" />
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 text-sm font-semibold text-white">
                          {item.name.slice(0, 2)}
                        </span>
                      </span>
                      <div className="flex flex-col">
                        <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">{item.level}</p>
                        <p className="text-sm text-slate-500">{item.highlight}</p>
                      </div>
                    </article>
                  );
                }

                if (activeTab === 'topics') {
                  return (
                    <span
                      key={item.id}
                      className="inline-flex items-center justify-center rounded-2xl border border-sky-200 bg-white/80 px-4 py-3 text-sm font-semibold text-sky-600 shadow-sm shadow-sky-100/50"
                    >
                      <IoBookmarksOutline className="mr-2 h-4 w-4 text-sky-500" aria-hidden="true" />
                      {item.label}
                    </span>
                  );
                }

                return (
                  <article
                    key={item.id}
                    className={`flex flex-col gap-4 rounded-3xl bg-white/90 p-5 shadow-md shadow-sky-100/50 backdrop-blur ${cardHoverClasses}`}
                  >
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-md shadow-sky-300/40`}>
                      <HiOutlineLightningBolt className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-500">{item.description}</p>
                    </div>
                    {item.ctaLabel && (
                      <button
                        type="button"
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-md shadow-indigo-400/40 transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                      >
                        {item.ctaLabel}
                      </button>
                    )}
                  </article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Community Feed Preview */}
      <section aria-labelledby="community-feed-heading" className="flex flex-col gap-8">
        <div className="flex flex-col gap-3 text-center">
          <motion.h2
            id="community-feed-heading"
            className="text-2xl font-semibold text-slate-900 sm:text-3xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={sectionTransition}
          >
            Community Feed
          </motion.h2>
          <motion.p
            className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-500 sm:text-base"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ ...sectionTransition, delay: 0.05 }}
          >
            Celebrate what teammates are shipping, exploring, and sharing across the Acceptopia network.
          </motion.p>
        </div>
        <motion.div
          className="grid gap-6 lg:grid-cols-3"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ ...sectionTransition, delay: 0.08 }}
        >
          {communityFeed.map(({ id, user, badge, title, ring }) => (
            <article
              key={id}
              className={`flex h-full flex-col gap-4 rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-lg shadow-sky-100/40 backdrop-blur ${cardHoverClasses}`}
            >
              <div className="flex items-center gap-4">
                <span className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full ${ring}`}>
                  <span className="absolute inset-1 rounded-full bg-white" />
                  <span className="relative h-9 w-9 rounded-full bg-slate-100 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    <span className="absolute inset-0 flex items-center justify-center">{user.slice(0, 2)}</span>
                  </span>
                </span>
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-slate-900">{user}</h3>
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">{badge}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">{title}</p>
            </article>
          ))}
        </motion.div>
      </section>

      {/* Leaderboard Preview */}
      <section aria-labelledby="leaderboard-heading" className="flex flex-col gap-6 rounded-3xl border border-sky-100 bg-white/90 p-8 shadow-xl shadow-sky-200/40 backdrop-blur">
        <motion.div
          className="flex flex-col gap-2 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={sectionTransition}
        >
          <h2 id="leaderboard-heading" className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Stellar Leaderboard
          </h2>
          <p className="text-sm text-slate-500 sm:text-base">Meet the innovators lighting up this season’s rankings.</p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-4">
          {leaderboard.map(({ id, rank, name, score, status }) => (
            <motion.article
              key={id}
              className="flex flex-col items-center gap-3 rounded-3xl border border-sky-100 bg-white/95 p-6 text-center shadow-md shadow-sky-100/50"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ ...sectionTransition, delay: rank * 0.05 }}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 text-lg font-bold text-white shadow-md shadow-indigo-300/40">
                #{rank}
              </span>
              <h3 className="text-base font-semibold text-slate-900">{name}</h3>
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">{status}</p>
              <p className="text-sm font-semibold text-slate-600">XP {score}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 p-[1px] shadow-2xl shadow-sky-400/40">
        <div className="relative flex flex-col items-center gap-6 rounded-[22px] bg-slate-900/90 px-8 py-16 text-center text-white sm:px-12">
          <motion.h2
            className="text-2xl font-semibold sm:text-3xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={sectionTransition}
          >
            Join the community and start your first challenge!
          </motion.h2>
          <motion.p
            className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ ...sectionTransition, delay: 0.05 }}
          >
            Acceptopia is buzzing with collaborative quests, spotlight sessions, and new learning adventures ready for you to
            explore.
          </motion.p>
          <motion.button
            type="button"
            className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 shadow-lg shadow-slate-900/20 transition hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ ...sectionTransition, delay: 0.1 }}
          >
            Explore Now
          </motion.button>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_transparent_65%)]" aria-hidden="true" />
      </section>
    </div>
  );
};

export const FeaturesExploreSection = memo(FeaturesExploreSectionComponent);



