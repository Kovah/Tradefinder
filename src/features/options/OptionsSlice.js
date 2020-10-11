import { createSlice } from '@reduxjs/toolkit';

export const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    savedTab: 'ABOUT'
  },
  reducers: {
    changeSavedTab: (state, action) => {
      state.savedTab = action.payload;
    }
  }
});

export const {changeSavedTab} = optionsSlice.actions;

export const getSavedTab = state => state.options.savedTab;

export default optionsSlice.reducer;
