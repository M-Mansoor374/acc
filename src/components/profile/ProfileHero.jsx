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
      className="relative flex flex-col gap-6 sm:gap-8 md:gap-10 overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[36px] border border-indigo-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl shadow-slate-950/60"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-400/30 via-indigo-500/30 to-purple-400/30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gradient-to-br from-sky-400/25 via-indigo-500/25 to-fuchsia-400/25 blur-3xl" />
        <div className="absolute left-1/3 top-6 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-6 sm:gap-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center gap-4 sm:gap-5 text-center sm:flex-row sm:text-left">
          <div className="relative flex-shrink-0">
            <motion.div
              className="relative flex h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 items-center justify-center rounded-2xl sm:rounded-[24px] md:rounded-[28px] bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-[2px] sm:p-[3px] shadow-2xl shadow-indigo-900/40"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-xl sm:rounded-[20px] md:rounded-[24px] bg-slate-900">
                <img
                  src={profile.avatar}
                  alt={`${profile.name} avatar`}
                  className="h-full w-full rounded-xl sm:rounded-[18px] md:rounded-[22px] object-cover"
                />
              </div>
              <motion.span
                className="absolute -bottom-2 sm:-bottom-3 left-1/2 flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 -translate-x-1/2 items-center justify-center rounded-full bg-white text-xs sm:text-sm font-semibold text-slate-900 shadow-lg"
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
              className="absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 rounded-full bg-white p-1.5 sm:p-2 text-slate-900 shadow-lg shadow-white/40 transition hover:bg-slate-100"
              aria-label="Change avatar"
            >
              <HiCamera className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 sm:px-4 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] md:tracking-[0.38em] text-white">
              Acceptopia Mentor
            </div>
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.4rem] font-bold leading-tight text-white break-words">
                {profile.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.35em] text-indigo-200">
                {profile.role}
              </p>
            </div>
            <p className="max-w-xl break-words text-xs sm:text-sm md:text-base leading-relaxed text-indigo-100">
              {profile.headline}
            </p>
            <div className="grid w-full grid-cols-3 gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-2 sm:p-3 text-center text-[10px] sm:text-xs md:text-sm text-indigo-100">
              <div className="flex flex-col gap-0.5 sm:gap-1 rounded-xl sm:rounded-2xl bg-white/5 p-1.5 sm:p-2">
                <span className="font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/70">XP</span>
                <span className="text-base sm:text-lg font-bold text-white">{profile.totalXp ?? 1820}</span>
              </div>
              <div className="flex flex-col gap-0.5 sm:gap-1 rounded-xl sm:rounded-2xl bg-white/5 p-1.5 sm:p-2">
                <span className="font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/70">
                  Streak
                </span>
                <span className="text-base sm:text-lg font-bold text-white">{streakDays}d</span>
              </div>
              <div className="flex flex-col gap-0.5 sm:gap-1 rounded-xl sm:rounded-2xl bg-white/5 p-1.5 sm:p-2">
                <span className="font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/70">
                  Medals
                </span>
                <span className="text-base sm:text-lg font-bold text-white">{medalCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm text-slate-100 lg:max-w-md">
          <div className="inline-flex items-center gap-2 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 min-w-0">
            <HiMail className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-200 flex-shrink-0" />
            <span className="truncate">{profile.email}</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 min-w-0">
            <HiLocationMarker className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-200 flex-shrink-0" />
            <span className="truncate">{profile.location}</span>
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-xl sm:rounded-2xl border px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wide ${availabilityClasses}`}
          >
            <span className="break-words">{profile.availability}</span>
          </span>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
            <motion.button
              type="button"
              onClick={onContact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-white/10 bg-white/10 px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
            >
              <HiMail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Contact
            </motion.button>
            <motion.button
              type="button"
              onClick={onCopyProfile}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-indigo-500/30 bg-indigo-500/20 px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-indigo-100 transition hover:bg-indigo-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
            >
              <HiOutlineExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Copy Profile
            </motion.button>
            <motion.button
              type="button"
              onClick={onToggleAvailability}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-emerald-500/40 bg-emerald-500/15 px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-emerald-100 transition hover:bg-emerald-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
            >
              <HiUserGroup className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="whitespace-nowrap">{profile.isAvailable ? 'Pause Availability' : 'Mark Available'}</span>
            </motion.button>
            <motion.button
              type="button"
              onClick={onEditProfile}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-white/10 bg-white/10 px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
            >
              <HiPencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Edit Profile
            </motion.button>
          </div>
        </div>
      </div>

      <div className="relative grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-4 sm:p-5 text-xs sm:text-sm text-slate-100 shadow-lg shadow-indigo-900/40"
        >
          <h2 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-indigo-100">Bio</h2>
          <p className="mt-2 sm:mt-3 leading-relaxed text-slate-200 text-xs sm:text-sm">{profile.bio}</p>
          <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 rounded-xl sm:rounded-2xl bg-slate-900/60 p-3 sm:p-4 sm:grid-cols-2">
            <div>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/60">
                Journey Progress
              </p>
              <p className="mt-1.5 sm:mt-2 text-xl sm:text-2xl font-bold text-white">{xpPercent}%</p>
              <p className="text-[10px] sm:text-xs text-indigo-100/80">
                {profile.totalXp ?? 1820} / {profile.nextLevelXp ?? 2500} XP
              </p>
            </div>
            <div className="flex items-center justify-start sm:justify-end">
              <motion.div
                className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-slate-900 outline outline-2 outline-offset-2 sm:outline-offset-4 outline-white/10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <svg className="h-16 w-16 sm:h-20 sm:w-20 -rotate-90" viewBox="0 0 36 36">
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
                <span className="absolute text-xs sm:text-sm font-semibold text-white">{xpPercent}%</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 text-xs sm:text-sm text-slate-100 shadow-lg shadow-indigo-900/40"
        >
          <h2 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-indigo-100">
            Focus Areas
          </h2>
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
            {profile.focusAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-slate-950/60 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-wide text-slate-100 shadow-inner shadow-indigo-900/40"
              >
                <span className="inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500" />
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


