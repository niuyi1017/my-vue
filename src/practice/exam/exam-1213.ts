
const flattenArray = <T>(arr:T[]) => {
  const result: T[] = []

  const flatten = (input: T[]) => {
    input.forEach(item => {
      if(Array.isArray(item)){
        flatten(item)
      }else{
        result.push(item)
      }
    })
  }

  flatten(arr)
  return result

}

const flattenObject = (object: any) => {
  const result: { [key: string]: any } = {}

  const flatten = (obj: { [x: string]: any }, prefix = "") => {
    for(const key in obj){
      const value = obj[key]
      if(typeof value === 'object'){
        flatten(value, `${prefix}${key}.`)
      }else{
        result[`${prefix}${key}`] = value
      }
    }
  }

  flatten(object)
  return result
}


const groupBy = <T>(arr: T[], fn: (item: T) => string): { [key: string]: T[] } => {
 return arr.reduce((acc: { [key: string]: T[] }, currentItem) => {
    const key = fn(currentItem)
    if(acc[key]){
      acc[key].push(currentItem)
    }else{
      acc[key] = [currentItem]
    }
    return acc
  }, {})
}

interface TreeNode {
  id: number;
  parentId: number | null;
  children?: TreeNode[];
}

const list2tree = (list :TreeNode[]) => {
  const roots: TreeNode[] = []
  const map = new Map()

  list.forEach(item => {
    map.set(item.id, {...item, childern:[]})
  })

  list.forEach(item => {
    const parentId = item.parentId
    if(parentId){
      const parent = map.get(parentId)
      parent.childern.push(item)
    }else{
      roots.push(item)
    }
  })

  return roots

}

const promiseAll = (promiseArr: Promise<any>[]) => {
  return new Promise((resolve, reject) => {
    const result: any[] = []
    let count = 0
    if(promiseArr.length === 0){
      resolve(result)
    }

    promiseArr.forEach((item,index) => {
     Promise.resolve(item).then(res => {
      count++
      result[index] = res
      if(count === promiseArr.length){
        resolve(res)
      }
     }).catch(err => {
      reject(err)
     })

    })

  })
}

const uniqueArray = <T>(arr:T[]) : T[]=>{
  return Array.from(new Set(arr))
}

const uniqueArrayByIndexOf = <T>(arr: T[]): T[] => {
  return arr.filter((item,index) => arr.indexOf(item) === index)
}



export {
  flattenArray,
  flattenObject,
  groupBy,
  list2tree,
  promiseAll,
  uniqueArray,
  uniqueArrayByIndexOf
}