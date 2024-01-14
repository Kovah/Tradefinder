import React from 'react';
import { useDispatch } from 'react-redux';

import { addItem } from './ItemsSlice';

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
        onChange={e => setName(e.target.value)} className="my-4 input"/>
      <button type="submit" className="btn btn-primary">
        Add Item
      </button>
    </form>
  );
}
