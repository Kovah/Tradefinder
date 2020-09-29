import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToLocation } from '../locations/LocationsSlice';
import { getItems } from '../items/itemsSlice';

export function SelectItemForm (props) {
  const dispatch = useDispatch();
  const availableItems = useSelector(getItems);
  const itemSelect = React.createRef();

  const selectableItems = availableItems.filter(newItem => {
    return props.location.items.filter(item => item.ident === newItem.ident).length === 0;
  });

  const itemOptions = selectableItems.map(item =>
    <option value={item.ident} key={item.ident}>{item.name}</option>
  );

  function handleSubmit (event) {
    event.preventDefault();

    if (event.target.checkValidity()) {
      dispatch(addItemToLocation({location: props.location.ident, item: itemSelect.current.value}));
      props.closeForm();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl mb-4">Select existing Item</h3>

      <label htmlFor="item-ident">Item</label>
      <select name="item-ident" id="item-ident" required ref={itemSelect}
        className="w-full py-2 px-3 rounded-sm my-4 bg-gray-700 shadow-sm">
        {itemOptions}
      </select>
      <button type="submit" className="py-2 px-3 bg-orange-600 hover:bg-orange-700 rounded-sm">
        Select Item
      </button>
    </form>
  );
}
