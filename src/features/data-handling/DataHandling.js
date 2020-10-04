import React from 'react';
import { saveState } from '../../app/localstorage';
import store from '../../app/store';
import { Modal } from '../../layout/Modal';
import { ImportDataForm } from './ImportDataForm';

export function DataHandling () {

  const [modalContent, setModalContent] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  function saveManually () {
    console.info('Manually saving data to your browser...');
    saveState(store.getState());
  }

  function exportState () {
    setModalContent(
      <div>
        <h3 className="text-2xl mb-4">Export your current Data</h3>
        <pre className="p-3 text-xxs border border-gray-700 break-all whitespace-normal max-h-screen overflow-y-auto">{JSON.stringify(store.getState())}</pre>
      </div>
    );
    setModalVisible(true);
  }

  function importState () {
    setModalContent(<ImportDataForm closeForm={closeModal}/>);
    setModalVisible(true);
  }

  function closeModal () {
    setModalContent('');
    setModalVisible(false);
  }

  return (
    <div>
      <div className="mt-8 text-xs text-center text-gray-500">
        <button className="m-0 p-0 bg-none text-gray-200 hover:text-white" onClick={saveManually}>
          Save manually
        </button>
        <button className="m-0 ml-5 p-0 bg-none text-gray-200 hover:text-white" onClick={exportState}>
          Export
        </button>
        <button className="m-0 ml-5 p-0 bg-none text-gray-200 hover:text-white" onClick={importState}>
          Import
        </button>
      </div>

      {modalVisible &&
      <Modal visible={modalVisible} closeModal={closeModal}>{modalContent}</Modal>
      }

    </div>
  );
}
