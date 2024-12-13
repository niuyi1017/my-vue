const flattenArray = (arr :any[]) => {
  const result :any[]= []

  const flatten = (_arr:any[]) => {
    for(const item of _arr){
      if(Array.isArray(item)){
        flatten(item)
      }else{
        result.push(item)
      }
    }
  }
  
  flatten(arr)
  return result
}

const flattenObject = (target:any) => {
  const result:any = {}

  const flatten = (obj:any, prefix = '') => {
    for(const key in obj){
      const value = obj[key]
      if(typeof value === 'object'  || Array.isArray(value) ){
        flatten(value, `${prefix}${key}.`)
      }else{
        result[`${prefix}${key}`] = value
      }
    }

  }

  flatten(target)
  return result

}