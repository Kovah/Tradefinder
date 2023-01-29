import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteLocation, editLocation } from './LocationsSlice';

export function EditLocationForm (props) {
  const dispatch = useDispatch();
  const [name, setName] = React.useState(props.oldName);

  function handleSubmit (event) {
    event.preventDefault();

    if (event.target.checkValidity()) {
      dispatch(editLocation({ident: props.ident, newName: name}));
      props.closeForm();
    }
  }

  function doDeleteLocation () {
    if (confirm('Do you really want to delete this location? Any associated items and trades will be lost.')) {
      dispatch(deleteLocation(props.ident));
      props.closeForm();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl mb-4">Edit {props.oldName}</h3>
      <input type="hidden" value={props.ident}/>

      <label htmlFor="item-name" className="block mb-2">Location Name</label>
      <input type="text" id="item-name" value={name} minLength="1" autoFocus required
        onChange={e => setName(e.target.value)} className="w-full py-2 px-3 mb-4 rounded-sm bg-gray-700 shadow-sm"/>

      <div className="flex items-center">
        <button type="submit" className="mr-3 py-2 px-3 bg-orange-600 hover:bg-orange-700 rounded-sm">
          Update Location
        </button>
        <button type="button" onClick={doDeleteLocation}
          className="ml-auto py-2 px-3 text-sm border border-red-400 hover:border-red-600 hover:bg-gray-850 rounded-sm">
          Delete Location
        </button>
      </div>
    </form>
  );
}
