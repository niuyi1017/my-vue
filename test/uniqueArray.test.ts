import { uniqueArray, uniqueArrayByMap, uniqueArrayByIndexOf } from '../src/practice/uniqueArray/uniqueArray';
import {describe, expect, test} from '@jest/globals';

describe('uniqueArray functions', () => {
  const testArray = [1, 2, 2, 3, 4, 4, 5];
  const expectedArray = [1, 2, 3, 4, 5];

  test('uniqueArray should remove duplicates', () => {
    expect(uniqueArray(testArray)).toEqual(expectedArray);
  });

  test('uniqueArrayByMap should remove duplicates', () => {
    expect(uniqueArrayByMap(testArray)).toEqual(expectedArray);
  });

  test('uniqueArrayByIndexOf should remove duplicates', () => {
    expect(uniqueArrayByIndexOf(testArray)).toEqual(expectedArray);
  });

  const testArrayStrings = ['a', 'b', 'b', 'c', 'a'];
  const expectedArrayStrings = ['a', 'b', 'c'];

  test('uniqueArray should remove duplicates from string array', () => {
    expect(uniqueArray(testArrayStrings)).toEqual(expectedArrayStrings);
  });

  test('uniqueArrayByMap should remove duplicates from string array', () => {
    expect(uniqueArrayByMap(testArrayStrings)).toEqual(expectedArrayStrings);
  });

  test('uniqueArrayByIndexOf should remove duplicates from string array', () => {
    expect(uniqueArrayByIndexOf(testArrayStrings)).toEqual(expectedArrayStrings);
  });
});