import React from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../layout/Modal';
import { SelectLocationForm } from './SelectLocationForm';
import { getTradingLocations } from './TradingSlice';
import { TradingLocation } from './TradingLocation';

export function TradingOverview () {
  const tradingLocations = useSelector(getTradingLocations);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('');

  const locationDisplay = tradingLocations.map(location =>
    <TradingLocation key={location.ident} location={location}/>
  );

  function addNewLocation () {
    setModalContent(
      <SelectLocationForm closeForm={closeModal}/>
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
        <h2 className="mr-4 text-2xl">Trading</h2>
        <button className="py-2 px-3 ml-auto bg-orange-600 hover:bg-orange-700 rounded-sm" onClick={addNewLocation}>
          Add Location
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {locationDisplay}
      </div>

      {modalVisible &&
      <Modal visible={modalVisible} closeModal={closeModal}>{modalContent}</Modal>
      }

    </div>
  );
}
