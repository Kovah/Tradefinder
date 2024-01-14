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
        onChange={e => setName(e.target.value)} className="my-4 input"/>

      <div className="flex items-center">
        <button type="button" onClick={doDeleteLocation} className="btn btn-danger">
          Delete Location
        </button>
        <button type="submit" className="ml-auto btn btn-primary">
          Update Location
        </button>
      </div>
    </form>
  );
}
