import React from 'react';
import { saveState } from '../app/localstorage';
import store from '../app/store';

export function Footer () {

  function saveManually () {
    console.info('Manually saving data to your browser...');
    saveState(store.getState());
  }

  return (
    <div className="mt-8 text-xs text-center text-gray-500">
      Created by <a href="https://kovah.de/" className="text-gray-200 hover:text-white">Kovah</a>. Source at <a
      href="https://github.com/Kovah/Tradefinder" className="text-gray-200 hover:text-white">Github</a>
      <button className="m-0 ml-5 p-0 bg-none text-gray-200 hover:text-white" onClick={saveManually}>
        Save manually
      </button>
    </div>
  );
}
