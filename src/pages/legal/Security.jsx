import React, { memo } from 'react';
import Header from '../../login/Header';
import Footer from '../../components/Footer';

const SecuritySection = ({ title, children }) => (
  <section className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/30 sm:p-6">
    <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
    <div className="mt-3 text-sm leading-relaxed text-slate-300">{children}</div>
  </section>
);

const SecurityPageComponent = () => (
  <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
    <Header />
    <main className="flex flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 sm:gap-8">
        <header className="space-y-3 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200">
            Legal
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">Security Practices</h1>
          <p className="text-sm text-slate-300 sm:text-base">
            Safeguarding learner data and intellectual property is core to Acceptopia. Here is how
            we keep your experience secure.
          </p>
        </header>

        <SecuritySection title="Infrastructure">
          <ul className="list-disc space-y-2 pl-4">
            <li>All traffic is encrypted via TLS 1.3 with automatic certificate rotation.</li>
            <li>Backups run daily and are stored in encrypted object storage.</li>
            <li>Core services are hosted on hardened containers with strict IAM policies.</li>
          </ul>
        </SecuritySection>

        <SecuritySection title="Access Controls">
          <p>
            Administrative access requires hardware-based MFA. We review access logs weekly and audit
            permissions each quarter. Sensitive actions inside the product trigger real-time alerts.
          </p>
        </SecuritySection>

        <SecuritySection title="Reporting">
          <p>
            Found a vulnerability or suspicious activity? Contact our security team at{' '}
            <a
              className="text-indigo-300 underline decoration-indigo-500/40 underline-offset-2"
              href="mailto:security@acceptopia.com"
            >
              security@acceptopia.com
            </a>
            . We triage submissions within 24 hours.
          </p>
        </SecuritySection>
      </div>
    </main>
    <Footer />
  </div>
);

export const Security = memo(SecurityPageComponent);


