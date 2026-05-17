import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeMinimumProfitAmount,
  changeMinimumProfitType,
  changeNumberFormatDecimals,
  changeNumberFormatLocale,
  getOptions
} from './OptionsSlice';
import { deleteAllLocations } from '../locations/LocationsSlice';
import { deleteAllItems } from '../items/ItemsSlice';
import { Modal } from '../../layout/Modal';

export function Options () {
  const dispatch = useDispatch();

  const options = useSelector(getOptions);
  const [confirmation, setConfirmation] = React.useState(null);

  function doChangeNumberFormatLocale (event) {
    dispatch(changeNumberFormatLocale(event.target.value));
  }

  function doChangeNumberFormatDecimals (event) {
    dispatch(changeNumberFormatDecimals(event.target.value));
  }

  function doChangeMinimumProfitType (event) {
    dispatch(changeMinimumProfitType(event.target.value));
  }

  function doChangeMinimumProfitAmount (event) {
    dispatch(changeMinimumProfitAmount(event.target.value));
  }

  function openCleanStartConfirmation () {
    setConfirmation('clean-start');
  }

  function openCompleteWipeConfirmation () {
    setConfirmation('complete-wipe');
  }

  function closeConfirmation () {
    setConfirmation(null);
  }

  function confirmCleanStart () {
    dispatch(deleteAllLocations());
    dispatch(deleteAllItems());
    closeConfirmation();
  }

  function confirmCompleteWipe () {
    localStorage.removeItem('state');
    window.location.reload();
  }

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold">Options</h2>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">

        <div>
          <label htmlFor="option-number-format-locale" className="block text-xl">Number Format</label>
          <small>Change how numbers appear in the application.</small>
          <select name="option-number-format-locale" id="option-number-format-locale"
            value={options.numberFormat.locale} onChange={doChangeNumberFormatLocale}
            className="input mt-2">
            <option value="en-US">US (10,000.00)</option>
            <option value="de-DE">EU (10.000,00)</option>
            <option value="fr">French (10 000,00)</option>
          </select>
        </div>

        <div>
          <label htmlFor="option-number-format-decimals" className="block text-xl">Decimals</label>
          <small>Choose the amount of decimals displayed for numbers.</small>
          <input type="number" min="0" max="10" name="option-number-format-decimals" id="option-number-format-decimals"
            className="input mt-2"
            value={options.numberFormat.decimals} onChange={doChangeNumberFormatDecimals}/>
        </div>

        <div>
          <label htmlFor="option-minimum-profit-amount" className="block text-xl">Minimum Profit</label>
          <small>Set a minimum amount or percentage a trade must generate.</small>
          <br/>
          <small>Example: if you want to double your investment, set the percentage to 200%.</small>
          <br/>
          <small>Example 2: if you want to earn at least $20 per sold item, set the profit per item to 20.</small>
          <br/>
          <small>Example 3: if you want to earn at least $100 per trade, set the total profit amount to 100.</small>
          <div className="flex items-center mt-2">
            <input type="number" min="0" step="0.01" name="option-minimum-profit-amount"
              id="option-minimum-profit-amount" className="input"
              value={options.minimumProfit.amount} onChange={doChangeMinimumProfitAmount}/>
            <select name="option-minimum-profit-type" id="option-minimum-profit-type"
              value={options.minimumProfit.type} onChange={doChangeMinimumProfitType}
              className="input border-l-0">
              <option value="percent">Profit in Percent</option>
              <option value="value">Profit per item</option>
              <option value="valueTotal">total Profit</option>
            </select>
          </div>
        </div>

      </div>

      <div className="mt-16 p-4 border border-red-400 border-opacity-50 rounded-xs">
        <h2 className="text-xl font-bold text-red-400">Danger Zone</h2>

        <div className="mt-8">
          <h3 className="text-red-400">Clean Start</h3>
          <small>Deletes all locations and items to start with a blank canvas. This operation cannot be undone!</small>
          <div className="mt-2">
            <button type="button" className="btn btn-danger" onClick={openCleanStartConfirmation}>
              Start clean
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-red-400">Complete Wipe</h3>
          <small>Deletes all personal data and restores the example state of the application. This operation cannot be
            undone!</small>
          <div className="mt-2">
            <button type="button" className="btn btn-danger" onClick={openCompleteWipeConfirmation}>
              Wipe all data
            </button>
          </div>
        </div>

      </div>

      {confirmation === 'clean-start' &&
        <Modal visible={true} closeModal={closeConfirmation} label="Confirm clean start">
          <h3 className="text-2xl mb-4">Start Clean?</h3>
          <p className="text-sm text-gray-300">
            This deletes all locations and items. Your display options stay unchanged.
          </p>
          <div className="mt-6 flex items-center justify-end gap-2">
            <button type="button" className="btn" onClick={closeConfirmation}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={confirmCleanStart}>Delete Locations and Items</button>
          </div>
        </Modal>
      }

      {confirmation === 'complete-wipe' &&
        <Modal visible={true} closeModal={closeConfirmation} label="Confirm complete wipe">
          <h3 className="text-2xl mb-4">Wipe All Data?</h3>
          <p className="text-sm text-gray-300">
            This deletes the saved browser data for Tradefinder and reloads the app with example data.
          </p>
          <div className="mt-6 flex items-center justify-end gap-2">
            <button type="button" className="btn" onClick={closeConfirmation}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={confirmCompleteWipe}>Wipe and Reload</button>
          </div>
        </Modal>
      }

    </div>
  );
}
