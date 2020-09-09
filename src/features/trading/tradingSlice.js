import { createSlice } from '@reduxjs/toolkit';

export const tradingSlice = createSlice({
  name: 'trading',
  initialState: {
    value: 101
  },
  reducers: {
    increment: state => {
      state.value += 1;
    }
  }
});

export const {increment} = tradingSlice.actions;

export const selectCount = state => state.trading;

export default tradingSlice.reducer;
