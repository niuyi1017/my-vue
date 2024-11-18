import { describe, expect, test } from '@jest/globals';
import { reactive, effect } from '../src/practice/reactive/reactive-1114';

describe('reactive', () => {
  test('should track and trigger effects', () => {
    const obj = reactive({ count: 0 });
    let dummy;
    effect(() => {
      dummy = obj.count;
    });

    expect(dummy).toBe(0);
    obj.count = 1;
    expect(dummy).toBe(1);
  });

  test('should handle multiple properties', () => {
    const obj = reactive({ count: 0, name: 'test' });
    let countDummy, nameDummy;
    effect(() => {
      countDummy = obj.count;
    });
    effect(() => {
      nameDummy = obj.name;
    });

    expect(countDummy).toBe(0);
    expect(nameDummy).toBe('test');

    obj.count = 1;
    expect(countDummy).toBe(1);
    expect(nameDummy).toBe('test');

    obj.name = 'changed';
    expect(countDummy).toBe(1);
    expect(nameDummy).toBe('changed');
  });

  test('should not trigger effects for non-tracked properties', () => {
    const obj = reactive({ count: 0, name: 'test' });
    let dummy;
    effect(() => {
      dummy = obj.count;
    });

    expect(dummy).toBe(0);
    obj.name = 'changed';
    expect(dummy).toBe(0);
  });

  test('should handle nested reactivity', () => {
    const obj = reactive({ nested: { count: 0 } });
    let dummy;
    effect(() => {
      dummy = obj.nested.count;
    });

    expect(dummy).toBe(0);
    obj.nested.count = 1;
    expect(dummy).toBe(1);
  });
});