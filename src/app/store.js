import { configureStore } from '@reduxjs/toolkit';
import { loadState } from './localstorage';
import { appVersion } from '../../index';
import itemsReducer from '../features/items/itemsSlice';
import locationsReducer from '../features/locations/LocationsSlice';

const persistedState = loadState();

if (persistedState) {
  console.info('Loading state from your Browser...');
}

function appVersionReducer (state) {
  if (typeof state === 'undefined') {
    state = {
      appVersion: appVersion
    };
  }

  return state;
}

export default configureStore({
  reducer: {
    items: itemsReducer,
    locations: locationsReducer,
    appVersion: appVersionReducer
  },
  preloadedState: persistedState
});
