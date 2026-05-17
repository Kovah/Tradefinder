import { describe, expect, test } from 'vitest';
import { calculateTrades } from './trades';

const items = [
  { ident: 'iron', name: 'Iron' },
  { ident: 'wood', name: 'Wood' },
  { ident: 'fish', name: 'Fish' },
];

const locations = [
  {
    ident: 'berlin',
    name: 'Berlin',
    items: [
      { ident: 'iron', sellAmount: 10, sellValue: 100, buyAmount: 0, buyValue: 0 },
      { ident: 'wood', sellAmount: 5, sellValue: 20, buyAmount: 0, buyValue: 0 },
      { ident: 'fish', sellAmount: 3, sellValue: 50, buyAmount: 0, buyValue: 0 },
    ],
  },
  {
    ident: 'london',
    name: 'London',
    items: [
      { ident: 'iron', sellAmount: 0, sellValue: 0, buyAmount: 4, buyValue: 250 },
      { ident: 'wood', sellAmount: 0, sellValue: 0, buyAmount: 10, buyValue: 30 },
      { ident: 'fish', sellAmount: 0, sellValue: 0, buyAmount: 10, buyValue: 45 },
    ],
  },
  {
    ident: 'paris',
    name: 'Paris',
    items: [
      { ident: 'iron', sellAmount: 0, sellValue: 0, buyAmount: 10, buyValue: 180 },
    ],
  },
];

const baseOptions = {
  minimumProfit: {
    type: 'percent',
    amount: 0,
  },
};

describe('calculateTrades', () => {
  test('returns profitable trades sorted by total profit', () => {
    const trades = calculateTrades({ items, locations, options: baseOptions });

    expect(trades).toEqual([
      {
        from: 'Berlin',
        to: 'Paris',
        item: 'Iron',
        amount: 10,
        buyFor: 100,
        sellFor: 180,
        profit: 80,
        profitTotal: 800,
        profitPercentage: 80,
      },
      {
        from: 'Berlin',
        to: 'London',
        item: 'Iron',
        amount: 4,
        buyFor: 100,
        sellFor: 250,
        profit: 150,
        profitTotal: 600,
        profitPercentage: 150,
      },
      {
        from: 'Berlin',
        to: 'London',
        item: 'Wood',
        amount: 5,
        buyFor: 20,
        sellFor: 30,
        profit: 10,
        profitTotal: 50,
        profitPercentage: 50,
      },
    ]);
  });

  test('filters trades by minimum profit percentage', () => {
    const trades = calculateTrades({
      items,
      locations,
      options: { minimumProfit: { type: 'percent', amount: 100 } },
    });

    expect(trades.map(trade => trade.to)).toEqual(['London']);
  });

  test('filters trades by minimum total profit', () => {
    const trades = calculateTrades({
      items,
      locations,
      options: { minimumProfit: { type: 'valueTotal', amount: 600 } },
    });

    expect(trades.map(trade => `${trade.item}:${trade.to}`)).toEqual(['Iron:Paris', 'Iron:London']);
  });

  test('skips location items that no longer exist in the item catalog', () => {
    const trades = calculateTrades({
      items: items.filter(item => item.ident !== 'iron'),
      locations,
      options: baseOptions,
    });

    expect(trades.map(trade => trade.item)).toEqual(['Wood']);
  });
});
