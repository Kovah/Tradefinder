import { appVersion } from './version';
import { applyMigrations } from './migrations';
import { validateState } from './stateValidation';

export const prepareStateForStorage = (data) => {
  if (!data || typeof data.appVersion === 'undefined') {
    return undefined;
  }

  const migratedData = appVersion > Number(data.appVersion) ? applyMigrations(data) : data;

  if (!migratedData || !validateState(migratedData).valid) {
    return undefined;
  }

  return migratedData;
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState == null) {
      return undefined;
    }

    const data = JSON.parse(serializedState);
    return prepareStateForStorage(data);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const stateToSave = {...state, appVersion: appVersion};

    if (!validateState(stateToSave).valid) {
      return false;
    }

    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem('state', serializedState);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
