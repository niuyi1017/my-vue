import { deepCopy } from '../src/practice/deepCopy/deepCopy-1031';
import { describe, expect, test } from '@jest/globals';


describe('deepCopy', () => {
  test('should return null if input is null', () => {
    expect(deepCopy(null)).toBeNull();
  });

  test('should return the same primitive value if input is a primitive', () => {
    expect(deepCopy(42)).toBe(42);
    expect(deepCopy('hello')).toBe('hello');
    expect(deepCopy(true)).toBe(true);
  });

  test('should create a deep copy of an array', () => {
    const arr = [1, 2, { a: 3 }];
    const copiedArr = deepCopy(arr);
    expect(copiedArr).toEqual(arr);
    expect(copiedArr).not.toBe(arr);
    expect(copiedArr[2]).not.toBe(arr[2]);
  });

  test('should create a deep copy of an object', () => {
    const obj = { a: 1, b: { c: 2 } };
    const copiedObj = deepCopy(obj);
    expect(copiedObj).toEqual(obj);
    expect(copiedObj).not.toBe(obj);
    expect(copiedObj.b).not.toBe(obj.b);
  });

  test('should handle nested objects and arrays', () => {
    const complexObj = { a: [1, 2, { b: 3 }], c: { d: 4, e: [5, 6] } };
    const copiedComplexObj = deepCopy(complexObj);
    expect(copiedComplexObj).toEqual(complexObj);
    expect(copiedComplexObj).not.toBe(complexObj);
    expect(copiedComplexObj.a).not.toBe(complexObj.a);
    expect(copiedComplexObj.a[2]).not.toBe(complexObj.a[2]);
    expect(copiedComplexObj.c).not.toBe(complexObj.c);
    expect(copiedComplexObj.c.e).not.toBe(complexObj.c.e);
  });


});