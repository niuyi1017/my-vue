const flatten = (arr:any) :any => {

  const result:any = []

  const _flatten = (_arr:any) => {

    for(const item of _arr){
      if(Array.isArray(item)){
        _flatten(item)
      }else{
        result.push(item)
      }
    }
  }
  _flatten(arr)

  return result
    
}