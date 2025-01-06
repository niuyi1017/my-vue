
const targetMap = new WeakMap()
let activeEffect: (() => void) | null = null

const track = (target: object, key: string | symbol) => {
  let depsMap = targetMap.get(target)
  if(!depsMap){
    depsMap = new Map()
    targetMap.set(target,depsMap)
  }
  let deps = depsMap.get(key)
  if(!deps){
    deps = new Set()
    depsMap.set(key, depsMap)
  }
  deps.add(activeEffect)
}

const trigger = (target: object, key: string | symbol) => {
  const depsMap= targetMap.get(target)
  if(depsMap){
    const deps = depsMap.get(key)
    deps&&deps.forEach((effect: () => void) => {
      effect()
    })
  }
}

const reactive = <T extends object>(target:T)  => {
  const handler = {
    get(target: T, key: string | symbol, receiver: any) {
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target: T, key: string | symbol, value: unknown, receiver: any) {
      const result = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return result
    }
  }
  return new Proxy(target, handler)
}

const effect = (fn: () => void)=> {
  activeEffect = fn
  fn()
  activeEffect = null
}