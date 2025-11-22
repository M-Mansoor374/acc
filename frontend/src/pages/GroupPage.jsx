import React, { memo } from 'react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';
import GroupDashboard from '../features/group/components/GroupDashboard';

const GroupPageComponent = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      <UserHeader />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <GroupDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const GroupPage = memo(GroupPageComponent);

