import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: [
    {ident: 'a538e52d-9c1f-4d94-b73b-653395e2dbed', name: 'Crafts'},
    {ident: '39bb874b-e292-49e1-81bf-4098ab1a4b27', name: 'Fish'},
    {ident: '0fe2db5a-2c94-42bb-8ba4-d88f282ea8a5', name: 'Fur'},
    {ident: 'b12167cb-8595-467c-ae41-aa00a151d158', name: 'Iron'},
    {ident: 'b9aae54c-c506-4101-af72-ad020993ca85', name: 'Meat'},
    {ident: '55c6a5e5-242f-40d1-9942-2c98715b7ffb', name: 'Wood'}
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
    },
    deleteItem: (state, action) => {
      const itemIndex = state.findIndex(item => item.ident === action.payload);
      if (itemIndex !== -1) {
        state.splice(itemIndex, 1);
      }
    },
    deleteAllItems: (state, action) => {
      state.splice(0, state.length);
    }
  }
});

export const {addItem, editItem, deleteItem, deleteAllItems} = itemsSlice.actions;

export const getItems = state => state.items;

export default itemsSlice.reducer;
