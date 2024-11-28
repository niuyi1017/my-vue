interface TreeNode {
  id: number;
  parentId: number | null;
  children?: TreeNode[];
}

function list2tree(list: TreeNode[]): TreeNode[] {
  const map = new Map<number, TreeNode>();
  const roots: TreeNode[] = [];

  list.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });

  list.forEach(item => {
    const node = map.get(item.id);
    if (item.parentId === null) {
      roots.push(node!);
    } else {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children!.push(node!);
      }
    }
  });

  return roots;
}

// Example usage:
const list = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
  { id: 5, parentId: 2 },
];

const tree = list2tree(list);
console.log(JSON.stringify(tree, null, 2));

export { list2tree };
export type { TreeNode };