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

const tabs = [
  { id: T_ABOUT, label: 'About' },
  { id: T_TRADING, label: 'Trading' },
  { id: T_LOCATIONS, label: 'Locations' },
  { id: T_ITEMS, label: 'Items' },
  { id: T_OPTIONS, label: 'Options' },
];

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
    return 'py-3 px-2 sm:px-4 border-r border-gray-900 hover:bg-gray-800 focus:outline-hidden focus:bg-gray-800 ' + (isActive ? 'bg-gray-800 text-white' : 'bg-gray-850 text-gray-300');
  }

  return (
    <div className="my-8">
      <div className="flex overflow-x-auto trading-wider sm:tracking-widest text-xs" role="tablist" aria-label="Tradefinder sections">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            id={`tab-${tab.id.toLowerCase()}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls="main-panel"
            className={tabClass(activeTab === tab.id)}
            onClick={() => changeTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div id="main-panel" role="tabpanel" aria-labelledby={`tab-${activeTab.toLowerCase()}`} className="p-4 bg-gray-800 shadow-lg rounded-xs rounded-t-none">
        {tabContent}
      </div>

    </div>
  );
}
