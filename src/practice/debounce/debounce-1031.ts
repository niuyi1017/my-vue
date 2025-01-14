
const debounce = (fn: Function, delay:number) => {

  let timer: string | number | NodeJS.Timeout | null | undefined = null
  return function (...args: any){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    },delay)
  }
  
}

export {
  debounce
}