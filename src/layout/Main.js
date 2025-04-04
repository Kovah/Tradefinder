import React from 'react';
import { ItemOverview } from '../features/items/ItemOverview';
import { LocationOverview } from '../features/locations/LocationOverview';
import { TradingOverview } from '../features/trading/TradingOverview';
import { About } from '../features/about/About';
import { useDispatch, useSelector } from 'react-redux';
import { changeSavedTab, getSavedTab } from '../features/options/OptionsSlice';
import { Options } from '../features/options/Options';

export const T_TRADING = 'TRADING';
export const T_ITEMS = 'ITEMS';
export const T_LOCATIONS = 'LOCATIONS';
export const T_ABOUT = 'ABOUT';
export const T_OPTIONS = 'OPTIONS';

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
  } else if (activeTab === T_OPTIONS) {
    tabContent = <Options/>;
  }

  function changeTab (toTab) {
    setActiveTab(toTab);
    dispatch(changeSavedTab(toTab));
  }

  function tabClass (isActive) {
    return 'py-3 px-2 sm:px-4 cursor-pointer border-r border-gray-900 hover:bg-gray-800 ' + (isActive ? 'bg-gray-800' : 'bg-gray-850');
  }

  return (
    <div className="my-8">
      <div className="flex trading-wider sm:tracking-widest text-xs">
        <div className={tabClass(activeTab === T_ABOUT)} onClick={() => changeTab(T_ABOUT)}>
          About
        </div>
        <div className={tabClass(activeTab === T_TRADING)} onClick={() => changeTab(T_TRADING)}>
          Trading
        </div>
        <div className={tabClass(activeTab === T_LOCATIONS)} onClick={() => changeTab(T_LOCATIONS)}>
          Locations
        </div>
        <div className={tabClass(activeTab === T_ITEMS)} onClick={() => changeTab(T_ITEMS)}>
          Items
        </div>
        <div className={tabClass(activeTab === T_OPTIONS)} onClick={() => changeTab(T_OPTIONS)}>
          Options
        </div>
      </div>
      <div className="p-4 bg-gray-800 shadow-lg rounded-xs rounded-t-none">
        {tabContent}
      </div>

    </div>
  );
}
