import { createSlice } from '@reduxjs/toolkit';

export const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    savedTab: 'ABOUT',
    numberFormat: 'en-US'
  },
  reducers: {
    changeSavedTab: (state, action) => {
      state.savedTab = action.payload;
    },
    changeNumberFormat: (state, action) => {
      state.numberFormat = action.payload;
    }
  }
});

export const {changeSavedTab, changeNumberFormat} = optionsSlice.actions;

export const getOptions = state => state.options;
export const getSavedTab = state => state.options.savedTab;

export default optionsSlice.reducer;
