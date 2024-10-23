import { promiseAll } from '../src/practice/promise-1022';
import {describe, expect, test} from '@jest/globals';

describe('promiseAll', () => {
  test('resolves all promises in the array', async () => {
    const promise1 = Promise.resolve(3);
    const promise2 = 42;
    const promise3 = new Promise<string>((resolve) => {
      setTimeout(resolve, 100, 'foo');
    });

    const result = await promiseAll([promise1, promise2, promise3]);
    expect(result).toEqual([3, 42, 'foo']);
  });

  test('resolves an empty array', async () => {
    const result = await promiseAll([]);
    expect(result).toEqual([]);
  });

  test('rejects if any promise rejects', async () => {
    const promise1 = Promise.resolve(3);
    const promise2 = Promise.reject('error');
    const promise3 = new Promise<string>((resolve) => {
      setTimeout(resolve, 100, 'foo');
    });

    await expect(promiseAll([promise1, promise2, promise3])).rejects.toEqual('error');
  });

  test('rejects if input is not an array', async () => {
    // @ts-ignore
    await expect(promiseAll('not an array')).rejects.toThrow(TypeError);
  });
});