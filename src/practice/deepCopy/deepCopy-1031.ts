
const deepCopy = <T>(target: T) : T  => {
  if(target === null || typeof target !== 'object'){
    return target
  }
  if(Array.isArray(target)){
    const resArr = []
    for(let i= 0; i< target.length; i++){
      resArr.push(deepCopy(target[i]))
    }
    return resArr as T
  }

  const resObj:any = {}
  
  for(const key in target){
    if(target.hasOwnProperty(key)){
      resObj[key] = deepCopy(target[key])
    }
  }
  return resObj as T
}

export {
  deepCopy
}