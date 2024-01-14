import React from 'react';
import { useDispatch } from 'react-redux';

import { addAndSelectLocation, addLocation } from './LocationsSlice';

export function CreateLocationForm (props) {
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');

  function handleSubmit (event) {
    event.preventDefault();

    if (event.target.checkValidity()) {
      if (props.selectAfterAdding) {
        dispatch(addAndSelectLocation(name));
      } else {
        dispatch(addLocation(name));
      }

      props.closeForm();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl mb-4">Add new Location</h3>

      <label htmlFor="item-name">Location Name</label>
      <input type="text" id="item-name" value={name} minLength="1" autoFocus required
        onChange={e => setName(e.target.value)} className="my-4 input"/>
      <button type="submit" className="btn btn-primary">
        Add Location
      </button>
    </form>
  )
}
