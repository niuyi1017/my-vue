import { groupBy } from '../src/practice/groupBy/groupBy-1031';
import { describe, it, expect } from '@jest/globals';

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
    const grouped = groupBy(arr, (item: { category: any; }) => item.category);

    expect(grouped).toEqual({
      fruit: [{ category: 'fruit', name: 'apple' }],
    });
  });


});