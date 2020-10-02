import React from 'react';

export function About () {

  return (
    <div>
      <h2 className="text-2xl font-bold">About the Tradefinder</h2>
      <div className="mt-4 max-w-2xl">
        <p className="mb-2">The Tradefinder is web tool to find the most profitable trades between two locations, where one is selling a good and another is buying that good at a higher price. Additionally, you may specify the amount that can be bought or sold.<br/>Trades which are not profitable are discarded.</p>
        <h3 className="mt-4 mb-2 text-xl font-bold">How to use the Tradefinder</h3>
        <p className="mb-2">Opening the tool for the first time will add some example locations and some items to it, so you start experimenting right away.</p>
        <p className="mb-2">After adding a location to the trading overview, you can add items to that location. Once added, you can start editing the amounts or prices. If an item is not sold or bought, simply leave the amount and value at zero.</p>
        <p className="mb-0">Once you added at least two locations with the same item, the Tradefinder will calculate the possible trades. If a profitable trade (profit > 0) is found, it will be displayed in the trades overview on the right side.</p>
      </div>
    </div>
  )
}
