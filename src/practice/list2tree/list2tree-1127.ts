interface TreeNode {
  id: number,
  parentId: number | null,
  children?: TreeNode[]
}

const list2tree = (list: TreeNode[]): TreeNode[] => {
  const map = new Map<number, TreeNode>()
  const roots: TreeNode[] = []

  list.forEach(item => {
    map.set(item.id, { ...item, children: [] })
  })

  list.forEach(item => {
    const node = map.get(item.id)
    if (item.parentId === null) {
      roots.push(node!)
    } else {
      const parent = map.get(item.parentId)
      if (parent) {
        parent.children!.push(node!)
      }
    }
  })
  return roots
}