import { createSlice } from '@reduxjs/toolkit';

export const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    savedTab: 'ABOUT',
    numberFormat: {
      locale: 'en-US',
      decimals: 2,
    }
  },
  reducers: {
    changeSavedTab: (state, action) => {
      state.savedTab = action.payload;
    },
    changeNumberFormatLocale: (state, action) => {
      state.numberFormat.locale = action.payload;
    },
    changeNumberFormatDecimals: (state, action) => {
      state.numberFormat.decimals = action.payload;
    }
  }
});

export const {changeSavedTab, changeNumberFormatLocale, changeNumberFormatDecimals} = optionsSlice.actions;

export const getOptions = state => state.options;
export const getSavedTab = state => state.options.savedTab;

export default optionsSlice.reducer;
