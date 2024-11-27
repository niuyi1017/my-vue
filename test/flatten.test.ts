// import { flatten as flattenArray } from '../src/practice/flatten/flatten-1031';
// import { describe, it, expect } from '@jest/globals';
import { flattenArray } from '../src/practice/flatten/flatten';
import { flattenObject } from '../src/practice/flatten/flatten-1126';
import { describe, it, expect } from '@jest/globals';

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

  describe('flattenObject', () => {
    it('should flatten a nested object', () => {
      const nestedObject = { a: 1, b: { c: 2, d: { e: 3, f: 4 } }, g: 5 };
      const flatObject = flattenObject(nestedObject);
      expect(flatObject).toEqual({ 'a': 1, 'b.c': 2, 'b.d.e': 3, 'b.d.f': 4, 'g': 5 });
    });

    it('should return an empty object when given an empty object', () => {
      const nestedObject: any = {};
      const flatObject = flattenObject(nestedObject);
      expect(flatObject).toEqual({});
    });

    it('should handle objects with no nesting', () => {
      const nestedObject = { a: 1, b: 2, c: 3 };
      const flatObject = flattenObject(nestedObject);
      expect(flatObject).toEqual({ 'a': 1, 'b': 2, 'c': 3 });
    });

    it('should handle deeply nested objects', () => {
      const nestedObject = { a: { b: { c: { d: { e: 1 } } } } };
      const flatObject = flattenObject(nestedObject);
      expect(flatObject).toEqual({ 'a.b.c.d.e': 1 });
    });

    it('should handle objects with different types of values', () => {
      const nestedObject = { a: 1, b: 'string', c: { d: true, e: { f: null, g: undefined } } };
      const flatObject = flattenObject(nestedObject);
      expect(flatObject).toEqual({ 'a': 1, 'b': 'string', 'c.d': true, 'c.e.f': null, 'c.e.g': undefined });
    });
  });
});