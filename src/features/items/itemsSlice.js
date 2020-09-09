import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: [
    {ident: uuidv4(), name: 'Crafts'},
    {ident: uuidv4(), name: 'Fish'},
    {ident: uuidv4(), name: 'Fur'},
    {ident: uuidv4(), name: 'Iron'},
    {ident: uuidv4(), name: 'Meat'},
    {ident: uuidv4(), name: 'Wood'}
  ],
  reducers: {
    addItem: (state, action) => {
      const newName = action.payload;

      const duplicateItems = state.filter(item => {
        return item.name === newName;
      });

      if (duplicateItems.length === 0) {
        state.push({
          ident: uuidv4(),
          name: newName
        });

        state.sort((a, b) => {
          return (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
        });
      }
    },
    editItem: (state, action) => {
      const editableItem = state.findIndex(item => {
        return item.ident === action.payload.ident;
      });

      const duplicateItems = state.filter(item => {
        return item.name === action.payload.newName;
      });

      if (editableItem === null || duplicateItems.length > 0) {
        return state;
      }

      state[editableItem].name = action.payload.newName;
    }
  }
});

export const {addItem, editItem} = itemsSlice.actions;

export const getItems = state => state.items;

export default itemsSlice.reducer;
