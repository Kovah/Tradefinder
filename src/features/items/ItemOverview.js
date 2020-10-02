import React from 'react';
import { useSelector } from 'react-redux';

import { getItems } from './itemsSlice';
import { CreateItemForm } from './CreateItemForm';
import { EditItemForm } from './EditItemForm';
import { Modal } from '../../layout/Modal';

export function ItemOverview () {
  let items = useSelector(getItems);

  const [modalContent, setModalContent] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const listItems = items.map((item) =>
    <div className="border border-gray-700 p-4 text-center text-2xl rounded-sm
                    cursor-pointer hover:shadow-md transition-shadow duration-200"
      key={item.ident} data-ident={item.ident} onClick={toggleEditForm}>
      {item.name}
    </div>
  );

  function toggleCreateForm () {
    setModalContent(<CreateItemForm closeForm={closeModal}/>);
    setModalVisible(true);
  }

  function toggleEditForm (event) {
    setModalContent(
      <EditItemForm ident={event.target.dataset.ident} oldName={event.target.innerText} closeForm={closeModal}/>
    );
    setModalVisible(true);
  }

  function closeModal () {
    setModalContent('');
    setModalVisible(false);
  }

  return (
    <div className="relative">
      <div className="flex items-center">
        <h2 className="mr-4 text-2xl font-bold">Items</h2>
        <button className="py-2 px-3 ml-auto text-sm bg-orange-600 hover:bg-orange-700 rounded-sm"
          onClick={toggleCreateForm}>
          Add Item
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {listItems}
      </div>

      { modalVisible &&
        <Modal visible={modalVisible} closeModal={closeModal}>{modalContent}</Modal>
      }

    </div>
  );
}
