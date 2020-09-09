import { configureStore } from '@reduxjs/toolkit';
import tradingReducer from '../features/trading/tradingSlice';

export default configureStore({
  reducer: {
    trading: tradingReducer,
  },
});
