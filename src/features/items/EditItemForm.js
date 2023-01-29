import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteItem, editItem } from './ItemsSlice';
import { removeItemFromAllLocations } from '../locations/LocationsSlice';

export function EditItemForm (props) {
  const dispatch = useDispatch();
  const [name, setName] = React.useState(props.oldName);

  function handleSubmit (event) {
    event.preventDefault();

    if (event.target.checkValidity()) {
      dispatch(editItem({ident: props.ident, newName: name}));
      props.closeForm();
    }
  }

  function doDeleteItem () {
    if (confirm('Do you really want to delete this Item? It will be removed from any associated locations and trades.')) {
      dispatch(removeItemFromAllLocations(props.ident));
      dispatch(deleteItem(props.ident));
      props.closeForm();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl mb-4">Edit {props.oldName}</h3>
      <input type="hidden" value={props.ident}/>

      <label htmlFor="item-name" className="block mb-2">Item Name</label>
      <input type="text" id="item-name" value={name} minLength="1" autoFocus required
        onChange={e => setName(e.target.value)} className="w-full py-2 px-3 mb-4 rounded-sm bg-gray-700 shadow-sm"/>

      <div className="flex items-center">
        <button type="submit" className="py-2 px-3 bg-orange-600 hover:bg-orange-700 rounded-sm">
          Change Item
        </button>
        <button type="button" onClick={doDeleteItem}
          className="ml-auto py-2 px-3 text-sm border border-red-400 hover:border-red-600 hover:bg-gray-850 rounded-sm">
          Delete Item
        </button>
      </div>
    </form>
  );
}
