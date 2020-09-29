import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations } from '../locations/LocationsSlice';
import { getItems } from '../items/itemsSlice';

export function Trades () {
  const dispatch = useDispatch();

  const allItems = useSelector(getItems);
  const locations = useSelector(getLocations);

  let possibleTrades = [];

  // Loop through all locations to find trades
  locations.forEach(location => {
    if (location.items.length === 0) {
      return;
    }

    location.items.forEach(item => {
      // Test only items which can be sold
      if (item.sellAmount <= 0 || item.sellValue <= 0) {
        return;
      }

      locations.forEach(newLocation => {
        // Abort if location is the same or no items are present
        if (newLocation.ident === location.ident || location.items.length === 0) {
          return false;
        }

        const possibleItem = newLocation.items.find(newItem => newItem.ident === item.ident);
        if (typeof possibleItem === 'undefined') {
          return;
        }

        if (
          // Abort if item will not be bought
          (possibleItem.buyAmount <= 0 || possibleItem.buyValue <= 0)
          // Abort if no profit can be made
          || (item.sellValue >= possibleItem.buyValue)
        ) {
          return;
        }

        const itemAmount = Math.min(item.sellAmount, possibleItem.buyAmount);
        possibleTrades.push({
          from: location.name,
          to: newLocation.name,
          item: allItems.find(searchItem => searchItem.ident === item.ident).name,
          amount: itemAmount,
          buyFor: item.sellValue,
          sellFor: possibleItem.buyValue,
          profit: possibleItem.buyValue - item.sellValue,
          profitTotal: (possibleItem.buyValue - item.sellValue) * itemAmount
        });

        possibleTrades.sort((a,b) => a.profitTotal < b.profitTotal ? 1 : 0);
      });
    });
  });

  const allTrades = possibleTrades.map(trade =>
    <div className="border border-gray-700 p-3 rounded-sm mb-3" key={trade.from+trade.item+trade.to}>
      <div className="flex items-center justify-between">
        <div className="flex-1 text-red-500">{trade.from}</div>
        <div className="px-3 text-sm text-gray-500">&gt;</div>
        <div className="flex-1 text-right text-green-500">{trade.to}</div>
      </div>
      <div className="flex items-center justify-between my-2">
        <div className="flex-1 text-sm text-gray-500">Buy {trade.amount} @ <span className="text-red-500">{trade.buyFor}</span></div>
        <div className="flex-1 px-2 text-sm text-center">{trade.item}</div>
        <div className="flex-1 pl-2 text-sm text-right text-gray-500">Sell @ <span className="text-green-500">{trade.sellFor}</span></div>
      </div>
      <div className="text-right text-sm">
        Profit: {trade.profitTotal.toFixed(2)}
      </div>
    </div>
  );

  return (
    <div>
      {allTrades.length > 0 &&
      allTrades
      }
    </div>
  );
}
