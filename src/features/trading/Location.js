import React from 'react';
import { Modal } from '../../layout/Modal';
import { CreateItemForm } from '../items/CreateItemForm';
import { SelectItemForm } from './SelectItemForm';
import { Item } from './Item';

export function Location (props) {

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('');

  const items = props.location.items.map(item =>
    <Item item={item} locationIdent={props.location.ident} key={item.ident}/>
  );

  function selectNewItem () {
    setModalContent(
      <div>
        <SelectItemForm closeForm={closeModal} location={props.location}/>
        <button className="mt-6 text-sm text-gray-400 hover:text-gray-200" onClick={addAndSelectNewItem}>
          Add new Item
        </button>
      </div>
    );
    setModalVisible(true);
  }

  function addAndSelectNewItem () {
    setModalContent(
      <div>
        <CreateItemForm closeForm={selectNewItem}/>
        <button className="mt-6 text-sm text-gray-400 hover:text-gray-200" onClick={selectNewItem}>
          Add existing Item
        </button>
      </div>
    );
    setModalVisible(true);
  }

  function closeModal () {
    setModalVisible(false);
    setModalContent('');
  }

  return (
    <div data-ident={props.location.ident} className="border border-gray-700 p-2 rounded-sm">
      <div className="flex items-center">
        <h4 className="text-lg font-bold">{props.location.name}</h4>
        <button
          className="py-1 px-2 ml-auto text-xs border border-orange-800 hover:border-orange-900 hover:bg-gray-850 rounded-sm"
          onClick={selectNewItem}>
          Add Item
        </button>
      </div>

      {props.location.items.length > 0 &&
      <table className="table-auto">
        {items}
      </table>
      }

      {modalVisible &&
      <Modal visible={modalVisible} closeModal={closeModal}>{modalContent}</Modal>
      }
    </div>
  );
}