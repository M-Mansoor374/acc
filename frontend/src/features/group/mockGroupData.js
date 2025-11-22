const baseMembers = [
  {
    id: 'friend-asha',
    name: 'Aisha Carter',
    role: 'Product Designer',
    xp: 4280,
    streak: 18,
    medals: 8,
    badges: ['Quiz Ace', 'Early Bird'],
    quizProgress: 92,
    simulationProgress: 78,
  },
  {
    id: 'friend-mason',
    name: 'Mason Reed',
    role: 'Data Analyst',
    xp: 3860,
    streak: 12,
    medals: 5,
    badges: ['Simulation Guru', 'Badge Collector'],
    quizProgress: 84,
    simulationProgress: 91,
  },
  {
    id: 'friend-lena',
    name: 'Lena Ortiz',
    role: 'DevOps Lead',
    xp: 3710,
    streak: 21,
    medals: 6,
    badges: ['Streak Keeper', 'Level Up'],
    quizProgress: 76,
    simulationProgress: 63,
  },
  {
    id: 'friend-noah',
    name: 'Noah Bishop',
    role: 'Content Strategist',
    xp: 3450,
    streak: 9,
    medals: 4,
    badges: ['Fast Solver', 'Quiz Champion'],
    quizProgress: 88,
    simulationProgress: 55,
  },
];

const accentPalette = [
  {
    gradient: 'from-fuchsia-500 to-pink-500',
    ring: 'ring-fuchsia-400/40',
  },
  {
    gradient: 'from-sky-500 to-indigo-500',
    ring: 'ring-sky-400/40',
  },
  {
    gradient: 'from-emerald-500 to-lime-500',
    ring: 'ring-emerald-400/40',
  },
  {
    gradient: 'from-amber-500 to-orange-500',
    ring: 'ring-amber-400/40',
  },
];

export const generateMockGroupMembers = () => {
  return baseMembers.map((member, index) => {
    const initials = member.name
      .split(' ')
      .map((segment) => segment[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    return {
      ...member,
      xp: member.xp,
      avatarInitials: initials,
      accent: accentPalette[index % accentPalette.length],
      lastUpdated: new Date().toISOString(),
      focusAreas: ['Quizzes', 'Simulations', 'Community'],
    };
  });
};

