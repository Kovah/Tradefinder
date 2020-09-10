import React from 'react';
import { ItemOverview } from '../features/items/ItemOverview';
import { LocationOverview } from '../features/locations/LocationOverview';
import { TradingOverview } from '../features/trading/TradingOverview';

export function Main () {
  const [activeTab, setActiveTab] = React.useState('TRADING');

  let tabContent;
  if (activeTab === 'ITEMS') {
    tabContent = <ItemOverview/>;
  } else if (activeTab === 'LOCATIONS') {
    tabContent = <LocationOverview/>;
  } else if (activeTab === 'TRADING') {
    tabContent = <TradingOverview/>;
  }

  return (
    <div className="my-8">
      <div className="flex uppercase tracking-widest text-xs">
        <div className={
          'py-3 px-4 rounded-tl-md cursor-pointer border-r border-gray-700 ' + (activeTab === 'TRADING' ? 'bg-gray-800' : 'bg-gray-850')
        } onClick={() => setActiveTab('TRADING')}>
          Trading
        </div>
        <div className={
          'py-3 px-4 cursor-pointer border-r border-gray-700 ' + (activeTab === 'LOCATIONS' ? 'bg-gray-800' : 'bg-gray-850')
        }
          onClick={() => setActiveTab('LOCATIONS')}>
          Locations
        </div>
        <div className={
          'py-3 px-4 rounded-tr-md cursor-pointer ' + (activeTab === 'ITEMS' ? 'bg-gray-800' : 'bg-gray-850')
        }
          onClick={() => setActiveTab('ITEMS')}>
          Items
        </div>
      </div>
      <div className="p-6 bg-gray-800 shadow-lg rounded-sm rounded-t-none">
        {tabContent}
      </div>

    </div>
  );
}
