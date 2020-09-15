import React from 'react';
import { useDispatch } from 'react-redux';

import { addItem } from './itemsSlice';

export function CreateItemForm (props) {
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');

  function handleSubmit (event) {
    event.preventDefault();

    if (event.target.checkValidity()) {
      dispatch(addItem(name));
      props.closeForm();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl mb-4">Create new Item</h3>

      <label htmlFor="item-name">Item Name</label>
      <input type="text" id="item-name" value={name} minLength="1" autoFocus required
        onChange={e => setName(e.target.value)} className="w-full py-2 px-3 rounded-sm my-4 bg-gray-700 shadow-sm"/>
      <button type="submit"
        className="py-2 px-3 bg-orange-600 hover:bg-orange-700 rounded-sm">
        Add Item
      </button>
    </form>
  );
}
