import React from 'react';
import { ItemOverview } from '../features/items/ItemOverview';
import { LocationOverview } from '../features/locations/LocationOverview';
import { TradingOverview } from '../features/trading/TradingOverview';
import { About } from '../features/about/About';
import { useDispatch, useSelector } from 'react-redux';
import { changeSavedTab, getSavedTab } from '../features/options/OptionsSlice';

export const T_TRADING = 'TRADING';
export const T_ITEMS = 'ITEMS';
export const T_LOCATIONS = 'LOCATIONS';
export const T_ABOUT = 'ABOUT';

export function Main () {
  const dispatch = useDispatch();

  const savedTab = useSelector(getSavedTab);
  const [activeTab, setActiveTab] = React.useState(savedTab);

  let tabContent;
  if (activeTab === T_ITEMS) {
    tabContent = <ItemOverview/>;
  } else if (activeTab === T_LOCATIONS) {
    tabContent = <LocationOverview/>;
  } else if (activeTab === T_TRADING) {
    tabContent = <TradingOverview/>;
  } else if (activeTab === T_ABOUT) {
    tabContent = <About/>;
  }

  function changeTab (toTab) {
    setActiveTab(toTab);
    dispatch(changeSavedTab(toTab));
  }

  return (
    <div className="my-8">
      <div className="flex tracking-widest text-xs">
        <div className={
          'py-3 px-4 rounded-tl-sm cursor-pointer border-r border-gray-900 ' + (activeTab === T_ABOUT ? 'bg-gray-800' : 'bg-gray-850')
        }
          onClick={() => changeTab(T_ABOUT)}>
          About
        </div>
        <div className={
          'py-3 px-4 cursor-pointer border-r border-gray-900 ' + (activeTab === T_TRADING ? 'bg-gray-800' : 'bg-gray-850')
        } onClick={() => changeTab(T_TRADING)}>
          Trading
        </div>
        <div className={
          'py-3 px-4 cursor-pointer border-r border-gray-900 ' + (activeTab === T_LOCATIONS ? 'bg-gray-800' : 'bg-gray-850')
        }
          onClick={() => changeTab(T_LOCATIONS)}>
          Locations
        </div>
        <div className={
          'py-3 px-4 rounded-tr-sm cursor-pointer ' + (activeTab === T_ITEMS ? 'bg-gray-800' : 'bg-gray-850')
        }
          onClick={() => changeTab(T_ITEMS)}>
          Items
        </div>
      </div>
      <div className="p-3 md:p-6 bg-gray-800 shadow-lg rounded-sm rounded-t-none">
        {tabContent}
      </div>

    </div>
  );
}
