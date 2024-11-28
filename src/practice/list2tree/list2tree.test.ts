import { list2tree } from './list2tree';
import type { TreeNode } from './list2tree';
import { describe, it, expect } from '@jest/globals';


describe('list2tree', () => {
  it('should convert a flat list to a tree structure', () => {
    const list = [
      { id: 1, parentId: null },
      { id: 2, parentId: 1 },
      { id: 3, parentId: 1 },
      { id: 4, parentId: 2 },
      { id: 5, parentId: 2 },
    ];

    const expectedTree = [
      {
        id: 1,
        parentId: null,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [
              { id: 4, parentId: 2, children: [] },
              { id: 5, parentId: 2, children: [] },
            ],
          },
          { id: 3, parentId: 1, children: [] },
        ],
      },
    ];

    const tree = list2tree(list);
    expect(tree).toEqual(expectedTree);
  });

  it('should handle an empty list', () => {
    const list: TreeNode[] = [];
    const tree = list2tree(list);
    expect(tree).toEqual([]);
  });

  it('should handle a list with a single node', () => {
    const list = [{ id: 1, parentId: null }];
    const expectedTree = [{ id: 1, parentId: null, children: [] }];
    const tree = list2tree(list);
    expect(tree).toEqual(expectedTree);
  });

  it('should handle a list with multiple root nodes', () => {
    const list = [
      { id: 1, parentId: null },
      { id: 2, parentId: null },
      { id: 3, parentId: 1 },
      { id: 4, parentId: 2 },
    ];

    const expectedTree = [
      { id: 1, parentId: null, children: [{ id: 3, parentId: 1, children: [] }] },
      { id: 2, parentId: null, children: [{ id: 4, parentId: 2, children: [] }] },
    ];

    const tree = list2tree(list);
    expect(tree).toEqual(expectedTree);
  });
});