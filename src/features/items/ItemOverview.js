import React from 'react';
import { useSelector } from 'react-redux';

import { getItems } from './itemsSlice';
import { CreateItemForm } from './CreateItemForm';
import { EditItemForm } from './EditItemForm';
import { Modal } from '../../layout/Modal';

export function ItemOverview () {
  let items = useSelector(getItems);

  const [createFormVisible, setCreateFormVisible] = React.useState(false);
  const [editForm, setEditForm] = React.useState('');
  const [editFormVisible, setEditFormVisible] = React.useState(false);

  const listItems = items.map((item) =>
    <div className="border border-gray-700 p-4 text-center text-2xl rounded-sm
                    cursor-pointer hover:shadow-md transition-shadow duration-200"
      key={item.ident} data-ident={item.ident} onClick={toggleEditForm}>
      {item.name}
    </div>
  );

  function toggleCreateForm () {
    setCreateFormVisible(!createFormVisible);
  }

  function toggleEditForm (event) {
    setEditForm(
      <EditItemForm ident={event.target.dataset.ident} oldName={event.target.innerText} closeForm={closeEditForm}/>
    );
    setEditFormVisible(true);
  }

  function closeEditForm () {
    setEditForm('');
    setEditFormVisible(false);
  }

  return (
    <div className="relative">
      <div className="flex items-center">
        <h2 className="mr-4 text-2xl">Items</h2>
        <button
          className="py-2 px-3 ml-auto bg-orange-600 hover:bg-orange-700 rounded-sm"
          onClick={toggleCreateForm}>
          Add +
        </button>
      </div>

      <div className={'mt-4 ' + (createFormVisible ? '' : 'hidden')}>
        <CreateItemForm/>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {listItems}
      </div>

      { editFormVisible &&
        <Modal visible={editFormVisible} closeModal={closeEditForm}>{editForm}</Modal>
      }

    </div>
  );
}
