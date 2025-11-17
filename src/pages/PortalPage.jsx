import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import Header from '../guest/Header';

const inputBaseClasses =
  'w-full rounded-[22px] bg-white/95 px-4 py-3 text-sm text-slate-700 shadow-lg shadow-sky-900/5 outline-none transition focus:shadow-sky-500/25 focus:ring-0';

const PortalPageComponent = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const flipTimeoutRef = useRef(null);

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
      window.setTimeout(() => {
        sessionStorage.setItem('acceptopia-authenticated', 'true');
        setIsSubmitting(false);
        navigate('/dashboard', { replace: true });
      }, 700);
    },
    [isDisabled, navigate],
  );

  useEffect(() => {
    if (sessionStorage.getItem('acceptopia-authenticated') === 'true') {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);
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
      <Header />
      <main className="flex flex-1 flex-col bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <section className="relative flex flex-1 items-center justify-center px-4 py-16 sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),transparent_55%)]" />

          <div className="relative w-full max-w-xl [perspective:1600px]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-200/60 via-transparent to-sky-400/40 blur-3xl" aria-hidden="true" />
            <div
              className="relative flex min-h-[36rem] flex-col justify-center gap-10 rounded-[34px] bg-gradient-to-br from-sky-400/70 via-indigo-400/60 to-purple-400/70 p-[1px] shadow-2xl shadow-sky-200/70 transition-all duration-700 ease-out [transform-style:preserve-3d] [transform:rotateY(0deg)]"
              style={outerShellStyle}
            >
              <div className="pointer-events-none absolute -top-12 right-12 hidden h-28 w-28 rounded-full bg-cyan-400/60 blur-3xl sm:block" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-14 left-10 hidden h-32 w-32 rounded-full bg-purple-500/50 blur-[120px] sm:block" aria-hidden="true" />
              <div
                className="relative flex min-h-[35.5rem] flex-col justify-between gap-8 rounded-[32px] border border-white/20 bg-white/90 p-10 backdrop-blur-xl transition-all duration-500 ease-out sm:p-14 [transform-style:preserve-3d] [transform:translateZ(0px)]"
                style={innerShellStyle}
              >
                <div className="flex items-center justify-center">
                  <span className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-purple-500 to-indigo-500 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-lg shadow-purple-500/25">
                    Welcome
                  </span>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-7 rounded-3xl border border-sky-100/50 bg-white/95 p-8 shadow-inner shadow-sky-200/60 backdrop-blur"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="username">
                      Username
                    </label>
                    <div className="rounded-[26px] bg-gradient-to-r from-sky-200 via-indigo-200 to-purple-200 p-[1px] shadow-inner shadow-sky-300/40">
                      <input
                        id="username"
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        autoComplete="username"
                        className={inputBaseClasses}
                        placeholder="Enter your username"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="password">
                      Password
                    </label>
                    <div className="rounded-[26px] bg-gradient-to-r from-purple-200 via-sky-200 to-indigo-200 p-[1px] shadow-inner shadow-purple-300/40">
                      <div className="relative flex items-center rounded-[24px] bg-white/95">
                        <input
                          id="password"
                          type={isPasswordVisible ? 'text' : 'password'}
                          name="password"
                          value={credentials.password}
                          onChange={handleChange}
                          autoComplete="current-password"
                          className={`${inputBaseClasses} pr-12`}
                          placeholder="Enter your password"
                          aria-label="Password"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                          aria-pressed={isPasswordVisible}
                          className="absolute right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-slate-400 transition hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                        >
                          {isPasswordVisible ? (
                            <IoEyeOffOutline className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <IoEyeOutline className="h-5 w-5" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  {error && (
                    <p className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-500">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isDisabled}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-indigo-400/40 transition hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? 'Signing In…' : 'Log In'}
                  </button>
                </form>
                <div className="flex flex-col items-center gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-4 py-2 text-xs font-medium text-slate-500 shadow-sm shadow-sky-100/50 backdrop-blur">
                    Secure campus gateway
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400" />
                    24/7 access
                  </div>
                  <button
                    type="button"
                    onClick={handleFlipToSignup}
                    className="inline-flex items-center justify-center rounded-full bg-white/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-600 shadow-lg shadow-sky-200/60 transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                  >
                    Don&apos;t Have an Account? Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export const PortalPage = memo(PortalPageComponent);


