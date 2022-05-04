import React from 'react';
import { Modal } from '../../layout/Modal';
import { CreateItemForm } from '../items/CreateItemForm';
import { SelectItemForm } from './SelectItemForm';
import { Item } from './Item';
import { useDispatch } from 'react-redux';
import { deselectLocation, toggleLocationItemVisibility } from '../locations/LocationsSlice';

export function Location (props) {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('');

  const locationClass = 'border-l border-r border-b border-gray-850 p-1 rounded-sm'
    + (props.isFirst ? ' rounded-t-sm border-t' : '')
    + (props.isLast ? ' rounded-b-sm' : '');

  const headingsTitle = props.location.itemsVisible ? 'Minimize this Location' : 'Maximize this Location';
  const itemWrapperClass = props.location.itemsVisible ? 'block' : 'hidden';

  const items = props.location.items.map(item =>
    <Item item={item} locationIdent={props.location.ident} key={item.ident}/>
  );

  function toggleItemsVisible () {
    dispatch(toggleLocationItemVisibility(props.location.ident));
  }

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

  function removeLocation () {
    if (confirm('Do you really want to remove this location from the trades? All associated items will be deleted. The location will still be available in the location list.')) {
      dispatch(deselectLocation(props.location.ident));
    }
  }

  function closeModal () {
    setModalVisible(false);
    setModalContent('');
  }

  return (
    <div data-ident={props.location.ident} className={locationClass}>
      <div className="flex items-center">
        <button title={headingsTitle} onClick={toggleItemsVisible} className="mr-1 text-xxs cursor-pointer font-mono">
          {props.location.itemsVisible ? <span>-</span> : <span>+</span>}
        </button>
        <h4 className="text-lg font-bold">
          {props.location.name}
        </h4>
        <button
          className="py-1 px-2 ml-auto text-xxs border border-gray-700 hover:border-orange-700 hover:bg-orange-700 hover:text-white rounded-sm"
          onClick={selectNewItem}>
          Add Item
        </button>
        <button
          className="py-1 px-2 ml-1 text-xxs border border-gray-700 hover:border-red-800 hover:bg-red-800 hover:text-white rounded-sm"
          onClick={removeLocation} title="Remove this Location">
          &times;
        </button>
      </div>

      {props.location.items.length > 0 &&
      <div className={itemWrapperClass}>{items}</div>
      }

      {modalVisible &&
      <Modal visible={modalVisible} closeModal={closeModal}>{modalContent}</Modal>
      }
    </div>
  );
}
