import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import Header from '../guest/Header';

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
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
        navigate('/dashboard', { replace: true });
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
      <Header />
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
                <div className="flex items-center justify-center">
                  <span className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-purple-500 to-indigo-500 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-lg shadow-purple-500/25">
                    Welcome
                  </span>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-7 rounded-3xl border border-sky-100/50 bg-white/95 p-8 shadow-inner shadow-sky-200/60 backdrop-blur sm:p-10"
                >
                  <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                    <span>Full Name</span>
                    <div className="rounded-[26px] bg-gradient-to-r from-sky-200 via-indigo-200 to-purple-200 p-[1px] shadow-inner shadow-sky-300/40">
                      <input
                        name="fullName"
                        type="text"
                        value={formValues.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Avery Johnson"
                        className={inputBaseClasses}
                      />
                    </div>
                    {formErrors.fullName && <span className="text-xs font-semibold text-rose-500">{formErrors.fullName}</span>}
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                    <span>School Email</span>
                    <div className="rounded-[26px] bg-gradient-to-r from-purple-200 via-sky-200 to-indigo-200 p-[1px] shadow-inner shadow-purple-300/40">
                      <input
                        name="email"
                        type="email"
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder="name@greenfieldacademy.edu"
                        className={inputBaseClasses}
                      />
                    </div>
                    {formErrors.email && <span className="text-xs font-semibold text-rose-500">{formErrors.email}</span>}
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                    <span>Password</span>
                    <div className="rounded-[26px] bg-gradient-to-r from-sky-200 via-indigo-200 to-purple-200 p-[1px] shadow-inner shadow-sky-300/40">
                      <div className="relative flex items-center rounded-[24px] bg-white/95">
                        <input
                          name="password"
                          type={isPasswordVisible ? 'text' : 'password'}
                          value={formValues.password}
                          onChange={handleChange}
                          placeholder="Create a secure password"
                          className={`${inputBaseClasses} pr-12`}
                          autoComplete="new-password"
                          aria-label="Password"
                        />
                        <button
                          type="button"
                          onClick={() => setIsPasswordVisible((prev) => !prev)}
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
                    {formErrors.password && <span className="text-xs font-semibold text-rose-500">{formErrors.password}</span>}
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                    <span>Confirm Password</span>
                    <div className="rounded-[26px] bg-gradient-to-r from-purple-200 via-sky-200 to-indigo-200 p-[1px] shadow-inner shadow-purple-300/40">
                      <div className="relative flex items-center rounded-[24px] bg-white/95">
                        <input
                          name="confirmPassword"
                          type={isConfirmPasswordVisible ? 'text' : 'password'}
                          value={formValues.confirmPassword}
                          onChange={handleChange}
                          placeholder="Retype your password"
                          className={`${inputBaseClasses} pr-12`}
                          autoComplete="new-password"
                          aria-label="Confirm password"
                        />
                        <button
                          type="button"
                          onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                          aria-label={isConfirmPasswordVisible ? 'Hide password' : 'Show password'}
                          aria-pressed={isConfirmPasswordVisible}
                          className="absolute right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-slate-400 transition hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                        >
                          {isConfirmPasswordVisible ? (
                            <IoEyeOffOutline className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <IoEyeOutline className="h-5 w-5" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>
                    {formErrors.confirmPassword && (
                      <span className="text-xs font-semibold text-rose-500">{formErrors.confirmPassword}</span>
                    )}
                  </label>

                  <button
                    type="submit"
                    disabled={isDisabled}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-indigo-400/40 transition hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? 'Creating Account…' : 'Sign Up'}
                  </button>
                </form>
                <div className="flex flex-col items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.38em] text-slate-500 shadow-sm shadow-sky-100/50 backdrop-blur">
                    Ready to log in?
                  </span>
                  <button
                    type="button"
                    onClick={handleFlipToPortal}
                    className="inline-flex items-center justify-center rounded-full bg-white/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-600 shadow-lg shadow-sky-200/60 transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                  >
                    Already Have an Account? Log In
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

export const SignupPage = memo(SignupPageComponent);


