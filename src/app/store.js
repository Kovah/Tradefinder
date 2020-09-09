import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../features/items/itemsSlice';

export default configureStore({
  reducer: {
    items: itemsReducer,
  },
});
