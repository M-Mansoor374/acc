import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  HiCamera,
  HiLocationMarker,
  HiMail,
  HiOutlineExternalLink,
  HiPencil,
  HiUserGroup,
} from 'react-icons/hi';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const ProfileHeroComponent = ({
  profile,
  xpPercent,
  streakDays,
  medalCount,
  onAvatarChange,
  onContact,
  onCopyProfile,
  onToggleAvailability,
  onEditProfile,
}) => {
  const fileInputRef = useRef(null);

  const triggerFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onAvatarChange(file);
    }
  };

  const availabilityClasses = profile.isAvailable
    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-200'
    : 'border-rose-500/40 bg-rose-500/15 text-rose-200';

  return (
    <motion.section
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative flex flex-col gap-10 overflow-hidden rounded-[36px] border border-indigo-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 p-8 shadow-2xl shadow-slate-950/60 md:p-10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-400/30 via-indigo-500/30 to-purple-400/30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gradient-to-br from-sky-400/25 via-indigo-500/25 to-fuchsia-400/25 blur-3xl" />
        <div className="absolute left-1/3 top-6 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <div className="relative flex-shrink-0">
            <motion.div
              className="relative flex h-32 w-32 items-center justify-center rounded-[28px] bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-[3px] shadow-2xl shadow-indigo-900/40"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-[24px] bg-slate-900">
                <img
                  src={profile.avatar}
                  alt={`${profile.name} avatar`}
                  className="h-[116px] w-[116px] rounded-[22px] object-cover"
                />
              </div>
              <motion.span
                className="absolute -bottom-3 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-900 shadow-lg"
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Lv {profile.level ?? 7}
              </motion.span>
            </motion.div>
            <motion.button
              type="button"
              onClick={triggerFileDialog}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute -bottom-3 -right-3 rounded-full bg-white p-2 text-slate-900 shadow-lg shadow-white/40 transition hover:bg-slate-100"
              aria-label="Change avatar"
            >
              <HiCamera className="h-5 w-5" />
            </motion.button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white sm:tracking-[0.38em]">
              Acceptopia Mentor
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-[2.4rem]">
                {profile.name}
              </h1>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-200 sm:text-xs sm:tracking-[0.35em]">
                {profile.role}
              </p>
            </div>
            <p className="max-w-xl break-words text-sm leading-relaxed text-indigo-100 md:text-base">
              {profile.headline}
            </p>
            <div className="grid w-full grid-cols-3 gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 text-center text-xs text-indigo-100 md:text-sm">
              <div className="flex flex-col gap-1 rounded-2xl bg-white/5 p-2">
                <span className="font-semibold uppercase tracking-[0.25em] text-white/70">XP</span>
                <span className="text-lg font-bold text-white">{profile.totalXp ?? 1820}</span>
              </div>
              <div className="flex flex-col gap-1 rounded-2xl bg-white/5 p-2">
                <span className="font-semibold uppercase tracking-[0.25em] text-white/70">
                  Streak
                </span>
                <span className="text-lg font-bold text-white">{streakDays}d</span>
              </div>
              <div className="flex flex-col gap-1 rounded-2xl bg-white/5 p-2">
                <span className="font-semibold uppercase tracking-[0.25em] text-white/70">
                  Medals
                </span>
                <span className="text-lg font-bold text-white">{medalCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-slate-100 lg:max-w-md">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
            <HiMail className="h-5 w-5 text-indigo-200" />
            <span>{profile.email}</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
            <HiLocationMarker className="h-5 w-5 text-indigo-200" />
            <span>{profile.location}</span>
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-semibold uppercase tracking-wide ${availabilityClasses}`}
          >
            <span className="break-words">{profile.availability}</span>
          </span>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
            <motion.button
              type="button"
              onClick={onContact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
            >
              <HiMail className="h-4 w-4" />
              Contact
            </motion.button>
            <motion.button
              type="button"
              onClick={onCopyProfile}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-indigo-500/30 bg-indigo-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-100 transition hover:bg-indigo-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
            >
              <HiOutlineExternalLink className="h-4 w-4" />
              Copy Profile
            </motion.button>
            <motion.button
              type="button"
              onClick={onToggleAvailability}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-100 transition hover:bg-emerald-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
            >
              <HiUserGroup className="h-4 w-4" />
              {profile.isAvailable ? 'Pause Availability' : 'Mark Available'}
            </motion.button>
            <motion.button
              type="button"
              onClick={onEditProfile}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
            >
              <HiPencil className="h-4 w-4" />
              Edit Profile
            </motion.button>
          </div>
        </div>
      </div>

      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-5 text-sm text-slate-100 shadow-lg shadow-indigo-900/40"
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-100">Bio</h2>
          <p className="mt-3 leading-relaxed text-slate-200">{profile.bio}</p>
          <div className="mt-6 grid gap-4 rounded-2xl bg-slate-900/60 p-4 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
                Journey Progress
              </p>
              <p className="mt-2 text-2xl font-bold text-white">{xpPercent}%</p>
              <p className="text-xs text-indigo-100/80">
                {profile.totalXp ?? 1820} / {profile.nextLevelXp ?? 2500} XP
              </p>
            </div>
            <div className="flex items-center justify-start sm:justify-end">
              <motion.div
                className="relative flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 outline outline-2 outline-offset-4 outline-white/10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <svg className="h-20 w-20 -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#1f2937"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.2"
                  />
                  <motion.path
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${xpPercent}, 100`}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute text-sm font-semibold text-white">{xpPercent}%</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-100 shadow-lg shadow-indigo-900/40"
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-100">
            Focus Areas
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.focusAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950/60 px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-100 shadow-inner shadow-indigo-900/40"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500" />
                {area}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

ProfileHeroComponent.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    role: PropTypes.string,
    headline: PropTypes.string,
    bio: PropTypes.string,
    location: PropTypes.string,
    availability: PropTypes.string,
    isAvailable: PropTypes.bool,
    focusAreas: PropTypes.arrayOf(PropTypes.string),
    level: PropTypes.number,
    totalXp: PropTypes.number,
    nextLevelXp: PropTypes.number,
  }).isRequired,
  xpPercent: PropTypes.number.isRequired,
  streakDays: PropTypes.number.isRequired,
  medalCount: PropTypes.number.isRequired,
  onAvatarChange: PropTypes.func.isRequired,
  onContact: PropTypes.func.isRequired,
  onCopyProfile: PropTypes.func.isRequired,
  onToggleAvailability: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
};

export const ProfileHero = memo(ProfileHeroComponent);


