import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../layout/Modal';
import { SelectLocationForm } from './SelectLocationForm';
import { Location } from './Location';
import { getSelectedLocations, toggleAllLocationItemVisibilities } from '../locations/LocationsSlice';
import { CreateLocationForm } from '../locations/CreateLocationForm';
import { Trades } from './Trades';

export function TradingOverview () {
  const dispatch = useDispatch();
  const tradingLocations = useSelector(getSelectedLocations);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('');
  const [locationItemsVisible, setLocationItemsVisible] = React.useState(true);

  const itemToggleTitle = locationItemsVisible ? 'Minimize all Locations' : 'Maximize all Locations';

  const locationDisplay = tradingLocations.map((location, index, data) =>
    <Location key={location.ident} location={location} isFirst={index === 0} isLast={index === data.length - 1}/>
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

  function toggleLocationDisplay () {
    dispatch(toggleAllLocationItemVisibilities(!locationItemsVisible));
    setLocationItemsVisible(!locationItemsVisible);
  }

  return (
    <div>
      <div className="flex items-center">
        <h2 className="mr-4 text-2xl font-bold">Trading</h2>
        <button className="py-2 px-3 ml-auto text-sm bg-orange-600 hover:bg-orange-700 rounded-sm"
          onClick={selectNewLocation}>
          Add Location
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
        <div className="md:col-span-3">
          <div className="flex items-center mb-2">
            <button title={itemToggleTitle} onClick={toggleLocationDisplay}
              className="mr-1 text-xxs cursor-pointer font-mono">
              {locationItemsVisible ? <span>-</span> : <span>+</span>}
            </button>
            <h3 className="text-lg">Locations</h3>
          </div>
          <div>
            {tradingLocations.length > 0 &&
            locationDisplay
            }
            {tradingLocations.length === 0 &&
            <div className="text-center my-6">
              <span className=" opacity-25">No locations selected yet.</span>
              &nbsp;
              <button onClick={selectNewLocation} className="opacity-50 hover:opacity-100">Select one</button>
            </div>
            }
          </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-lg mb-2">Trades</h3>
          <Trades/>
        </div>
      </div>

      {modalVisible &&
      <Modal visible={modalVisible} closeModal={closeModal}>{modalContent}</Modal>
      }

    </div>
  );
}
