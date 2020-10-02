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
    <div className="border border-gray-700 p-4 text-center text-2xl rounded-sm
                    cursor-pointer hover:shadow-md transition-shadow duration-200"
      key={location.ident} data-ident={location.ident} onClick={toggleEditForm}>
      {location.name}
    </div>
  );

  function toggleCreateForm () {
    setModalContent(<CreateLocationForm closeForm={closeModal}/>);
    setModalVisible(true);
  }

  function toggleEditForm (event) {
    setModalContent(
      <EditLocationForm ident={event.target.dataset.ident} oldName={event.target.innerText} closeForm={closeModal}/>
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
        <button className="py-2 px-3 ml-auto text-sm bg-orange-600 hover:bg-orange-700 rounded-sm"
          onClick={toggleCreateForm}>
          Add Location
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {listLocations}
      </div>

      {modalVisible &&
      <Modal visible={modalVisible} closeModal={closeModal}>{modalContent}</Modal>
      }

    </div>
  );
}
