const deepCopy = (target:any):any => {
  if(target === null || typeof target !== 'object'){
    return target
  }

  if(Array.isArray(target)){
    const res = []
    for(let i = 0; i < target.length; i++){
      res[i] = deepCopy(target[i])
    }
    return res
  }

  const res:any = {}
  for(const key in target){
    if(target.hasOwnProperty(key)){
      res[key] = deepCopy(target[key])
    } 
  }
  return res

}

export {
  deepCopy
}