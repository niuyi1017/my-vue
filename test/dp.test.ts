import { describe, expect, test } from '@jest/globals';
import { lengthOfLIS, lengthOfLCIS } from '../src/practice/dp/dp-1113';




describe('lengthOfLIS', () => {
  test('returns 0 for an empty array', () => {
    expect(lengthOfLIS([])).toBe(0);
  });

  test('returns 1 for an array with one element', () => {
    expect(lengthOfLIS([10])).toBe(1);
  });

  test('returns the correct length for a given array', () => {
    expect(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4);
  });

  test('returns the correct length for an increasing array', () => {
    expect(lengthOfLIS([1, 2, 3, 4, 5])).toBe(5);
  });

  test('returns the correct length for a decreasing array', () => {
    expect(lengthOfLIS([5, 4, 3, 2, 1])).toBe(1);
  });

  test('returns the correct length for an array with duplicates', () => {
    expect(lengthOfLIS([2, 2, 2, 2, 2])).toBe(1);
  });

  test('returns the correct length for a mixed array', () => {
    expect(lengthOfLIS([10, 22, 9, 33, 21, 50, 41, 60, 80])).toBe(6);
  });
});

describe('lengthOfLCIS', () => {
  test('returns 0 for an empty array', () => {
    expect(lengthOfLCIS([])).toBe(0);
  });

  test('returns 1 for an array with one element', () => {
    expect(lengthOfLCIS([10])).toBe(1);
  });

  test('returns the correct length for a given array', () => {
    expect(lengthOfLCIS([1, 3, 5, 4, 7])).toBe(3);
  });

  test('returns the correct length for an increasing array', () => {
    expect(lengthOfLCIS([1, 2, 3, 4, 5])).toBe(5);
  });

  test('returns the correct length for a decreasing array', () => {
    expect(lengthOfLCIS([5, 4, 3, 2, 1])).toBe(1);
  });

  test('returns the correct length for an array with duplicates', () => {
    expect(lengthOfLCIS([2, 2, 2, 2, 2])).toBe(1);
  });

  test('returns the correct length for a mixed array', () => {
    expect(lengthOfLCIS([1, 3, 5, 4, 2, 3, 4, 5])).toBe(4);
  });
});
