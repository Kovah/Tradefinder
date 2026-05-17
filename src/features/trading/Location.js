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
  const [confirmRemove, setConfirmRemove] = React.useState(false);

  const locationClass = 'border-l border-r border-b border-gray-850 p-1 rounded-xs'
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
        <button type="button" className="mt-6 text-sm text-gray-400 hover:text-gray-200" onClick={addAndSelectNewItem}>
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
        <button type="button" className="mt-6 text-sm text-gray-400 hover:text-gray-200" onClick={selectNewItem}>
          Add existing Item
        </button>
      </div>
    );
    setModalVisible(true);
  }

  function removeLocation () {
    dispatch(deselectLocation(props.location.ident));
  }

  function closeModal () {
    setModalVisible(false);
    setModalContent('');
  }

  return (
    <div data-ident={props.location.ident} className={locationClass}>
      <div className="flex items-center">
        <button type="button" title={headingsTitle} onClick={toggleItemsVisible} className="mr-1 text-xxs cursor-pointer font-mono">
          {props.location.itemsVisible ? <span>-</span> : <span>+</span>}
        </button>
        <h4 className="text-lg font-bold">
          {props.location.name}
        </h4>
        <button type="button" className="ml-auto btn btn-xs" onClick={selectNewItem}>
          Add Item
        </button>
        <button type="button" className="ml-1 btn btn-xs" onClick={() => setConfirmRemove(true)} title="Remove this Location">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
        </button>
      </div>

      {confirmRemove &&
        <div className="my-2 border border-red-400 p-2 text-xs">
          <p className="text-red-300">Remove this location from trading and clear its item values?</p>
          <div className="mt-2 flex items-center justify-end gap-2">
            <button type="button" className="btn btn-xs" onClick={() => setConfirmRemove(false)}>Cancel</button>
            <button type="button" className="btn btn-xs btn-danger" onClick={removeLocation}>Remove</button>
          </div>
        </div>
      }

      {props.location.items.length > 0 &&
      <div className={itemWrapperClass}>{items}</div>
      }

      {modalVisible &&
      <Modal visible={modalVisible} closeModal={closeModal}>{modalContent}</Modal>
      }
    </div>
  );
}
