import { createSlice } from '@reduxjs/toolkit';
import { T_ABOUT } from '../../layout/Main';

export const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    savedTab: T_ABOUT
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
