import { describe, expect, test } from 'vitest';
import { formatNumber } from './helper';

describe('formatNumber', () => {
  test('formats numbers with the configured locale and decimal count', () => {
    expect(formatNumber(1234.5, { locale: 'en-US', decimals: 2 })).toBe('1,234.50');
    expect(formatNumber(1234.5, { locale: 'de-DE', decimals: 1 })).toBe('1.234,5');
  });
});
