import { createSlice } from '@reduxjs/toolkit';

export const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    savedTab: 'ABOUT',
    numberFormat: {
      locale: 'en-US',
      decimals: 2,
    },
    minimumProfit: {
      type: 'percent',
      amount: 0,
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
    },
    changeMinimumProfitType: (state, action) => {
      state.minimumProfit.type = action.payload;
    },
    changeMinimumProfitAmount: (state, action) => {
      state.minimumProfit.amount = action.payload;
    }
  }
});

export const {changeSavedTab, changeNumberFormatLocale, changeNumberFormatDecimals, changeMinimumProfitType, changeMinimumProfitAmount} = optionsSlice.actions;

export const getOptions = state => state.options;
export const getSavedTab = state => state.options.savedTab;

export default optionsSlice.reducer;
