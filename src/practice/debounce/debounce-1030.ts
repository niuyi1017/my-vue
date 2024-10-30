const debounce = (fn:Function, delay:number = 1000) => {
  let timer: string | number | NodeJS.Timeout | null | undefined = null
  return function(...args: any){
    if(timer){
      clearTimeout(timer)
    }
    timer =setTimeout(() => {
      fn(...args)
    },delay)
  }
}

export {
  debounce
}