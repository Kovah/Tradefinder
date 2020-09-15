import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations, getSelectedLocationIdents } from '../locations/LocationsSlice';

export function SelectLocationForm (props) {
  const availableLocations = useSelector(getLocations);
  const selectedLocations = useSelector(getSelectedLocationIdents);
  const locationSelect = React.createRef();

  const selectableLocations = availableLocations.filter(location => {
    return !selectedLocations.includes(location.ident);
  });

  const locationOptions = selectableLocations.map(location =>
    <option value={location.ident} key={location.ident}>{location.name}</option>
  );

  function handleSubmit (event) {
    event.preventDefault();

    if (event.target.checkValidity()) {
      console.log(locationSelect.current.value); //@DEBUG
      props.closeForm();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl mb-4">Select existing Location</h3>

      <label htmlFor="location-ident">Location</label>
      <select name="location-ident" id="location-ident" required ref={locationSelect}
        className="w-full py-2 px-3 rounded-sm my-4 bg-gray-700 shadow-sm">
        {locationOptions}
      </select>
      <button type="submit" className="py-2 px-3 bg-orange-600 hover:bg-orange-700 rounded-sm">
        Select Location
      </button>
    </form>
  );
}