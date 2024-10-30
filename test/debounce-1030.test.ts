import { debounce } from '../src/practice/debounce/debounce-1030';

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

