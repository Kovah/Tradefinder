import React from 'react';
import { ItemOverview } from '../features/items/ItemOverview';

class Main extends React.Component {
  render () {
    return (
      <div className="my-8 p-6 bg-gray-800 shadow-lg rounded-sm">
        <ItemOverview/>
      </div>
    );
  }
}

export default Main;
