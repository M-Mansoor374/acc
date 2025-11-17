import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const badgeColors = {
  articles: 'bg-sky-400/15 text-sky-100 border border-sky-400/40',
  tools: 'bg-emerald-400/15 text-emerald-100 border border-emerald-400/40',
  guides: 'bg-violet-400/15 text-violet-100 border border-violet-400/40',
  community: 'bg-amber-400/15 text-amber-100 border border-amber-400/40',
};

const accentGradients = {
  articles: 'from-sky-500 via-blue-500 to-indigo-500',
  tools: 'from-emerald-400 via-teal-400 to-cyan-400',
  guides: 'from-violet-500 via-purple-500 to-fuchsia-500',
  community: 'from-amber-400 via-orange-500 to-rose-500',
};

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

const ResourceCardComponent = ({ resource }) => {
  const {
    title,
    description,
    category,
    link,
    ctaLabel,
    tags = [],
    isFeatured,
    isNew,
    format,
    readingTime,
    author,
    publishedAt,
    engagementScore,
  } = resource;

  const badgeClassName = useMemo(
    () =>
      badgeColors[category] ??
      'bg-slate-500/10 text-slate-200 border border-slate-500/30',
    [category],
  );

  const accent = accentGradients[category] ?? 'from-slate-500 via-slate-600 to-slate-700';

  return (
    <motion.article
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] bg-slate-950/90 p-[1.5px] shadow-[0_25px_60px_-25px_rgba(15,118,255,0.45)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_35px_85px_-30px_rgba(129,140,248,0.55)]"
      initial={{ y: 0 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="absolute inset-[-120px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.12),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[30px] border border-white/5 bg-slate-950/75 p-6 shadow-inner shadow-slate-900/70 backdrop-blur-xl">
        <div className={`pointer-events-none absolute -top-32 right-0 h-48 w-48 rounded-full bg-gradient-to-br ${accent} opacity-30 blur-[140px] transition-all duration-500 group-hover:opacity-60`} />
        <div className="pointer-events-none absolute -bottom-36 left-0 h-40 w-40 rounded-full bg-gradient-to-br from-slate-700/40 via-slate-900/30 to-transparent blur-[150px]" />
        {isFeatured && (
          <span className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-900 shadow-lg shadow-amber-500/40">
            Featured
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
          </span>
        )}
        <div className="relative flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] ${badgeClassName}`}
            >
              {category}
            </span>
            {isNew && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                New
              </span>
            )}
            {format && (
              <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
                {format}
              </span>
            )}
            {readingTime && (
              <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
                {readingTime}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-sm leading-relaxed text-slate-300/90">{description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
            {typeof engagementScore === 'number' && (
              <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-3 py-1 text-indigo-100">
                Engagement <span className="font-bold text-white">{engagementScore}%</span>
              </span>
            )}
            {author && (
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-700/60 bg-slate-900/70 px-3 py-1 text-[10px] text-slate-300">
                Curated by <span className="font-semibold text-white/80">{author}</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700/60 bg-slate-900/70 px-3 py-1 text-[10px] text-slate-400">
              {formatPublishedDate(publishedAt)}
            </span>
          </div>
        </div>
        <div className="relative mt-6 flex flex-col gap-4">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-200 shadow-inner shadow-slate-900/40"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          {ctaLabel && (
            <motion.a
              href={link ?? '#'}
              target={link ? '_blank' : undefined}
              rel={link ? 'noopener noreferrer' : undefined}
              className="relative inline-flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-xl shadow-indigo-500/40 transition-all duration-300 before:absolute before:inset-0 before:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_50%,rgba(255,255,255,0)_100%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{ctaLabel}</span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white shadow shadow-indigo-400/50">
                →
              </span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

ResourceCardComponent.propTypes = {
  resource: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    link: PropTypes.string,
    ctaLabel: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    isFeatured: PropTypes.bool,
    isNew: PropTypes.bool,
    format: PropTypes.string,
    readingTime: PropTypes.string,
    author: PropTypes.string,
    publishedAt: PropTypes.string,
    engagementScore: PropTypes.number,
  }).isRequired,
};

export const ResourceCard = memo(ResourceCardComponent);


