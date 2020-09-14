import React from 'react';

export function TradingLocation(props) {
  return (
    <div data-ident={props.location.ident} className="border border-gray-700 p-3 rounded-sm">
      <h3 className="text-xl">{props.location.name}</h3>
    </div>
  )
}
