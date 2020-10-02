import React from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../layout/Modal';
import { SelectLocationForm } from './SelectLocationForm';
import { Location } from './Location';
import { getSelectedLocations } from '../locations/LocationsSlice';
import { CreateLocationForm } from '../locations/CreateLocationForm';
import { Trades } from './Trades';

export function TradingOverview () {
  const tradingLocations = useSelector(getSelectedLocations);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('');

  const locationDisplay = tradingLocations.map(location =>
    <Location key={location.ident} location={location}/>
  );

  function selectNewLocation () {
    setModalContent(
      <div>
        <SelectLocationForm closeForm={closeModal}/>
        <button className="mt-6 text-sm text-gray-400 hover:text-gray-200" onClick={addAndSelectNewLocation}>
          Add new Location
        </button>
      </div>
    );
    setModalVisible(true);
  }

  function addAndSelectNewLocation () {
    setModalContent(
      <div>
        <CreateLocationForm closeForm={closeModal} selectAfterAdding={true}/>
        <button className="mt-6 text-sm text-gray-400 hover:text-gray-200" onClick={selectNewLocation}>
          Add existing Location
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
    <div>
      <div className="flex items-center">
        <h2 className="mr-4 text-2xl font-bold">Trading</h2>
        <button className="py-2 px-3 ml-auto text-sm bg-orange-600 hover:bg-orange-700 rounded-sm" onClick={selectNewLocation}>
          Add Location
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-3">
        <div className="md:col-span-3">
          <h3 className="text-xl mb-2">Locations</h3>
          <div className="grid gap-2">
            {locationDisplay}
          </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-xl mb-2">Trades</h3>
          <Trades/>
        </div>
      </div>

      {modalVisible &&
      <Modal visible={modalVisible} closeModal={closeModal}>{modalContent}</Modal>
      }

    </div>
  );
}
