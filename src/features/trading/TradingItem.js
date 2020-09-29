import React from 'react';
import { getItems } from '../items/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromLocation } from '../locations/LocationsSlice';

export function TradingItem (props) {
  const dispatch = useDispatch();

  const inputClass = 'w-full p-1 rounded-sm bg-gray-800 border border-gray-850 text-xs';
  const inputLabelClass = 'block text-center text-xxs text-gray-600 uppercase';

  const allItems = useSelector(getItems);
  const itemDetails = allItems.find(item => {
    return item.ident === props.item.ident;
  });

  const [buyAmount, setBuyAmount] = React.useState(props.item.buyAmount);
  const [buyValue, setBuyValue] = React.useState(props.item.buyValue);
  const [sellAmount, setSellAmount] = React.useState(props.item.sellAmount);
  const [sellValue, setSellValue] = React.useState(props.item.sellValue);

  function doRemoveItem () {
    if (confirm('Do you really want to remove this item?')) {
      dispatch(removeItemFromLocation({location: props.locationIdent, item: props.item.ident}));
    }
  }

  function onBuyAmountChange (e) {
    setBuyAmount(e.target.value);
  }

  function onBuyValueChange (e) {
    setBuyValue(e.target.value);
  }

  function onSellAmountChange (e) {
    setSellAmount(e.target.value);
  }

  function onSellValueChange (e) {
    setSellValue(e.target.value);
  }

  return (
    <tbody className="border-b border-gray-900 py-1">
    <tr>
      <td rowSpan="2" className="py-1 pr-3 align-text-top text-left">
        <h4 className="text-sm">{itemDetails.name}</h4>
      </td>
      <td colSpan="2" className="pt-1 text-sm text-center text-green-500">Buys</td>
      <td colSpan="2" className="pt-1 text-sm text-center text-red-500">Sells</td>
      <td rowSpan="2" className="align-text-top">
        <button className="text-sm text-gray-500 hover:text-red-500 focus:text-red-500 py-1 px-2"
          onClick={doRemoveItem} title="Remove this Item">&times;</button>
      </td>
    </tr>
    <tr>
      <td className="pb-1">
        <label className={inputLabelClass}>Amount</label>
        <input type="number" value={buyAmount} className={inputClass} onChange={onBuyAmountChange}/>
      </td>
      <td className="pb-1 pr-1">
        <label className={inputLabelClass}>Value</label>
        <input type="number" value={buyValue} className={inputClass} onChange={onBuyValueChange}/>
      </td>
      <td className="pb-1 pl-1">
        <label className={inputLabelClass}>Value</label>
        <input type="number" value={sellValue} className={inputClass} onChange={onSellValueChange}/>
      </td>
      <td className="pb-1">
        <label className={inputLabelClass}>Amount</label>
        <input type="number" value={sellAmount} className={inputClass} onChange={onSellAmountChange}/>
      </td>
    </tr>
    </tbody>
  );
}
