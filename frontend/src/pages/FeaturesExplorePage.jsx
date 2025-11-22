import React, { memo } from 'react';
import GuestHeader from '../components/GuestHeader';
import Footer from '../components/Footer';
import { FeaturesExploreSection } from '../components/FeaturesExploreSection';

const FeaturesExplorePageComponent = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 text-white">
      <GuestHeader />
      <main className="flex flex-1 flex-col">
        <section className="flex flex-1 flex-col">
          <FeaturesExploreSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export const FeaturesExplorePage = memo(FeaturesExplorePageComponent);


