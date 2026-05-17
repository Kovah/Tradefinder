import React from 'react';
import { parseImportData } from '../../app/importData';
import { saveState } from '../../app/localstorage';

export function ImportDataForm () {
  const [importData, setImportData] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [importComplete, setImportComplete] = React.useState(false);

  function handleSubmit (event) {
    event.preventDefault();

    if (event.target.checkValidity()) {
      const importResult = parseImportData(importData);
      if (!importResult.valid) {
        setErrorMessage(importResult.message);
        return;
      }

      if (!saveState(importResult.state)) {
        setErrorMessage('The import data could not be saved.');
        return;
      }

      setErrorMessage('');
      setImportComplete(true);
    }
  }

  function reloadApplication () {
    window.location.reload();
  }

  if (importComplete) {
    return (
      <div>
        <h3 className="text-2xl mb-4">Import Complete</h3>
        <p className="text-sm text-gray-300">Your imported data was saved. Reload the app to use it.</p>
        <button type="button" className="btn btn-primary mt-6" onClick={reloadApplication}>
          Reload App
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl mb-4">Import Data</h3>

      <label htmlFor="import-content">Data to import</label>
      <textarea id="import-content" value={importData} minLength="1" autoFocus required
        aria-describedby={errorMessage ? 'import-content-error' : undefined}
        onChange={e => {
          setImportData(e.target.value);
          setErrorMessage('');
        }}
        className="w-full py-2 px-3 text-xs rounded-xs my-4 bg-gray-700 shadow-xs"/>
      {errorMessage &&
        <p id="import-content-error" className="mb-4 text-sm text-red-300">{errorMessage}</p>
      }
      <button type="submit" className="btn btn-primary">
        Start Import
      </button>
    </form>
  );
}
