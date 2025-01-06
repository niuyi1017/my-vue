const deepCopy = <T>(target:T) :T => {
  if(target === null || typeof target !== 'object' ){
    return target
  }
  if(Array.isArray(target)){
    const result:T[] = []
    target.forEach(item => {
      result.push(deepCopy(item))
    })
    return result as T
  }

  const result = {} as T
  for(const key in target){
    if(target.hasOwnProperty(key)){
      result[key] = deepCopy(target[key])
    }
  }
  return result as T
}


const promiseAll = <T>(promiseArr: Promise<T>[]) => {
  const result: T[] = [] 
  let count = 0
  if(promiseArr.length === 0){
    return result
  }

  return new Promise((resolve, reject) => {

    promiseArr.forEach((item,index) => {
      Promise.resolve(item).then(res => {
        result[index] = res
        count++
        if(count === promiseArr.length){
          resolve(result)
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
}


const flattenObject = (target: { [x: string]: any }) => {

  const result: { [key: string]: any } = {}

  const flatten = (_target: { [x: string]: any }, prefix="") => {
    for(const key in target){
      const value = target[key]
      if(typeof value === 'object'){
        flatten(value, `${prefix}${key}.`)
      }else{
        result[`${prefix}${key}`] = value
      }
    }
  }

  flatten(target)
  return result
}

const uniqueArray = <T>(arr:T[]) =>{
  return Array.from(new Set(arr))
}
const uniqueArrayByIndexOf = <T>(arr:T[]) => {
  return arr.filter((item, index) => arr.indexOf(item) === index)
}

const uniqueArrayByMap = <T>(arr:T[]) => {
  const map = new Map<T, boolean>()
  return arr.filter(item => !map.has(item) && map.set(item, true))
}

interface TreeNode {
  id: number;
  parentId: number | null;
  children?: TreeNode[];
}

const list2tree = (list: TreeNode[]) => {
  const roots: TreeNode[] = []
  const map = new Map<number, TreeNode>()

  list.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });

  list.forEach(item => {
    const node = map.get(item.id)
    if(node?.parentId){
      const parent = map.get(item.id)
      parent!.children!.push(node)
    }else {
      roots.push(node!)
    }
  })

  return roots
}

export {
  deepCopy,
  promiseAll,
  flattenObject
}

