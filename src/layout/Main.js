import React from 'react';
import { ItemOverview } from '../features/items/ItemOverview';

export function Main () {
  const [activeTab, setActiveTab] = React.useState('ITEMS');

  let tabContent;
  if (activeTab === 'ITEMS') {
    tabContent = <ItemOverview/>;
  }

  return (
    <div className="my-8">
      <div className="flex border-b border-gray-700 uppercase tracking-widest text-xs">
        <div className="py-3 px-4 bg-gray-800 rounded-tl-md cursor-pointer border-r border-gray-700"
          onClick={() => setActiveTab('TRADING')}>
          Trading
        </div>
        <div className="py-3 px-4 bg-gray-800 rounded-tr-md cursor-pointer"
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
