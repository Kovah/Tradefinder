import React from 'react';
import { useSelector } from 'react-redux';

import { getItems } from './ItemsSlice';
import { CreateItemForm } from './CreateItemForm';
import { EditItemForm } from './EditItemForm';
import { Modal } from '../../layout/Modal';

export function ItemOverview () {
  let items = useSelector(getItems);

  const [modalContent, setModalContent] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const listItems = items.map((item) =>
    <button type="button" className="border border-gray-850 p-4 text-center text-2xl rounded-sm
                    hover:border-primary-700 hover:shadow-md transition-shadow duration-200"
      key={item.ident} onClick={() => toggleEditForm(item)}>
      {item.name}
    </button>
  );

  function toggleCreateForm () {
    setModalContent(<CreateItemForm closeForm={closeModal}/>);
    setModalVisible(true);
  }

  function toggleEditForm (item) {
    setModalContent(
      <EditItemForm ident={item.ident} oldName={item.name} closeForm={closeModal}/>
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
        <button type="button" className="ml-auto btn btn-primary" onClick={toggleCreateForm}>
          Add Item
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {listItems.length > 0 ? listItems : <p className="text-sm text-gray-500">No items available yet.</p>}
      </div>

      { modalVisible &&
        <Modal visible={modalVisible} closeModal={closeModal}>{modalContent}</Modal>
      }

    </div>
  );
}
