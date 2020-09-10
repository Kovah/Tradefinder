import React from 'react';
import { useDispatch } from 'react-redux';

import { editLocation } from './LocationsSlice';

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

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl mb-4">Edit {props.oldName}</h3>
      <input type="hidden" value={props.ident}/>

      <label htmlFor="item-name" className="block mb-2">Location Name</label>
      <input type="text" id="item-name" autoFocus value={name} onChange={e => setName(e.target.value)}
        minLength="1" required className="w-full py-2 px-3 mb-4 rounded-sm bg-gray-700 shadow-sm"/>

      <button type="submit" className="py-2 px-3 bg-orange-600 hover:bg-orange-700 rounded-sm">
        Update Location
      </button>
    </form>
  );
}
