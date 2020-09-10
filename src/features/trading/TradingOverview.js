import React from 'react';

export function TradingOverview () {
  return (
    <div>
      <div className="flex items-center">
        <h2 className="mr-4 text-2xl">Trading</h2>
        <button className="py-2 px-3 ml-auto bg-orange-600 hover:bg-orange-700 rounded-sm">
          Add Location
        </button>
      </div>
    </div>
  );
}
