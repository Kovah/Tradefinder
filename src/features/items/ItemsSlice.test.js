import { describe, expect, test } from 'vitest';
import reducer, { addItem, editItem } from './ItemsSlice';

describe('items reducer', () => {
  test('adds items with generated identifiers', () => {
    const state = reducer([], addItem('Silk'));

    expect(state).toHaveLength(1);
    expect(state[0]).toMatchObject({ name: 'Silk' });
    expect(state[0].ident).toEqual(expect.any(String));
  });

  test('does not edit a missing item', () => {
    const initialState = [{ ident: 'iron', name: 'Iron' }];

    expect(reducer(initialState, editItem({ ident: 'missing', newName: 'Gold' }))).toEqual(initialState);
  });
});
