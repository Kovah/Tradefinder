import React from 'react';
import { useSelector } from 'react-redux';

import { getItems } from './itemsSlice';
import { NewItemForm } from './NewItemForm';

export function ItemOverview () {
  let items = useSelector(getItems);
  const [formVisible, setFormVisible] = React.useState(false);

  const listItems = items.map((item) =>
    <div className="border border-gray-700 p-6 text-center text-2xl rounded-sm"
      key={item.ident} data-key={item.ident}>
      {item.name}
    </div>
  );

  function toggleForm () {
    setFormVisible(!formVisible);
  }

  return (
    <div>
      <div className="flex items-center">
        <h2 className="mr-4 text-2xl">Items</h2>
        <button
          className="py-2 px-3 ml-auto bg-orange-600 hover:bg-orange-700 rounded-sm"
          onClick={toggleForm}>
          Add +
        </button>
      </div>

      <div className={'mt-4 ' + (formVisible ? '' : 'hidden')}>
        <NewItemForm/>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        {listItems}
      </div>
    </div>
  );
}
