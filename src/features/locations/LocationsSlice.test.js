import { describe, expect, test } from 'vitest';
import reducer, {
  addItemToLocation,
  deleteLocation,
  deselectLocation,
  selectExistingLocation,
} from './LocationsSlice';

function createState () {
  return {
    selected: ['berlin', 'london'],
    pool: [
      {
        ident: 'berlin',
        name: 'Berlin',
        itemsVisible: true,
        items: [{ ident: 'iron', sellAmount: 1, sellValue: 2, buyAmount: 0, buyValue: 0 }],
      },
      {
        ident: 'london',
        name: 'London',
        itemsVisible: true,
        items: [],
      },
    ],
  };
}

describe('locations reducer', () => {
  test('does not delete a location when the identifier is missing', () => {
    const initialState = createState();

    expect(reducer(initialState, deleteLocation('missing'))).toEqual(initialState);
  });

  test('does not deselect a location when the identifier is missing', () => {
    const initialState = createState();

    expect(reducer(initialState, deselectLocation('missing'))).toEqual(initialState);
  });

  test('does not select duplicate or unknown locations', () => {
    const initialState = createState();

    expect(reducer(initialState, selectExistingLocation('berlin')).selected).toEqual(['berlin', 'london']);
    expect(reducer(initialState, selectExistingLocation('missing')).selected).toEqual(['berlin', 'london']);
  });

  test('does not add duplicate items to a location', () => {
    const initialState = createState();

    expect(reducer(initialState, addItemToLocation({ location: 'berlin', item: 'iron' })).pool[0].items).toHaveLength(1);
  });
});
