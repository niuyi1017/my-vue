import { flattenArray } from '../src/practice/flatten/flatten-1029';
import { describe,it,expect } from '@jest/globals';

describe('flattenArray', () => {
  it('should flatten a nested array', () => {
    const nestedArray = [1, [2, [3, [4, 5]], 6], 7];
    const flatArray = flattenArray(nestedArray);
    expect(flatArray).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('should return an empty array when given an empty array', () => {
    const nestedArray: any[] = [];
    const flatArray = flattenArray(nestedArray);
    expect(flatArray).toEqual([]);
  });

  it('should handle arrays with no nesting', () => {
    const nestedArray = [1, 2, 3, 4, 5];
    const flatArray = flattenArray(nestedArray);
    expect(flatArray).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle deeply nested arrays', () => {
    const nestedArray = [[[[[1]]]]];
    const flatArray = flattenArray(nestedArray);
    expect(flatArray).toEqual([1]);
  });

  it('should handle arrays with different types of elements', () => {
    const nestedArray = [1, 'a', [true, [null, [undefined, [2]]]]];
    const flatArray = flattenArray(nestedArray);
    expect(flatArray).toEqual([1, 'a', true, null, undefined, 2]);
  });
});