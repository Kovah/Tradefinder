import React from 'react';
import { useSelector } from 'react-redux';
import { getLocations } from '../locations/LocationsSlice';
import { getItems } from '../items/ItemsSlice';
import { formatNumber } from '../../app/helper';
import { getOptions } from '../options/OptionsSlice';

export function Trades () {
  const allItems = useSelector(getItems);
  const locations = useSelector(getLocations);
  const options = useSelector(getOptions);

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
    <div className="border border-gray-850 p-2 rounded-sm" key={trade.from+trade.item+trade.to}>
      <div className="flex items-center justify-between">
        <div className="flex-1 text-red-400">{trade.from}</div>
        <div className="px-3 text-sm text-gray-500">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
        </div>
        <div className="flex-1 text-right text-green-400">{trade.to}</div>
      </div>
      <div className="flex items-center justify-between my-2">
        <div className="flex-1 text-sm text-gray-500">Buy {formatNumber(trade.amount, options.numberFormat)} @ <span className="text-red-400">{formatNumber(trade.buyFor, options.numberFormat)}</span></div>
        <div className="flex-1 px-2 text-sm text-center">{trade.item}</div>
        <div className="flex-1 pl-2 text-sm text-right text-gray-500">Sell @ <span className="text-green-400">{formatNumber(trade.sellFor, options.numberFormat)}</span></div>
      </div>
      <div className="text-right text-sm">
        Profit: {formatNumber(trade.profitTotal, options.numberFormat)}
      </div>
    </div>
  );

  return (
    <div className="grid gap-2">
      {allTrades.length > 0 &&
      allTrades
      }
      {allTrades.length === 0 &&
      <div className="text-center my-6 opacity-25">No trades available yet.</div>
      }
    </div>
  );
}
