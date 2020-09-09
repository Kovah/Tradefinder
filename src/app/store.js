import { configureStore } from '@reduxjs/toolkit';
import tradingReducer from '../features/trading/tradingSlice';
import itemsReducer from '../features/items/itemsSlice';

export default configureStore({
  reducer: {
    trading: tradingReducer,
    items: itemsReducer,
  },
});
