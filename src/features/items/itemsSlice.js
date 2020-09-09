import { createSlice } from '@reduxjs/toolkit';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: [
    {ident: 'crafts', name: 'Crafts'},
    {ident: 'fish', name: 'Fish'},
    {ident: 'fur', name: 'Fur'},
    {ident: 'iron', name: 'Iron'},
    {ident: 'meat', name: 'Meat'},
    {ident: 'wood', name: 'Wood'},
  ],
  reducers: {
    addItem: (state, action) => {
      const newName = action.payload;

      const duplicateItems = state.filter(item => {
        return item.name === newName;
      });

      if (duplicateItems.length === 0) {
        state.push({
          ident: newName.replace(/[^a-z0-9]/gi, '-').toLowerCase(),
          name: newName
        });

        state.sort((a, b) => {
          return (a.ident < b.ident ? -1 : (a.ident > b.ident ? 1 : 0));
        })
      }
    }
  }
});

export const {addItem} = itemsSlice.actions;

export const getItems = state => state.items;

export default itemsSlice.reducer;
