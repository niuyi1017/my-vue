

const groupBy = <T>(arr:T[], fn:(item:any) => any) => {
  return arr.reduce((acc, item)=> {
    const key:any = fn(item)
    if(!acc[key]){
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  },{} as any)
}

export {
  groupBy 
}