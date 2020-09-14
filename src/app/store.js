import { configureStore } from '@reduxjs/toolkit';
import { loadState } from './localstorage';
import { appVersion } from '../../index';
import itemsReducer from '../features/items/itemsSlice';
import locationsReducer from '../features/locations/LocationsSlice';
import tradingReducer from '../features/trading/TradingSlice';

const persistedState = loadState();

if (persistedState) {
  console.info('Loading state from your Browser...');
}

function appVersionReducer (state, action) {
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
    trading: tradingReducer,
    appVersion: appVersionReducer
  },
  preloadedState: persistedState
});
