import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiOutlineLogin } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  createGroup,
  joinGroup,
  selectGroupCode,
  selectActiveGroupCode,
  selectAllGroupCodes,
  selectGroupError,
  selectGroupMessage,
  selectGroupStatus,
} from '../../../store/groupSlice';

const CreateOrJoinGroup = () => {
  const dispatch = useAppDispatch();
  const groupCode = useAppSelector(selectGroupCode);
  const status = useAppSelector(selectGroupStatus);
  const message = useAppSelector(selectGroupMessage);
  const error = useAppSelector(selectGroupError);
  const activeGroupCode = useAppSelector(selectActiveGroupCode);
  const existingGroupCodes = useAppSelector(selectAllGroupCodes);

  const [inputValue, setInputValue] = useState('');
  const [localAlert, setLocalAlert] = useState(null);

  const normalizedExistingCodes = useMemo(
    () => new Set(existingGroupCodes.map((code) => code.toUpperCase())),
    [existingGroupCodes],
  );

  const generateUniqueCode = useCallback(() => {
    let attempts = 0;
    while (attempts < 24) {
      const candidate = `FRIENDS-${Math.floor(1000 + Math.random() * 9000)}`;
      if (!normalizedExistingCodes.has(candidate.toUpperCase())) {
        return candidate;
      }
      attempts += 1;
    }
    return null;
  }, [normalizedExistingCodes]);

  useEffect(() => {
    if (status === 'success') {
      setInputValue('');
    }
  }, [status]);

  const handleAction = (mode) => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      setLocalAlert({ type: 'error', text: 'Enter a group name or code before proceeding.' });
      return;
    }

    setLocalAlert(null);

    if (mode === 'create') {
      const code = generateUniqueCode();
      if (!code) {
        setLocalAlert({
          type: 'error',
          text: 'Unable to generate a unique invite code right now. Please try again.',
        });
        return;
      }
      dispatch(
        createGroup({
          groupName: trimmedValue,
          groupCode: code,
        }),
      );
      return;
    }

    const normalizedCode = trimmedValue.toUpperCase();

    if (activeGroupCode && activeGroupCode !== normalizedCode) {
      setLocalAlert({
        type: 'error',
        text: 'Leave your current group before joining a new one.',
      });
      return;
    }

    setLocalAlert(null);
    dispatch(
      joinGroup({
        groupCode: normalizedCode,
      }),
    );
  };

  const feedback =
    localAlert ||
    (status === 'error' && error
      ? { type: 'error', text: error }
      : status === 'success' && message
      ? { type: 'success', text: message }
      : null);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-gradient-to-br from-slate-900/95 via-indigo-900/30 to-slate-900/95 border-2 border-indigo-400/30 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl shadow-indigo-900/70 hover:shadow-indigo-500/40 transition-all"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-0.5 sm:space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
              <HiPlus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <p className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase text-indigo-300 font-bold">
              Group Access
            </p>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            Create or Join
          </h3>
        </div>
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-400/30 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-300 font-semibold">
            Current Code
          </p>
          <p className="text-xs sm:text-sm md:text-base font-bold text-white font-mono">
            {groupCode}
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
        <label className="text-[10px] sm:text-xs text-indigo-200 uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] font-semibold">
          Group name or code
        </label>
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g. Knowledge Crew or FRIENDS-2025"
            className="w-full bg-white/10 border-2 border-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleAction('create')}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/60 transition-all"
        >
          <HiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">Create Group</span>
          <span className="xs:hidden">Create</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleAction('join')}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl border-2 border-white/40 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white transition-all hover:border-white/60 hover:bg-white/5"
        >
          <HiOutlineLogin className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">Join Group</span>
          <span className="xs:hidden">Join</span>
        </motion.button>
      </div>

      {/* Feedback Messages */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`mt-3 sm:mt-4 rounded-xl sm:rounded-2xl border-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold ${
            feedback.type === 'error'
              ? 'border-red-500/50 bg-red-500/10 text-red-200'
              : 'border-emerald-500/50 bg-emerald-500/10 text-emerald-100'
          }`}
        >
          {feedback.text}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CreateOrJoinGroup;

