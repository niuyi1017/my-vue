import { debounce, groupBy } from '../src/practice/debounce/debounce-1030';

import { jest, describe, it,expect } from '@jest/globals';

jest.useFakeTimers();

describe('debounce', () => {
  it('should debounce a function', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 1000);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(fn).not.toBeCalled();

    jest.advanceTimersByTime(1000);

    expect(fn).toBeCalledTimes(1);
  });

  it('should pass arguments to the debounced function', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 1000);

    debouncedFn('arg1', 'arg2');

    jest.advanceTimersByTime(1000);

    expect(fn).toBeCalledWith('arg1', 'arg2');
  });
});

describe('groupBy', () => {
  it('should group items by a key', () => {
    const arr = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
    ];
    const grouped = groupBy(arr, item => item.category);

    expect(grouped).toEqual({
      fruit: [
        { category: 'fruit', name: 'apple' },
        { category: 'fruit', name: 'banana' },
      ],
      vegetable: [{ category: 'vegetable', name: 'carrot' }],
    });
  });

  it('should handle an empty array', () => {
    const arr: any[] = [];
    const grouped = groupBy(arr, item => item.category);

    expect(grouped).toEqual({});
  });

  it('should handle a single item array', () => {
    const arr = [{ category: 'fruit', name: 'apple' }];
    const grouped = groupBy(arr, item => item.category);

    expect(grouped).toEqual({
      fruit: [{ category: 'fruit', name: 'apple' }],
    });
  });
});