import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  result: null,
  score: [],
  prices: [],
};

const yamsEventSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    fetchDiceRollRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDiceRollSuccess(state, action) {
      state.loading = false;
      state.score = action.payload.infos?.score;
      state.result = action.payload.infos?.result;
      state.prices = action.payload.infos?.prices;
    },
    fetchDiceRollFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDiceRollRequest, fetchDiceRollSuccess, fetchDiceRollFailure } = yamsEventSlice.actions;

export default yamsEventSlice.reducer;
