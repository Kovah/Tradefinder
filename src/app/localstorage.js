import { appVersion } from '../App';
import { applyMigrations } from './migrations';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState == null) {
      return undefined;
    }

    const data = JSON.parse(serializedState);

    if (typeof data.appVersion === 'undefined') {
      return undefined;
    }

    if (appVersion > data.appVersion) {
      return applyMigrations(data);
    }

    return data;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({...state, appVersion: appVersion});
    localStorage.setItem('state', serializedState);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
