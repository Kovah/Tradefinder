import React from 'react';
import { useSelector } from 'react-redux';

import { getLocations } from './LocationsSlice';
import { Modal } from '../../layout/Modal';
import { CreateLocationForm } from './CreateLocationForm';
import { EditLocationForm } from './EditLocationForm';

export function LocationOverview () {
  let locations = useSelector(getLocations);

  const [modalContent, setModalContent] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const listLocations = locations.map((location) =>
    <button type="button" className="border border-gray-850 p-4 text-center text-2xl rounded-sm
                    hover:border-primary-700 hover:shadow-md transition-shadow"
      key={location.ident} onClick={() => toggleEditForm(location)}>
      {location.name}
    </button>
  );

  function toggleCreateForm () {
    setModalContent(<CreateLocationForm closeForm={closeModal}/>);
    setModalVisible(true);
  }

  function toggleEditForm (location) {
    setModalContent(
      <EditLocationForm ident={location.ident} oldName={location.name} closeForm={closeModal}/>
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
        <h2 className="mr-4 text-2xl font-bold">Locations</h2>
        <button type="button" className="ml-auto btn btn-primary" onClick={toggleCreateForm}>
          Add Location
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {listLocations.length > 0 ? listLocations : <p className="text-sm text-gray-500">No locations available yet.</p>}
      </div>

      {modalVisible &&
      <Modal visible={modalVisible} closeModal={closeModal}>{modalContent}</Modal>
      }

    </div>
  );
}
