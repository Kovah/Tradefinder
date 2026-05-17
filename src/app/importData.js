import { prepareStateForStorage } from './localstorage';
import { validateState } from './stateValidation';

export function parseImportData (importData) {
  let parsedData;

  try {
    parsedData = JSON.parse(importData);
  } catch (error) {
    return {
      valid: false,
      state: undefined,
      message: 'The import data is not valid JSON.',
    };
  }

  const preparedState = prepareStateForStorage(parsedData);
  if (!preparedState) {
    return {
      valid: false,
      state: undefined,
      message: validateState(parsedData).message || 'The import data is not a valid Tradefinder export.',
    };
  }

  return {
    valid: true,
    state: preparedState,
    message: '',
  };
}
