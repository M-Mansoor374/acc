import { createSelector, createSlice } from '@reduxjs/toolkit';
import { generateMockGroupMembers } from '../features/group/mockGroupData';

const createInitialState = () => ({
  groupName: 'Friends Guild Collective',
  groupCode: 'FRIENDS-2025',
  members: generateMockGroupMembers(),
  status: 'idle',
  message: null,
  error: null,
});

const initialState = createInitialState();

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    createGroup(state, action) {
      const { groupName, groupCode, members } = action.payload;
      state.groupName = groupName || state.groupName;
      state.groupCode = groupCode || state.groupCode;
      if (Array.isArray(members) && members.length === 4) {
        state.members = members;
      }
      state.status = 'success';
      state.message = `Group "${state.groupName}" is ready to grow!`;
      state.error = null;
    },
    joinGroup(state, action) {
      const submittedCode = action.payload.groupCode?.trim();
      if (!submittedCode) {
        state.status = 'error';
        state.error = 'Please provide a valid group name or code.';
        state.message = null;
        return;
      }
      if (submittedCode.toLowerCase() === state.groupCode.toLowerCase()) {
        state.status = 'success';
        state.message = `Joined "${state.groupName}"`;
        state.error = null;
      } else {
        state.status = 'error';
        state.error = 'No group matches that code. Check with your friends.';
        state.message = null;
      }
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
      state.status = 'success';
      state.message = 'Member progress updated';
      state.error = null;
    },
    resetGroup(state) {
      Object.assign(state, createInitialState());
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

export const { createGroup, joinGroup, updateMemberProgress, resetGroup } = groupSlice.actions;
export const groupReducer = groupSlice.reducer;

