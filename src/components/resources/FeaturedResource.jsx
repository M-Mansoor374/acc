import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const formatPublishedDate = (dateString) => {
  if (!dateString) {
    return '—';
  }
  try {
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
};

const FeaturedResourceComponent = ({ resource }) => (
  <motion.div
    className="relative flex flex-col gap-6 overflow-hidden rounded-[32px] border border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-indigo-900/50 md:flex-row md:items-center"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    <div className="absolute inset-0 -z-10 opacity-40">
      <div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-indigo-500 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-sky-500 blur-3xl" />
    </div>
    <div className="flex-1 space-y-4">
      <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white">
        Featured Drop
      </span>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white md:text-4xl">{resource.title}</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
          {resource.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-200">
        <span className="rounded-full bg-white/10 px-3 py-1">{resource.format}</span>
        <span className="rounded-full bg-white/10 px-3 py-1">{resource.readingTime}</span>
        <span className="rounded-full bg-white/10 px-3 py-1">
          Engagement {resource.engagementScore}%
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200/80">
        <span>Curated by {resource.author}</span>
        <span>Published {formatPublishedDate(resource.publishedAt)}</span>
      </div>
      {resource.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-100"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
    <motion.a
      href={resource.link ?? '#'}
      target={resource.link ? '_blank' : undefined}
      rel={resource.link ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex w-full max-w-[220px] items-center justify-center rounded-2xl bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 shadow-lg shadow-white/20 transition hover:bg-white"
    >
      {resource.ctaLabel ?? 'Explore'}
    </motion.a>
  </motion.div>
);

FeaturedResourceComponent.propTypes = {
  resource: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    format: PropTypes.string,
    readingTime: PropTypes.string,
    engagementScore: PropTypes.number,
    author: PropTypes.string,
    publishedAt: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    link: PropTypes.string,
    ctaLabel: PropTypes.string,
  }).isRequired,
};

export const FeaturedResource = memo(FeaturedResourceComponent);


