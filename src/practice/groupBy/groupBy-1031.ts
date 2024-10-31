
const groupBy = (arr:any[],fn:(item:any)=>any) => {
  const result:any = {}
  for(const item of arr){
    const key:any = fn(item)
    if(!result[key]){
      result[key] = []
    }
    result[key].push(item)
  }
  return result
}

export {
  groupBy
}