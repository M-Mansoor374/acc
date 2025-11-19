import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from '../../login/Header';
import Footer from '../../components/Footer';
import { ProfileHero } from '../../components/profile/ProfileHero';
import { ProfileForm } from '../../components/profile/ProfileForm';
import { GamificationSummary } from '../../components/profile/GamificationSummary';
import { motion, AnimatePresence } from 'framer-motion';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialProfile = {
  name: 'Avery Johnson',
  email: 'avery.johnson@acceptopia.com',
  role: 'Senior Learning Architect',
  location: 'San Francisco, USA',
  headline: 'Designing joyful learning experiences for ambitious students worldwide.',
  bio: 'Acceptopia coach focused on gamification, design thinking, and accessibility-first product strategy. I help learners translate curiosity into momentum.',
  avatar: 'https://i.pravatar.cc/240?img=47',
  focusAreas: ['Gamification', 'UX Research', 'Accessibility', 'Motion Design'],
  availability: '🚀 Open for 2 new mentees',
  isAvailable: true,
  profileUrl: 'https://acceptopia.com/members/avery',
  level: 7,
  totalXp: 1820,
  nextLevelXp: 2500,
};

const initialGamification = {
  xp: 1820,
  nextLevelXp: 2500,
  level: 7,
  streak: 14,
  maxStreak: 21,
  medals: [
    {
      id: 'mentor-mode',
      label: 'Mentor Mode',
      description: 'Support 10 students with feedback in one week.',
      progress: 80,
    },
    {
      id: 'streak-master',
      label: 'Streak Master',
      description: 'Maintain a 21-day learning streak.',
      progress: 66,
    },
    {
      id: 'design-visionary',
      label: 'Design Visionary',
      description: 'Ship 3 UX case studies in the design lab.',
      progress: 45,
    },
  ],
};

const ProfilePageComponent = () => {
  const [profile, setProfile] = useState(initialProfile);
  const initialFormState = useMemo(
    () => ({
      ...initialProfile,
      focusAreasInput: initialProfile.focusAreas.join(', '),
    }),
    [],
  );
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const gamification = useMemo(() => initialGamification, []);
  const formSectionRef = useRef(null);
  const completedMedals = useMemo(
    () => gamification.medals.filter((medal) => medal.progress >= 100).length,
    [gamification.medals],
  );
  const xpPercent = useMemo(() => {
    if (!formState.nextLevelXp) {
      return 0;
    }
    return Math.min(100, Math.round((formState.totalXp / formState.nextLevelXp) * 100));
  }, [formState.totalXp, formState.nextLevelXp]);

  const validate = useCallback(() => {
    const nextErrors = {};
    if (!formState.name.trim()) {
      nextErrors.name = 'Name is required.';
    }
    if (!formState.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!emailPattern.test(formState.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!formState.headline.trim()) {
      nextErrors.headline = 'Headline cannot be empty.';
    }
    if (!formState.bio.trim()) {
      nextErrors.bio = 'Let learners know what drives you.';
    }
    return nextErrors;
  }, [formState.bio, formState.email, formState.headline, formState.name]);

  const handleFieldChange = useCallback((field, value) => {
    setFormState((prev) => {
      if (field === 'isAvailable') {
        const availabilityMessage = value
          ? '🚀 Open for 2 new mentees'
          : '⏳ Currently at capacity';
        return {
          ...prev,
          isAvailable: value,
          availability: availabilityMessage,
        };
      }
      if (field === 'focusAreasInput') {
        return {
          ...prev,
          focusAreasInput: value,
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  }, []);

  const handleAvatarChange = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        setFormState((prev) => ({ ...prev, avatar: dataUrl }));
        setSaveStatus('Avatar updated. Remember to save changes.');
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleCancel = useCallback(() => {
    setFormState({
      ...profile,
      focusAreasInput: profile.focusAreas.join(', '),
    });
    setErrors({});
    setSaveStatus('Changes reverted.');
  }, [profile]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsSubmitting(true);
      const validation = validate();
      setErrors(validation);
      if (Object.keys(validation).length > 0) {
        setIsSubmitting(false);
        return;
      }
      const focusAreasArray = formState.focusAreasInput
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
      const { focusAreasInput, ...rest } = formState;
      const updatedProfile = {
        ...profile,
        ...rest,
        focusAreas: focusAreasArray,
        totalXp: rest.totalXp ?? profile.totalXp,
        nextLevelXp: rest.nextLevelXp ?? profile.nextLevelXp,
        level: rest.level ?? profile.level,
      };
      setProfile(updatedProfile);
      setFormState({
        ...updatedProfile,
        focusAreasInput: focusAreasArray.join(', '),
      });
      setSaveStatus('Profile updated successfully.');
      setIsSubmitting(false);
    },
    [formState, profile, validate],
  );

  useEffect(() => {
    if (!saveStatus) {
      return undefined;
    }
    const timer = window.setTimeout(() => setSaveStatus(null), 3200);
    return () => window.clearTimeout(timer);
  }, [saveStatus]);

  const handleContact = useCallback(() => {
    window.location.href = `mailto:${formState.email}?subject=Hello ${encodeURIComponent(
      formState.name,
    )}&body=Hi ${formState.name.split(' ')[0]},`;
    setSaveStatus('Opening your mail client to contact the mentor.');
  }, [formState.email, formState.name]);

  const handleCopyProfile = useCallback(async () => {
    const shareUrl =
      formState.profileUrl || `${window.location.origin.replace(/\/$/, '')}/profile`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setSaveStatus('Profile link copied to clipboard.');
    } catch (error) {
      setSaveStatus('Unable to copy link. Try manually sharing the URL.');
    }
  }, [formState.profileUrl]);

  const handleToggleAvailability = useCallback(() => {
    setFormState((prev) => {
      const isAvailable = !prev.isAvailable;
      const availability = isAvailable
        ? '🚀 Open for 2 new mentees'
        : '⏳ Currently at capacity';
      setSaveStatus(
        isAvailable
          ? 'Availability toggled on. Save to publish this change.'
          : 'Availability toggled off. Save to publish this change.',
      );
      return {
        ...prev,
        isAvailable,
        availability,
      };
    });
  }, []);

  const handleEditProfile = useCallback(() => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setSaveStatus('Scrolling to profile settings.');
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <Header />
      <main className="flex flex-1 flex-col gap-10 px-6 py-12">
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <ProfileHero
            profile={formState}
            xpPercent={xpPercent}
            streakDays={gamification.streak}
            medalCount={completedMedals}
            onAvatarChange={handleAvatarChange}
            onContact={handleContact}
            onCopyProfile={handleCopyProfile}
            onToggleAvailability={handleToggleAvailability}
            onEditProfile={handleEditProfile}
          />

          <div
            ref={formSectionRef}
            className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
          >
            <ProfileForm
              formState={formState}
              errors={errors}
              onChange={handleFieldChange}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
            />
            <GamificationSummary gamification={gamification} />
          </div>
        </section>
      </main>

      <AnimatePresence>
        {saveStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none fixed bottom-6 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 rounded-2xl border border-indigo-400/40 bg-indigo-500/20 px-5 py-3 text-center text-sm font-semibold text-indigo-100 shadow-lg shadow-indigo-900/50 backdrop-blur-md"
          >
            {saveStatus}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export const Profile = memo(ProfilePageComponent);


