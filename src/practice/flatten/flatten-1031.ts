const flatten = (arr:any)  => {
  const resultArr:any = []

  const _flatten = (_arr:any) => {
    for(const item of _arr){
      if(Array.isArray(item)){
        _flatten(item)
      }else{
        resultArr.push(item)
      }
    }
  }
  
  _flatten(arr)
  return resultArr 
}

export{
  flatten
}