import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteLocation, editLocation } from './LocationsSlice';

export function EditLocationForm (props) {
  const dispatch = useDispatch();
  const [name, setName] = React.useState(props.oldName);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  function handleSubmit (event) {
    event.preventDefault();

    if (event.target.checkValidity()) {
      dispatch(editLocation({ident: props.ident, newName: name}));
      props.closeForm();
    }
  }

  function doDeleteLocation () {
    dispatch(deleteLocation(props.ident));
    props.closeForm();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl mb-4">Edit {props.oldName}</h3>
      <input type="hidden" value={props.ident}/>

      <label htmlFor="edit-location-name" className="block mb-2">Location Name</label>
      <input type="text" id="edit-location-name" value={name} minLength="1" autoFocus required
        onChange={e => setName(e.target.value)} className="my-4 input"/>

      {confirmDelete &&
        <div className="mb-4 border border-red-400 p-3 text-sm">
          <p className="text-red-300">This deletes the location, its item values, and related trades.</p>
          <div className="mt-3 flex items-center justify-end gap-2">
            <button type="button" className="btn btn-sm" onClick={() => setConfirmDelete(false)}>Cancel</button>
            <button type="button" onClick={doDeleteLocation} className="btn btn-sm btn-danger">Delete Location</button>
          </div>
        </div>
      }

      <div className="flex items-center">
        <button type="button" onClick={() => setConfirmDelete(true)} className="btn btn-danger">
          Delete Location
        </button>
        <button type="submit" className="ml-auto btn btn-primary">
          Update Location
        </button>
      </div>
    </form>
  );
}
