import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const locationsSlice = createSlice({
  name: 'locations',
  initialState: [
    {ident: uuidv4(), name: 'Highcastle'},
    {ident: uuidv4(), name: 'North Lancester'}
  ],
  reducers: {
    addLocation: (state, action) => {
      const newName = action.payload;

      const duplicateLocations = state.filter(item => {
        return item.name === newName;
      });

      if (duplicateLocations.length === 0) {
        state.push({
          ident: uuidv4(),
          name: newName
        });

        state.sort((a, b) => {
          return (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
        });
      }
    },
    editLocation: (state, action) => {
      const editableLocation = state.findIndex(location => {
        return location.ident === action.payload.ident;
      });

      const duplicateLocations = state.filter(location => {
        return location.name === action.payload.newName;
      });

      if (editableLocation === null || duplicateLocations.length > 0) {
        return state;
      }

      state[editableLocation].name = action.payload.newName;
    }
  }
});

export const {addLocation, editLocation} = locationsSlice.actions;

export const getLocations = state => state.locations;

export default locationsSlice.reducer;
