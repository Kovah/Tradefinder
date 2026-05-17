import { beforeEach, describe, expect, test, vi } from 'vitest';
import { loadState, saveState } from './localstorage';
import { appVersion } from './version';

function createStorageMock () {
  const values = new Map();

  return {
    getItem: vi.fn(key => values.get(key) ?? null),
    setItem: vi.fn((key, value) => values.set(key, value)),
    removeItem: vi.fn(key => values.delete(key)),
    clear: vi.fn(() => values.clear()),
  };
}

const validState = {
  appVersion,
  items: [{ ident: 'iron', name: 'Iron' }],
  locations: {
    selected: ['berlin'],
    pool: [
      {
        ident: 'berlin',
        name: 'Berlin',
        itemsVisible: true,
        items: [
          { ident: 'iron', sellAmount: 10, sellValue: 100, buyAmount: 0, buyValue: 0 },
        ],
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

describe('local storage state', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createStorageMock());
  });

  test('loads valid persisted state', () => {
    localStorage.setItem('state', JSON.stringify(validState));

    expect(loadState()).toEqual(validState);
  });

  test('rejects malformed persisted state', () => {
    localStorage.setItem('state', JSON.stringify({
      appVersion,
      locations: { selected: ['missing'], pool: [] },
      items: 'not-an-array',
      options: {},
    }));

    expect(loadState()).toBeUndefined();
  });

  test('migrates old valid persisted state before loading it', () => {
    localStorage.setItem('state', JSON.stringify({
      appVersion: 1602446860,
      items: validState.items,
      locations: validState.locations,
      options: {
        savedTab: 'TRADING',
        numberFormat: 'de-DE',
      },
    }));

    expect(loadState()).toMatchObject({
      appVersion: 1674997450,
      options: {
        numberFormat: {
          locale: 'de-DE',
          decimals: 2,
        },
        minimumProfit: {
          type: 'percent',
          amount: 0,
        },
      },
    });
  });

  test('does not overwrite stored state with invalid data', () => {
    const result = saveState({
      appVersion,
      items: 'not-an-array',
      locations: {},
      options: {},
    });

    expect(result).toBe(false);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  test('saves valid state with the current app version', () => {
    expect(saveState(validState)).toBe(true);

    expect(JSON.parse(localStorage.setItem.mock.calls[0][1])).toMatchObject({
      ...validState,
      appVersion,
    });
  });
});
