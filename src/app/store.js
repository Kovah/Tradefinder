import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../features/items/itemsSlice';
import locationsReducer from '../features/locations/LocationsSlice';
import { loadState } from './localstorage';

const persistedState = loadState();

if (persistedState) {
  console.info('Loading state from your Browser...')
}

export default configureStore({
  reducer: {
    items: itemsReducer,
    locations: locationsReducer,
  },
  preloadedState: persistedState
});
