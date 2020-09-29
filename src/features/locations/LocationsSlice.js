import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

function addNewLocationToState (state, locationName) {
  if (state.pool.filter(item => item.name === locationName).length > 0) {
    return null;
  }

  const newLocation = {
    ident: uuidv4(),
    name: locationName,
    items: []
  };

  state.pool.push(newLocation);
  state.pool.sort((a, b) => {
    return (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
  });

  return newLocation;
}

export const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    selected: [
      'd572c7f8-df50-46cf-bc0c-c2440981c740',
      '27761487-d952-4025-a0ca-edca4f934d9d'
    ],
    pool: [
      {ident: 'd572c7f8-df50-46cf-bc0c-c2440981c740', name: 'Berlin', items: []},
      {ident: '27761487-d952-4025-a0ca-edca4f934d9d', name: 'London', items: []},
      {ident: '1c714a4e-1510-4055-b91b-daa358b5d2f0', name: 'New York', items: []}
    ]
  },
  reducers: {
    addLocation: (state, action) => {
      addNewLocationToState(state, action.payload);
    },
    addAndSelectLocation: (state, action) => {
      const newLocation = addNewLocationToState(state, action.payload);

      if (newLocation) {
        state.selected.push(newLocation.ident);
      }
    },
    selectExistingLocation: (state, action) => {
      state.selected.push(action.payload);
    },
    editLocation: (state, action) => {
      const editableLocation = state.pool.findIndex(location => {
        return location.ident === action.payload.ident;
      });

      const duplicateLocations = state.pool.filter(location => {
        return location.name === action.payload.newName;
      });

      if (editableLocation === null || duplicateLocations.length > 0) {
        return state;
      }

      state.pool[editableLocation].name = action.payload.newName;
    },

    addItemToLocation: (state, action) => {
      state.pool.map(location => {
        if (location.ident !== action.payload.location) {
          return;
        }

        location.items.push({
          ident: action.payload.item,
          sellAmount: 0,
          sellValue: 0,
          buyAmount: 0,
          buyValue: 0
        });
      });
    },
    updateItemValue: (state, action) => {
      state.pool.map(location => {
        if (location.ident !== action.payload.location) {
          return;
        }

        const itemIndex = location.items.findIndex(item => item.ident === action.payload.item.ident);
        if (itemIndex !== -1) {
          location.items.splice(itemIndex, 1, action.payload.item);
        }
      });
    },
    removeItemFromLocation: (state, action) => {
      state.pool.map(location => {
        if (location.ident !== action.payload.location) {
          return;
        }

        const itemIndex = location.items.findIndex(item => item.ident === action.payload.item);
        if (itemIndex !== -1) {
          location.items.splice(itemIndex, 1);
        }
      });
    }
  }
});

export const {
  addLocation, addAndSelectLocation, selectExistingLocation, editLocation,
  addItemToLocation, updateItemValue, removeItemFromLocation
} = locationsSlice.actions;

export const getLocations = state => state.locations.pool;
export const getSelectedLocationIdents = state => state.locations.selected;
export const getSelectedLocations = state => {
  return state.locations.pool.filter(
    location => state.locations.selected.find(
      selected => selected === location.ident
    )
  );
};

export default locationsSlice.reducer;
