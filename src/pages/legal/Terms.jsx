import React, { memo } from 'react';
import Header from '../../login/Header';
import Footer from '../../components/Footer';

const LegalCard = ({ title, children }) => (
  <section className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/30 sm:p-6">
    <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
    <div className="mt-3 text-sm leading-relaxed text-slate-300">{children}</div>
  </section>
);

const TermsPageComponent = () => (
  <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
    <Header />
    <main className="flex flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 sm:gap-8">
        <header className="space-y-3 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200">
            Legal
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">Terms of Service</h1>
          <p className="text-sm text-slate-300 sm:text-base">
            These guidelines keep Acceptopia safe, inclusive, and mission-focused. By using the
            platform you agree to the following principles.
          </p>
        </header>

        <LegalCard title="Fair Use">
          <ul className="list-disc space-y-2 pl-4">
            <li>Each account is personal. Do not share credentials or progress data.</li>
            <li>Use Acceptopia only for lawful learning, collaboration, and mentorship.</li>
            <li>Respect intellectual property when submitting projects or resources.</li>
          </ul>
        </LegalCard>

        <LegalCard title="Platform Availability">
          <p>
            Scheduled maintenance, beta releases, or security updates may temporarily pause access.
            We aim to provide 24-hour notice for any planned downtime exceeding 30 minutes.
          </p>
        </LegalCard>

        <LegalCard title="Termination">
          <p>
            Accounts violating community or academic honesty standards may be suspended. You may
            cancel anytime inside your profile settings or by emailing{' '}
            <a
              className="text-indigo-300 underline decoration-indigo-500/40 underline-offset-2"
              href="mailto:support@acceptopia.com"
            >
              support@acceptopia.com
            </a>
            .
          </p>
        </LegalCard>
      </div>
    </main>
    <Footer />
  </div>
);

export const Terms = memo(TermsPageComponent);


