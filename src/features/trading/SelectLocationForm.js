import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations, getSelectedLocationIdents, selectExistingLocation } from '../locations/LocationsSlice';

export function SelectLocationForm (props) {
  const dispatch = useDispatch();
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
      dispatch(selectExistingLocation(locationSelect.current.value));
      props.closeForm();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl mb-4">Select existing Location</h3>

      <label htmlFor="location-ident">Location</label>
      <select name="location-ident" id="location-ident" required ref={locationSelect}
        className="input">
        {locationOptions}
      </select>
      <button type="submit" className="btn btn-primary">
        Select Location
      </button>
    </form>
  );
}
