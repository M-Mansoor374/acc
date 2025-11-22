import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { HiCheckCircle } from 'react-icons/hi';
import GuestHeader from '../components/GuestHeader';

const inputBaseClasses =
  'w-full rounded-[18px] sm:rounded-[20px] md:rounded-[22px] bg-white/95 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-700 shadow-lg shadow-sky-900/5 outline-none transition focus:shadow-sky-500/25 focus:ring-0';

const PortalPageComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const flipTimeoutRef = useRef(null);
  
  // Get the redirect path from location state (if user was redirected here)
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }, []);

  const isDisabled = useMemo(
    () => isSubmitting || credentials.username.trim() === '' || credentials.password.trim() === '',
    [credentials.password, credentials.username, isSubmitting],
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setError('');
      if (isDisabled) {
        setError('Please enter both username and password.');
        return;
      }
      
      setIsSubmitting(true);
      
      // Regular user login
      window.setTimeout(() => {
        sessionStorage.setItem('acceptopia-authenticated', 'true');
        // Ensure role is not admin for regular users
        sessionStorage.removeItem('acceptopia-role');
        setIsSubmitting(false);
        setIsSuccess(true);
        // Show success animation then redirect
        window.setTimeout(() => {
          navigate(from, { replace: true });
        }, 800);
      }, 700);
    },
    [isDisabled, navigate, from, credentials],
  );

  useEffect(() => {
    if (sessionStorage.getItem('acceptopia-authenticated') === 'true') {
      // If already authenticated, redirect to the page they were trying to access, or dashboard
      navigate(from, { replace: true });
    }
  }, [navigate, from]);
  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const handleFlipToSignup = useCallback(() => {
    if (isFlipping || isSubmitting) {
      return;
    }
    setIsFlipping(true);
    flipTimeoutRef.current = window.setTimeout(() => {
      navigate('/signup');
    }, 480);
  }, [isFlipping, isSubmitting, navigate]);

  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) {
        window.clearTimeout(flipTimeoutRef.current);
      }
    };
  }, []);

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
        <section className="relative flex flex-1 items-center justify-center px-3 sm:px-4 md:px-6 lg:px-12 py-8 sm:py-12 md:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),transparent_55%)]" />

          <div className="relative w-full max-w-xl [perspective:1600px]">
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-sky-200/60 via-transparent to-sky-400/40 blur-3xl" aria-hidden="true" />
            <div
              className="relative flex min-h-[28rem] sm:min-h-[32rem] md:min-h-[36rem] flex-col justify-center gap-6 sm:gap-8 md:gap-10 rounded-2xl sm:rounded-3xl md:rounded-[34px] bg-gradient-to-br from-sky-400/70 via-indigo-400/60 to-purple-400/70 p-[1px] shadow-2xl shadow-sky-200/70 transition-all duration-700 ease-out [transform-style:preserve-3d] [transform:rotateY(0deg)]"
              style={outerShellStyle}
            >
              <div className="pointer-events-none absolute -top-12 right-12 hidden h-28 w-28 rounded-full bg-cyan-400/60 blur-3xl sm:block" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-14 left-10 hidden h-32 w-32 rounded-full bg-purple-500/50 blur-[120px] sm:block" aria-hidden="true" />
              <div
                className="relative flex min-h-[27.5rem] sm:min-h-[31.5rem] md:min-h-[35.5rem] flex-col justify-between gap-6 sm:gap-7 md:gap-8 rounded-2xl sm:rounded-3xl md:rounded-[32px] border border-white/20 bg-white/90 p-5 sm:p-8 md:p-10 lg:p-14 backdrop-blur-xl transition-all duration-500 ease-out [transform-style:preserve-3d] [transform:translateZ(0px)]"
                style={innerShellStyle}
              >
                <motion.div 
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <span className="inline-flex items-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-sky-500 via-purple-500 to-indigo-500 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.35em] text-white shadow-lg shadow-purple-500/25">
                    {isSuccess ? '✨ Welcome Back!' : 'Welcome'}
                  </span>
                </motion.div>
                <motion.form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 sm:gap-6 md:gap-7 rounded-2xl sm:rounded-3xl border border-sky-100/50 bg-white/95 p-5 sm:p-6 md:p-8 shadow-inner shadow-sky-200/60 backdrop-blur"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div 
                    className="flex flex-col gap-1.5 sm:gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <label className="text-xs sm:text-sm font-semibold text-slate-600" htmlFor="username">
                      Username
                    </label>
                    <div className={`rounded-[20px] sm:rounded-[24px] md:rounded-[26px] bg-gradient-to-r from-sky-200 via-indigo-200 to-purple-200 p-[1px] shadow-inner shadow-sky-300/40 transition-all duration-300 ${focusedField === 'username' ? 'ring-2 ring-sky-400 ring-offset-2' : ''}`}>
                      <input
                        id="username"
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('username')}
                        onBlur={() => setFocusedField(null)}
                        autoComplete="username"
                        className={inputBaseClasses}
                        placeholder="Enter your username"
                      />
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col gap-1.5 sm:gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <label className="text-xs sm:text-sm font-semibold text-slate-600" htmlFor="password">
                      Password
                    </label>
                    <div className={`rounded-[20px] sm:rounded-[24px] md:rounded-[26px] bg-gradient-to-r from-purple-200 via-sky-200 to-indigo-200 p-[1px] shadow-inner shadow-purple-300/40 transition-all duration-300 ${focusedField === 'password' ? 'ring-2 ring-purple-400 ring-offset-2' : ''}`}>
                      <div className="relative flex items-center rounded-[18px] sm:rounded-[22px] md:rounded-[24px] bg-white/95">
                        <input
                          id="password"
                          type={isPasswordVisible ? 'text' : 'password'}
                          name="password"
                          value={credentials.password}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => setFocusedField(null)}
                          autoComplete="current-password"
                          className={`${inputBaseClasses} pr-10 sm:pr-12`}
                          placeholder="Enter your password"
                          aria-label="Password"
                        />
                        <motion.button
                          type="button"
                          onClick={togglePasswordVisibility}
                          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                          aria-pressed={isPasswordVisible}
                          className="absolute right-2 sm:right-3 inline-flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-transparent text-slate-400 transition hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isPasswordVisible ? (
                            <IoEyeOffOutline className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                          ) : (
                            <IoEyeOutline className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                  
                  <AnimatePresence mode="wait">
                    {error && (
                      <motion.p 
                        className="rounded-xl sm:rounded-2xl border border-rose-200 bg-rose-50 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-rose-500 flex items-center gap-2"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="inline-block h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                        {error}
                      </motion.p>
                    )}
                    {isSuccess && (
                      <motion.p 
                        className="rounded-xl sm:rounded-2xl border border-emerald-200 bg-emerald-50 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-emerald-600 flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, type: "spring" }}
                      >
                        <HiCheckCircle className="h-4 w-4" />
                        Login successful! Redirecting...
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <motion.button
                    type="submit"
                    disabled={isDisabled || isSuccess}
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 shadow-indigo-400/40 focus-visible:outline-sky-400 hover:shadow-xl hover:shadow-indigo-400/50"
                    whileHover={!isDisabled && !isSuccess ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isDisabled && !isSuccess ? { scale: 0.98 } : {}}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
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
                        Success!
                      </>
                    ) : isSubmitting ? (
                      <>
                        <motion.span
                          className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Signing In…
                      </>
                    ) : (
                      'Log In'
                    )}
                  </motion.button>
                </motion.form>
                <motion.div 
                  className="flex flex-col items-center gap-3 sm:gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200/60 bg-white/70 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-slate-500 shadow-sm shadow-sky-100/50 backdrop-blur">
                    Secure campus gateway
                    <motion.span 
                      className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    24/7 access
                  </div>
                  <motion.button
                    type="button"
                    onClick={handleFlipToSignup}
                    className="inline-flex items-center justify-center rounded-full bg-white/80 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-sky-600 shadow-lg shadow-sky-200/60 transition-all duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 text-center"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Don&apos;t Have an Account? Sign Up
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

export const PortalPage = memo(PortalPageComponent);


