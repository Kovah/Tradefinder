import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeNumberFormat, getOptions } from './OptionsSlice';
import { deleteAllLocations } from '../locations/LocationsSlice';
import { deleteAllItems } from '../items/ItemsSlice';

export function Options () {
  const dispatch = useDispatch();

  const options = useSelector(getOptions);

  function doChangeNumberFormat (event) {
    dispatch(changeNumberFormat(event.target.value));
  }

  function doCleanStart () {
    if (confirm('Do you really want to proceed? All current location and item data will be lost forever!')) {
      dispatch(deleteAllLocations());
      dispatch(deleteAllItems());
      alert('All locations and items were deleted successfully. You can add new data now.');
    }
  }

  function doCompleteWipe () {
    if (confirm('Do you really want to proceed? All data will be lost forever!')) {
      localStorage.removeItem('state');
      alert('All data was successfully deleted. The application will now reload.');
      window.location.reload(true);
    }
  }

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold">Options</h2>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">

        <div>
          <label htmlFor="option-number-format" className="block text-xl">Number Format</label>
          <small>Change how numbers appear in the application.</small>
          <select name="option-number-format" id="option-number-format"
            value={options.numberFormat} onChange={doChangeNumberFormat}
            className="w-full py-2 px-3 rounded-sm mt-4 bg-gray-700 shadow-sm">
            <option value="en-US">US (10,000.00)</option>
            <option value="de-DE">EU (10.000,00)</option>
          </select>
        </div>

      </div>

      <div className="mt-16 p-4 border border-red-700 rounded-sm">
        <h2 className="text-xl font-bold text-red-500">Danger Zone</h2>

        <div className="mt-8">
          <h3 className="text-red-500">Clean Start</h3>
          <small>Deletes all locations and items to start with a blank canvas. This operation cannot be undone!</small>
          <div className="mt-2">
            <button className="py-2 px-3 bg-red-600 hover:bg-red-700 rounded-sm text-xs" onClick={doCleanStart}>
              Start clean
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-red-500">Complete Wipe</h3>
          <small>Deletes all personal data and restores the example state of the application. This operation cannot be
            undone!</small>
          <div className="mt-2">
            <button className="py-2 px-3 bg-red-600 hover:bg-red-700 rounded-sm text-xs" onClick={doCompleteWipe}>
              Wipe all data
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
