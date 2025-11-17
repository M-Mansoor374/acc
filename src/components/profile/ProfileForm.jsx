import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const formFields = [
  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'name@example.com' },
  { id: 'role', label: 'Role / Title', type: 'text', placeholder: 'e.g., Product Designer' },
  { id: 'location', label: 'Location', type: 'text', placeholder: 'City, Country' },
  { id: 'headline', label: 'Profile Headline', type: 'text', placeholder: 'Describe your focus' },
  {
    id: 'availability',
    label: 'Availability Message',
    type: 'text',
    placeholder: 'Share your current availability',
  },
];

const ProfileFormComponent = ({ formState, errors, onChange, onSubmit, onCancel, isSubmitting }) => (
  <motion.form
    onSubmit={onSubmit}
    className="flex flex-col gap-7 rounded-[32px] border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-950 to-indigo-950/80 p-8 shadow-2xl shadow-slate-950/50 md:p-9"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    noValidate
  >
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-200 sm:tracking-[0.35em]">
          Control Panel
        </div>
        <h2 className="text-2xl font-semibold leading-tight text-white md:text-[1.9rem]">
          Your Public Profile
        </h2>
        <p className="max-w-xl break-words text-sm text-indigo-100/80 md:text-base">
          Fine-tune how learners see you on Acceptopia. Changes stay local until you hit save.
        </p>
      </div>
      <div className="flex gap-3">
        <motion.button
          type="button"
          onClick={onCancel}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          Revert
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 via-indigo-500 to-purple-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-indigo-500/40 transition disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </motion.button>
      </div>
    </div>

    <div className="grid gap-5 md:grid-cols-2">
      {formFields.map((field) => (
        <motion.div key={field.id} whileHover={{ scale: 1.01 }} className="flex flex-col gap-2">
          <label htmlFor={field.id} className="text-xs font-semibold uppercase tracking-wide text-slate-300">
            {field.label}
          </label>
          <input
            id={field.id}
            name={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={formState[field.id]}
            onChange={(event) => onChange(field.id, event.target.value)}
            className={`rounded-2xl border px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
              errors[field.id]
                ? 'border-rose-500/60 bg-rose-500/10'
                : 'border-slate-800 bg-slate-900/60'
            }`}
          />
          {errors[field.id] && (
            <span className="text-xs font-medium text-rose-300">{errors[field.id]}</span>
          )}
        </motion.div>
      ))}
    </div>

    <motion.div whileHover={{ scale: 1.01 }} className="flex flex-col gap-2">
      <label htmlFor="bio" className="text-xs font-semibold uppercase tracking-wide text-slate-300">
        Bio
      </label>
      <textarea
        id="bio"
        name="bio"
        rows={4}
        value={formState.bio}
        placeholder="Share your mission, approach, or current goals..."
        onChange={(event) => onChange('bio', event.target.value)}
        className={`rounded-2xl border px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
          errors.bio ? 'border-rose-500/60 bg-rose-500/10' : 'border-slate-800 bg-slate-900/60'
        }`}
      />
      {errors.bio && <span className="text-xs font-medium text-rose-300">{errors.bio}</span>}
    </motion.div>

    <motion.div whileHover={{ scale: 1.01 }} className="flex flex-col gap-2">
      <label
        htmlFor="focusAreasInput"
        className="text-xs font-semibold uppercase tracking-wide text-slate-300"
      >
        Focus Areas
      </label>
      <input
        id="focusAreasInput"
        name="focusAreasInput"
        type="text"
        placeholder="e.g., Gamification, UX Research, Accessibility"
        value={formState.focusAreasInput}
        onChange={(event) => onChange('focusAreasInput', event.target.value)}
        className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
      />
      <span className="text-xs text-slate-500">
        Separate each area with a comma. These appear as tags on your public profile.
      </span>
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3"
    >
      <div>
        <p className="text-sm font-semibold text-white">Availability Toggle</p>
        <p className="text-xs text-slate-400">
          Control if you&apos;re currently taking on new mentees or collaborations.
        </p>
      </div>
      <motion.button
        type="button"
        onClick={() => onChange('isAvailable', !formState.isAvailable)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-xs font-semibold uppercase tracking-wide transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
          formState.isAvailable
            ? 'border border-emerald-500/60 bg-emerald-500/15 text-emerald-100'
            : 'border border-rose-500/60 bg-rose-500/15 text-rose-200'
        }`}
      >
        {formState.isAvailable ? 'Available' : 'Busy'}
      </motion.button>
    </motion.div>
  </motion.form>
);

ProfileFormComponent.propTypes = {
  formState: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    location: PropTypes.string,
    headline: PropTypes.string,
    bio: PropTypes.string,
    availability: PropTypes.string,
    focusAreasInput: PropTypes.string,
    isAvailable: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

ProfileFormComponent.defaultProps = {
  isSubmitting: false,
};

export const ProfileForm = memo(ProfileFormComponent);


