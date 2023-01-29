import React, { useEffect, useRef } from 'react';
import { getItems } from '../items/ItemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromLocation, updateItemValue } from '../locations/LocationsSlice';

export function Item (props) {
  const dispatch = useDispatch();
  const dataChanged = useRef(false);

  const inputClass = 'p-1 rounded-sm bg-gray-800 border border-gray-850 text-xs text-right';

  const allItems = useSelector(getItems);
  const itemDetails = allItems.find(item => {
    return item.ident === props.item.ident;
  });

  const [buyAmount, setBuyAmount] = React.useState(props.item.buyAmount);
  const [buyValue, setBuyValue] = React.useState(props.item.buyValue);
  const [sellAmount, setSellAmount] = React.useState(props.item.sellAmount);
  const [sellValue, setSellValue] = React.useState(props.item.sellValue);

  // Listen to changes of the buy and sell values and amounts
  useEffect(() => {
    // Only update the item if some data was changed, or it will end in an endless React hook loop
    if (dataChanged.current) {
      dispatch(updateItemValue({
        location: props.locationIdent,
        item: {
          ident: props.item.ident,
          buyAmount: parseFloat(buyAmount),
          buyValue: parseFloat(buyValue),
          sellAmount: parseFloat(sellAmount),
          sellValue: parseFloat(sellValue)
        }
      }));
    }
  }, [buyAmount, buyValue, sellAmount, sellValue]);

  function doRemoveItem () {
    if (confirm('Do you really want to remove this item?')) {
      dispatch(removeItemFromLocation({location: props.locationIdent, item: props.item.ident}));
    }
  }

  function changeBuyAmount (e) {
    dataChanged.current = true;
    setBuyAmount(e.target.value);
  }

  function changeBuyValue (e) {
    dataChanged.current = true;
    setBuyValue(e.target.value);
  }

  function changeSellAmount (e) {
    dataChanged.current = true;
    setSellAmount(e.target.value);
  }

  function changeSellValue (e) {
    dataChanged.current = true;
    setSellValue(e.target.value);
  }

  return (
    <div className="location-item border-b border-gray-850 py-1 grid grid-cols-1 sm:grid-cols-3 gap-1 text-xs">

      <h4 className="break-words">
        {itemDetails.name}
        <button className="location-item-remove hidden text-xs text-gray-500 hover:text-red-400 focus:text-red-400 py-0 px-2"
          onClick={doRemoveItem} title="Remove this Item">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
        </button>
      </h4>

      <div>
        <div className="grid grid-cols-3 gap-1 mb-1 text-center text-gray-500">
          <div className="text-xxs pt-1">Amount</div>
          <div className="uppercase text-green-400 opacity-75">Buys</div>
          <div className="text-xxs pt-1">Value</div>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <input type="number" value={buyAmount} className={inputClass} step="0.01" onChange={changeBuyAmount}/>
          <input type="number" value={buyValue} className={inputClass} step="0.01" onChange={changeBuyValue}/>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-1 mb-1 text-center text-gray-500">
          <div className="text-xxs pt-1">Value</div>
          <div className="uppercase text-red-400 opacity-75">Sells</div>
          <div className="text-xxs pt-1">Amount</div>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <input type="number" value={sellValue} className={inputClass} step="0.01" onChange={changeSellValue}/>
          <input type="number" value={sellAmount} className={inputClass} step="0.01" onChange={changeSellAmount}/>
        </div>
      </div>

    </div>
  );
}
