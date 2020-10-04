import React from 'react';
import { DataHandling } from '../features/data-handling/DataHandling';

export function Footer () {
  return (
    <div className="mt-8 ">
      <DataHandling/>
      <div className="text-xs text-center text-gray-500 mt-4">
        Created by <a href="https://kovah.de/" className="text-gray-200 hover:text-white">Kovah</a>. Source at <a
        href="https://github.com/Kovah/Tradefinder" className="text-gray-200 hover:text-white">Github</a>
      </div>
    </div>
  );
}
