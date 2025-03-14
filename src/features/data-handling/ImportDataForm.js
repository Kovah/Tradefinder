import React from 'react';
import { saveState } from '../../app/localstorage';

export function ImportDataForm () {
  const [importData, setImportData] = React.useState('');

  function handleSubmit (event) {
    event.preventDefault();

    if (event.target.checkValidity()) {
      let importedData;

      try {
        importedData = JSON.parse(importData);
      } catch (e) {
        alert('There was an error importing your data. Probably the data is broken or parts are missing.');
        return;
      }

      saveState(importedData);
      alert('Successfully imported data. Reloading the app now.');
      window.location.reload(true);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl mb-4">Import Data</h3>

      <label htmlFor="import-content">Encrypted data to import</label>
      <textarea id="import-content" value={importData} minLength="1" autoFocus required
        onChange={e => setImportData(e.target.value)}
        className="w-full py-2 px-3 text-xs rounded-xs my-4 bg-gray-700 shadow-xs"/>
      <button type="submit"
        className="py-2 px-3 bg-primary-600 hover:bg-primary-700 rounded-xs">
        Start Import
      </button>
    </form>
  );
}
