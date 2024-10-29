const flattenArray = (arr:any[]) => {
  const result:any[] = []

  const flatten = (_arr:any[]):void => {
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

export {
  flattenArray
}