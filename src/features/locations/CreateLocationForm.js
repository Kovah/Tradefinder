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
      <input type="text" id="item-name" value={name} onChange={e => setName(e.target.value)}
        minLength="1" required className="w-full py-2 px-3 rounded-sm my-4 bg-gray-700 shadow-sm"/>
      <button type="submit"
        className="py-2 px-3 bg-orange-600 hover:bg-orange-700 rounded-sm">
        Add Location
      </button>
    </form>
  )
}
