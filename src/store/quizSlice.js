import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { quizQuestions } from '../data/quizQuestions';

export const fetchQuizQuestions = createAsyncThunk(
  'quiz/fetchQuizQuestions',
  async (_, { rejectWithValue }) => {
    try {
      const sortedQuestions = [...quizQuestions].sort((a, b) => a.order - b.order);
      if (sortedQuestions.length === 0) {
        return rejectWithValue('No quiz questions available.');
      }
      return sortedQuestions;
    } catch (error) {
      return rejectWithValue(error.message ?? 'Unexpected error loading quiz data.');
    }
  },
);

const initialState = {
  questions: [],
  currentIndex: 0,
  responses: {},
  totalXp: 0,
  medals: [],
  status: 'idle',
  error: null,
};

const determineMedals = (xp) => {
  if (xp >= 400) {
    return ['Platinum', 'Gold', 'Silver'];
  }

  if (xp >= 300) {
    return ['Gold', 'Silver'];
  }

  if (xp >= 200) {
    return ['Silver'];
  }

  if (xp >= 100) {
    return ['Bronze'];
  }

  return [];
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    selectAnswer: (state, { payload }) => {
      const { questionId, optionId } = payload;
      const question = state.questions.find((item) => item.id === questionId);
      if (!question) {
        return state;
      }

      const selectedOption = question.options.find((option) => option.id === optionId);
      const previousResponse = state.responses[questionId];
      const isCorrect = Boolean(selectedOption?.isCorrect);

      if (previousResponse) {
        state.totalXp -= previousResponse.awardedXp;
      }

      const awardedXp = isCorrect ? question.xpValue : 0;
      state.responses[questionId] = {
        optionId,
        isCorrect,
        awardedXp,
      };
      state.totalXp += awardedXp;
      state.totalXp = Math.max(0, state.totalXp);

      state.medals = determineMedals(state.totalXp);
    },
    goToNextQuestion: (state) => {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex += 1;
      }
    },
    goToPreviousQuestion: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
    },
    resetQuiz: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizQuestions.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.questions = payload;
        state.currentIndex = 0;
        state.responses = {};
        state.totalXp = 0;
        state.medals = [];
      })
      .addCase(fetchQuizQuestions.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      });
  },
});

export const { goToNextQuestion, goToPreviousQuestion, resetQuiz, selectAnswer } = quizSlice.actions;

export const quizReducer = quizSlice.reducer;

export const selectQuizState = (state) => state.quiz;
export const selectCurrentQuestion = (state) => {
  const quizState = selectQuizState(state);
  return quizState.questions[quizState.currentIndex];
};
export const selectQuestionProgress = (state) => {
  const quizState = selectQuizState(state);
  return {
    current: quizState.currentIndex + 1,
    total: quizState.questions.length,
  };
};
export const selectResponseByQuestionId = (questionId) => (state) =>
  selectQuizState(state).responses[questionId];
export const selectCanNavigateNext = (state) => {
  const quizState = selectQuizState(state);
  const currentQuestion = quizState.questions[quizState.currentIndex];
  if (!currentQuestion) {
    return false;
  }
  const response = quizState.responses[currentQuestion.id];
  return Boolean(response);
};


