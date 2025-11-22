import { createSelector, createSlice } from '@reduxjs/toolkit';
import { generateMockGroupMembers } from '../features/group/mockGroupData';

const DEFAULT_GROUP_NAME = 'Friends Guild Collective';
const DEFAULT_GROUP_CODE = 'FRIENDS-2025';
const EMPTY_GROUP_NAME = 'No Active Group';
const EMPTY_GROUP_CODE = '------';

const cloneMembers = (members) => members.map((member) => ({ ...member }));

const prepareMembers = (members) => {
  if (!Array.isArray(members) || members.length === 0) {
    return generateMockGroupMembers();
  }
  return members.slice(0, 4).map((member, index) => ({
    id: member.id ?? `member-${index + 1}`,
    ...member,
  }));
};

const createInitialState = () => {
  const seededMembers = generateMockGroupMembers();
  return {
    groupName: DEFAULT_GROUP_NAME,
    groupCode: DEFAULT_GROUP_CODE,
    members: seededMembers,
    activeGroupCode: DEFAULT_GROUP_CODE,
    groupsRegistry: {
      [DEFAULT_GROUP_CODE]: {
        groupName: DEFAULT_GROUP_NAME,
        members: cloneMembers(seededMembers),
      },
    },
    status: 'idle',
    message: null,
    error: null,
  };
};

const initialState = createInitialState();

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    createGroup(state, action) {
      const rawName = action.payload.groupName?.trim();
      const rawCode = action.payload.groupCode?.trim();
      if (!rawCode) {
        state.status = 'error';
        state.error = 'Group code is required to create a crew.';
        state.message = null;
        return;
      }

      const normalizedCode = rawCode.toUpperCase();

      if (state.groupsRegistry[normalizedCode]) {
        state.status = 'error';
        state.error = `Group code "${normalizedCode}" already exists. Try joining it instead.`;
        state.message = null;
        return;
      }

      const sanitizedMembers = prepareMembers(action.payload.members);
      const safeName = rawName || 'Friends Crew';

      state.groupsRegistry[normalizedCode] = {
        groupName: safeName,
        members: cloneMembers(sanitizedMembers),
      };

      state.groupName = safeName;
      state.groupCode = normalizedCode;
      state.members = sanitizedMembers;
      state.activeGroupCode = normalizedCode;
      state.status = 'success';
      state.message = `Group "${state.groupName}" is ready to grow!`;
      state.error = null;
    },
    joinGroup(state, action) {
      const submittedCode = action.payload.groupCode?.trim().toUpperCase();
      if (!submittedCode) {
        state.status = 'error';
        state.error = 'Please provide a valid group name or code.';
        state.message = null;
        return;
      }

      if (state.activeGroupCode && state.activeGroupCode !== submittedCode) {
        state.status = 'error';
        state.error = 'Leave your current group before joining a new one.';
        state.message = null;
        return;
      }

      if (state.activeGroupCode === submittedCode) {
        state.status = 'success';
        state.message = `You're already tracking progress with "${state.groupName}".`;
        state.error = null;
        return;
      }

      const targetGroup = state.groupsRegistry[submittedCode];

      if (!targetGroup) {
        state.status = 'error';
        state.error = 'No group matches that code. Check with your friends.';
        state.message = null;
        return;
      }

      state.groupName = targetGroup.groupName;
      state.groupCode = submittedCode;
      state.members = cloneMembers(targetGroup.members);
      state.activeGroupCode = submittedCode;
      state.status = 'success';
      state.message = `Joined "${state.groupName}"`;
      state.error = null;
    },
    updateMemberProgress(state, action) {
      const payload = action.payload;
      state.members = state.members.map((member) => {
        if (member.id !== payload.memberId) return member;
        return {
          ...member,
          ...payload,
        };
      });

      if (state.activeGroupCode && state.groupsRegistry[state.activeGroupCode]) {
        state.groupsRegistry[state.activeGroupCode] = {
          ...state.groupsRegistry[state.activeGroupCode],
          members: cloneMembers(state.members),
        };
      }

      state.status = 'success';
      state.message = 'Member progress updated';
      state.error = null;
    },
    resetGroup(state) {
      state.groupName = EMPTY_GROUP_NAME;
      state.groupCode = EMPTY_GROUP_CODE;
      state.members = [];
      state.activeGroupCode = null;
      state.status = 'success';
      state.message = 'You left the group. Create or join a new crew to continue.';
      state.error = null;
    },
  },
});

const selectGroupState = (state) => state.group;

export const selectGroupMembers = createSelector(selectGroupState, (slice) => slice.members);
export const selectGroupLeaderboard = createSelector(selectGroupMembers, (members) =>
  [...members].sort((a, b) => b.xp - a.xp),
);
export const selectGroupName = createSelector(selectGroupState, (slice) => slice.groupName);
export const selectGroupCode = createSelector(selectGroupState, (slice) => slice.groupCode);
export const selectGroupTotalXp = createSelector(selectGroupMembers, (members) =>
  members.reduce((total, member) => total + member.xp, 0),
);
export const selectGroupStatus = createSelector(selectGroupState, (slice) => slice.status);
export const selectGroupMessage = createSelector(selectGroupState, (slice) => slice.message);
export const selectGroupError = createSelector(selectGroupState, (slice) => slice.error);
export const selectActiveGroupCode = createSelector(selectGroupState, (slice) => slice.activeGroupCode);
export const selectIsInGroup = createSelector(selectGroupState, (slice) => Boolean(slice.activeGroupCode));
export const selectAllGroupCodes = createSelector(selectGroupState, (slice) => Object.keys(slice.groupsRegistry || {}));

export const { createGroup, joinGroup, updateMemberProgress, resetGroup } = groupSlice.actions;
export const groupReducer = groupSlice.reducer;

