import { createSlice } from '@reduxjs/toolkit';

export const tradingSlice = createSlice({
  name: 'trading',
  initialState: {
    locationIdents: [],
    locations: []
  },
  reducers: {
    addTradingLocation: (state, action) => {
      let newLocation = action.payload;

      const duplicateLocations = state.locations.filter(item => {
        return item.ident === newLocation.ident;
      });

      if (duplicateLocations.length === 0) {
        state.locations.push({...newLocation, items: []});

        state.locations.sort((a, b) => {
          return (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
        });

        state.locationIdents.push(newLocation.ident);
      }
    }
  }
});

export const {addTradingLocation} = tradingSlice.actions;

export const getTradingLocations = state => state.trading.locations;
export const getSelectedLocationIdents = state => state.trading.locationIdents;

export default tradingSlice.reducer;
