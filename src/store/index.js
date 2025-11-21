import { configureStore } from '@reduxjs/toolkit';
import { quizReducer } from './quizSlice';
import { groupReducer } from './groupSlice';

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    group: groupReducer,
  },
});


