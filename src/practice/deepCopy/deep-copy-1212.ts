const deepCopy = <T>( target:T): T => {
  if(target === null || typeof target !== 'object' )
    return target

  if(Array.isArray(target)){
    const results = [] 
    for(let item of target){
      results.push(deepCopy(item))
    }
    return results as T
  }

  const resultObj = {} as T
  for(const key in target){
    if(target.hasOwnProperty(key)){
      resultObj[key] = deepCopy(target[key])
    }
  }
  return resultObj
}

export {deepCopy}