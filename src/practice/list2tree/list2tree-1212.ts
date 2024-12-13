
interface TreeNode {
  id: number;
  parentId: number | null;
  children?: TreeNode[];
}


function list2tree(list: TreeNode[]): TreeNode[] {
  const map = new Map<number, TreeNode>()
  const roots : TreeNode[] = []

  for(const item of list){
    map.set(item.id, {...item, children:[]})
  }

  list.forEach(item => {
    const parentId = item.parentId
    if(parentId){
      const parent = map.get(parentId)
      parent?.children?.push(item)
    }else{
      roots.push(item)
    }
  })

  return roots
}

export {
  list2tree
}