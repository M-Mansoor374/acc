import React, { memo } from 'react';
import UserHeader from '../../components/UserHeader';
import Footer from '../../components/Footer';

const LegalSection = ({ title, children }) => (
  <section className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/30 sm:p-6">
    <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
    <div className="mt-3 text-sm leading-relaxed text-slate-300">{children}</div>
  </section>
);

const PrivacyPageComponent = () => (
  <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
    <UserHeader />
    <main className="flex flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 sm:gap-8">
        <header className="space-y-3 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200">
            Legal
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">Privacy Policy</h1>
          <p className="text-sm text-slate-300 sm:text-base">
            We protect your learning journey with transparent data practices. Below is a concise
            overview of how Acceptopia collects, stores, and secures information.
          </p>
        </header>

        <LegalSection title="Data We Collect">
          <ul className="list-disc space-y-2 pl-4">
            <li>Account information such as name, email, and preferred role.</li>
            <li>Learning telemetry including quiz streaks, XP earned, and session metadata.</li>
            <li>Device details (browser, OS) used strictly to monitor platform performance.</li>
          </ul>
        </LegalSection>

        <LegalSection title="How We Use Your Data">
          <ul className="list-disc space-y-2 pl-4">
            <li>Deliver personalized dashboards, reminders, and progress summaries.</li>
            <li>Improve content quality with anonymized analytics.</li>
            <li>Send mission-critical notifications such as password resets or system alerts.</li>
          </ul>
        </LegalSection>

        <LegalSection title="Your Controls">
          <p>
            You may export or delete your account data at any time by emailing{' '}
            <a
              className="text-indigo-300 underline decoration-indigo-500/40 underline-offset-2"
              href="mailto:support@acceptopia.com"
            >
              support@acceptopia.com
            </a>
            . We respond to all requests within 72 hours.
          </p>
        </LegalSection>
      </div>
    </main>
    <Footer />
  </div>
);

export const Privacy = memo(PrivacyPageComponent);


