import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { HiCheckCircle } from 'react-icons/hi';
import GuestHeader from '../components/GuestHeader';

const inputBaseClasses =
  'w-full rounded-[22px] bg-white/95 px-4 py-3 text-sm text-slate-700 shadow-lg shadow-sky-900/5 outline-none transition focus:shadow-sky-500/25 focus:ring-0';

const SignupPageComponent = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const flipTimeoutRef = useRef(null);

  const emailPattern = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validate = useCallback(() => {
    const errors = {};
    if (!formValues.fullName.trim()) {
      errors.fullName = 'Your full name is required.';
    }
    if (!formValues.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!emailPattern.test(formValues.email.trim())) {
      errors.email = 'Enter a valid email address.';
    }
    if (!formValues.password.trim()) {
      errors.password = 'Create a password.';
    } else if (formValues.password.trim().length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    if (!formValues.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm your password.';
    } else if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    return errors;
  }, [emailPattern, formValues.confirmPassword, formValues.email, formValues.fullName, formValues.password]);

  const isDisabled = useMemo(
    () => isSubmitting || Object.values(formValues).some((value) => value.trim() === ''),
    [formValues, isSubmitting],
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const errors = validate();
      setFormErrors(errors);
      if (Object.keys(errors).length > 0) {
        return;
      }
      setIsSubmitting(true);
      window.setTimeout(() => {
        sessionStorage.setItem('acceptopia-authenticated', 'true');
        setIsSubmitting(false);
        setIsSuccess(true);
        window.setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 800);
      }, 900);
    },
    [navigate, validate],
  );

  const handleFlipToPortal = useCallback(() => {
    if (isFlipping || isSubmitting) {
      return;
    }
    setIsFlipping(true);
    flipTimeoutRef.current = window.setTimeout(() => {
      navigate('/portal');
    }, 480);
  }, [isFlipping, isSubmitting, navigate]);

  useEffect(() => {
    if (sessionStorage.getItem('acceptopia-authenticated') === 'true') {
      navigate('/dashboard', { replace: true });
      return () => {
        if (flipTimeoutRef.current) {
          window.clearTimeout(flipTimeoutRef.current);
        }
      };
    }
    return () => {
      if (flipTimeoutRef.current) {
        window.clearTimeout(flipTimeoutRef.current);
      }
    };
  }, [navigate]);

  const outerShellStyle = useMemo(
    () => (isFlipping ? { transform: 'rotateY(-180deg) translateZ(18px)', boxShadow: '0 50px 120px rgba(56, 189, 248, 0.45)' } : undefined),
    [isFlipping],
  );

  const innerShellStyle = useMemo(
    () => (isFlipping ? { transform: 'translateZ(24px) rotateY(180deg)' } : undefined),
    [isFlipping],
  );

  return (
    <div className="flex min-h-screen flex-col bg-sky-50">
      <GuestHeader />
      <main className="flex flex-1 flex-col bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <section className="relative flex flex-1 items-center justify-center px-4 py-16 sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),transparent_55%)]" />
          <div className="relative w-full max-w-xl [perspective:1600px]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-200/60 via-transparent to-sky-400/40 blur-3xl" aria-hidden="true" />
            <div
              className="relative flex min-h-[40rem] flex-col justify-center gap-10 rounded-[34px] bg-gradient-to-br from-sky-400/70 via-indigo-400/60 to-purple-400/70 p-[1px] shadow-2xl shadow-sky-200/70 transition-all duration-700 ease-out [transform-style:preserve-3d] [transform:rotateY(0deg)]"
              style={outerShellStyle}
            >
              <div className="pointer-events-none absolute -top-12 right-12 hidden h-28 w-28 rounded-full bg-cyan-400/60 blur-3xl sm:block" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-14 left-10 hidden h-32 w-32 rounded-full bg-purple-500/50 blur-[120px] sm:block" aria-hidden="true" />
              <div
                className="relative flex min-h-[39.5rem] flex-col justify-between gap-8 rounded-[32px] border border-white/20 bg-white/90 p-10 backdrop-blur-xl transition-all duration-500 ease-out sm:p-14 [transform-style:preserve-3d] [transform:translateZ(0px)]"
                style={innerShellStyle}
              >
                <motion.div 
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-purple-500 to-indigo-500 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-lg shadow-purple-500/25">
                    {isSuccess ? '🎉 Welcome!' : 'Welcome'}
                  </span>
                </motion.div>
                <motion.form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-7 rounded-3xl border border-sky-100/50 bg-white/95 p-8 shadow-inner shadow-sky-200/60 backdrop-blur sm:p-10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <motion.label 
                    className="flex flex-col gap-2 text-sm font-semibold text-slate-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                  >
                    <span>Full Name</span>
                    <div className={`rounded-[26px] bg-gradient-to-r from-sky-200 via-indigo-200 to-purple-200 p-[1px] shadow-inner shadow-sky-300/40 transition-all duration-300 ${focusedField === 'fullName' ? 'ring-2 ring-sky-400 ring-offset-2' : ''}`}>
                      <input
                        name="fullName"
                        type="text"
                        value={formValues.fullName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('fullName')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="e.g. Avery Johnson"
                        className={inputBaseClasses}
                      />
                    </div>
                    <AnimatePresence mode="wait">
                      {formErrors.fullName && (
                        <motion.span 
                          className="text-xs font-semibold text-rose-500 flex items-center gap-1"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-500" />
                          {formErrors.fullName}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.label>

                  <motion.label 
                    className="flex flex-col gap-2 text-sm font-semibold text-slate-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                  >
                    <span>School Email</span>
                    <div className={`rounded-[26px] bg-gradient-to-r from-purple-200 via-sky-200 to-indigo-200 p-[1px] shadow-inner shadow-purple-300/40 transition-all duration-300 ${focusedField === 'email' ? 'ring-2 ring-purple-400 ring-offset-2' : ''}`}>
                      <input
                        name="email"
                        type="email"
                        value={formValues.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="name@greenfieldacademy.edu"
                        className={inputBaseClasses}
                      />
                    </div>
                    <AnimatePresence mode="wait">
                      {formErrors.email && (
                        <motion.span 
                          className="text-xs font-semibold text-rose-500 flex items-center gap-1"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-500" />
                          {formErrors.email}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.label>

                  <motion.label 
                    className="flex flex-col gap-2 text-sm font-semibold text-slate-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.45 }}
                  >
                    <span>Password</span>
                    <div className={`rounded-[26px] bg-gradient-to-r from-sky-200 via-indigo-200 to-purple-200 p-[1px] shadow-inner shadow-sky-300/40 transition-all duration-300 ${focusedField === 'password' ? 'ring-2 ring-sky-400 ring-offset-2' : ''}`}>
                      <div className="relative flex items-center rounded-[24px] bg-white/95">
                        <input
                          name="password"
                          type={isPasswordVisible ? 'text' : 'password'}
                          value={formValues.password}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Create a secure password"
                          className={`${inputBaseClasses} pr-12`}
                          autoComplete="new-password"
                          aria-label="Password"
                        />
                        <motion.button
                          type="button"
                          onClick={() => setIsPasswordVisible((prev) => !prev)}
                          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                          aria-pressed={isPasswordVisible}
                          className="absolute right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-slate-400 transition hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isPasswordVisible ? (
                            <IoEyeOffOutline className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <IoEyeOutline className="h-5 w-5" aria-hidden="true" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                    <AnimatePresence mode="wait">
                      {formErrors.password && (
                        <motion.span 
                          className="text-xs font-semibold text-rose-500 flex items-center gap-1"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-500" />
                          {formErrors.password}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.label>

                  <motion.label 
                    className="flex flex-col gap-2 text-sm font-semibold text-slate-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.55 }}
                  >
                    <span>Confirm Password</span>
                    <div className={`rounded-[26px] bg-gradient-to-r from-purple-200 via-sky-200 to-indigo-200 p-[1px] shadow-inner shadow-purple-300/40 transition-all duration-300 ${focusedField === 'confirmPassword' ? 'ring-2 ring-purple-400 ring-offset-2' : ''}`}>
                      <div className="relative flex items-center rounded-[24px] bg-white/95">
                        <input
                          name="confirmPassword"
                          type={isConfirmPasswordVisible ? 'text' : 'password'}
                          value={formValues.confirmPassword}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('confirmPassword')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Retype your password"
                          className={`${inputBaseClasses} pr-12`}
                          autoComplete="new-password"
                          aria-label="Confirm password"
                        />
                        <motion.button
                          type="button"
                          onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                          aria-label={isConfirmPasswordVisible ? 'Hide password' : 'Show password'}
                          aria-pressed={isConfirmPasswordVisible}
                          className="absolute right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-slate-400 transition hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isConfirmPasswordVisible ? (
                            <IoEyeOffOutline className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <IoEyeOutline className="h-5 w-5" aria-hidden="true" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                    <AnimatePresence mode="wait">
                      {formErrors.confirmPassword && (
                        <motion.span 
                          className="text-xs font-semibold text-rose-500 flex items-center gap-1"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-500" />
                          {formErrors.confirmPassword}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.label>

                  <motion.button
                    type="submit"
                    disabled={isDisabled || isSuccess}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-indigo-400/40 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 disabled:cursor-not-allowed disabled:opacity-60 hover:shadow-xl hover:shadow-indigo-400/50"
                    whileHover={!isDisabled && !isSuccess ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isDisabled && !isSuccess ? { scale: 0.98 } : {}}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.65 }}
                  >
                    {isSuccess ? (
                      <>
                        <motion.span
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <HiCheckCircle className="h-5 w-5" />
                        </motion.span>
                        Account Created!
                      </>
                    ) : isSubmitting ? (
                      <>
                        <motion.span
                          className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Creating Account…
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </motion.button>
                </motion.form>
                <motion.div 
                  className="flex flex-col items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.75 }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.38em] text-slate-500 shadow-sm shadow-sky-100/50 backdrop-blur">
                    Ready to log in?
                  </span>
                  <motion.button
                    type="button"
                    onClick={handleFlipToPortal}
                    className="inline-flex items-center justify-center rounded-full bg-white/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-600 shadow-lg shadow-sky-200/60 transition-all duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Already Have an Account? Log In
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export const SignupPage = memo(SignupPageComponent);


