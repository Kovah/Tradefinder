import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeNumberFormat, getOptions } from './OptionsSlice';

export function Options () {
  const dispatch = useDispatch();

  const options = useSelector(getOptions);

  function doChangeNumberFormat (event) {
    dispatch(changeNumberFormat(event.target.value));
  }

  return (
    <div className="relative">
      <h2 className="mr-4 text-2xl font-bold">Options</h2>

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

    </div>
  );
}
