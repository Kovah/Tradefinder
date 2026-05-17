import { describe, expect, test } from 'vitest';
import { appVersion } from './version';
import { parseImportData } from './importData';

const validState = {
  appVersion,
  items: [{ ident: 'iron', name: 'Iron' }],
  locations: {
    selected: [],
    pool: [
      {
        ident: 'berlin',
        name: 'Berlin',
        itemsVisible: true,
        items: [],
      },
    ],
  },
  options: {
    savedTab: 'TRADING',
    numberFormat: {
      locale: 'en-US',
      decimals: 2,
    },
    minimumProfit: {
      type: 'percent',
      amount: 0,
    },
  },
};

describe('parseImportData', () => {
  test('returns prepared state for valid JSON exports', () => {
    expect(parseImportData(JSON.stringify(validState))).toEqual({
      valid: true,
      state: validState,
      message: '',
    });
  });

  test('rejects broken JSON', () => {
    expect(parseImportData('{bad json')).toMatchObject({
      valid: false,
      state: undefined,
    });
  });

  test('rejects JSON with an invalid state shape', () => {
    expect(parseImportData(JSON.stringify({ appVersion, items: 'bad' }))).toMatchObject({
      valid: false,
      state: undefined,
    });
  });
});
