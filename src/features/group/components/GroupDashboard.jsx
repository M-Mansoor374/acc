import React, { useState } from 'react';
import { HiOutlineShare, HiOutlineLogout, HiUsers } from 'react-icons/hi';
import { motion } from 'framer-motion';
import MemberCard from './MemberCard';
import GroupLeaderboard from './GroupLeaderboard';
import CreateOrJoinGroup from './CreateOrJoinGroup';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import {
  selectGroupCode,
  selectGroupLeaderboard,
  selectGroupMembers,
  selectGroupName,
  selectGroupTotalXp,
  resetGroup,
} from '../../../store/groupSlice';

const GroupDashboard = () => {
  const dispatch = useAppDispatch();
  const members = useAppSelector(selectGroupMembers);
  const leaderboard = useAppSelector(selectGroupLeaderboard);
  const groupName = useAppSelector(selectGroupName);
  const groupCode = useAppSelector(selectGroupCode);
  const totalXp = useAppSelector(selectGroupTotalXp);

  const [copied, setCopied] = useState(false);
  const [leaveMessage, setLeaveMessage] = useState('');

  const handleInvite = async () => {
    try {
      await navigator.clipboard.writeText(groupCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      setCopied(false);
    }
  };

  const handleLeaveGroup = () => {
    dispatch(resetGroup());
    setLeaveMessage('You left the group. Refresh to rejoin friends.');
    setTimeout(() => setLeaveMessage(''), 2200);
  };

  return (
    <motion.section
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-slate-900/95 via-indigo-900/20 to-slate-900/95 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-indigo-900/50 backdrop-blur-xl"
    >
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/50">
                  <HiUsers className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-indigo-300 font-semibold">
                  Friends Group
                </p>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                {groupName}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-xs sm:text-sm text-slate-400">
                  Group Code:
                </p>
                <span className="px-2 py-1 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-mono text-xs sm:text-sm font-semibold">
                  {groupCode}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1 sm:text-right bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-400/20 rounded-2xl p-3 sm:p-4">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-indigo-300 font-semibold">
                Collective XP
              </span>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
                {totalXp.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleInvite}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/60 transition-all"
            >
              <HiOutlineShare className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Invite Friend</span>
              <span className="xs:hidden">Invite</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLeaveGroup}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-white/30 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white transition-all hover:border-white/60 hover:bg-white/5"
            >
              <HiOutlineLogout className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Leave Group</span>
              <span className="xs:hidden">Leave</span>
            </motion.button>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] text-emerald-400 bg-emerald-500/10 border border-emerald-400/30 rounded-xl"
              >
                ✓ Code copied!
              </motion.span>
            )}
            {leaveMessage && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] text-rose-400 bg-rose-500/10 border border-rose-400/30 rounded-xl"
              >
                {leaveMessage}
              </motion.span>
            )}
          </div>
        </div>

        {/* Members and Leaderboard Grid */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MemberCard member={member} />
              </motion.div>
            ))}
          </div>

          {/* Leaderboard */}
          <GroupLeaderboard entries={leaderboard} />
        </div>

        {/* Create/Join Section */}
        <CreateOrJoinGroup />
      </div>
    </motion.section>
  );
};

export default GroupDashboard;

