
type Effect = () => void
type DepsMap = Map<string, Set<Effect>>

const targetMap = new WeakMap<object, DepsMap>()
let activeEffect:Effect|null = null

const track  = (target:object, key:any) => {
  let depsMap = targetMap.get(target)
  if(!depsMap){
    depsMap  = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if(!deps){
    deps = new Set()
    depsMap.set(key, deps)
  }
  if(activeEffect){
    deps.add(activeEffect)
  }

}

const trigger = (target:object, key:any) => {
  const depsMap = targetMap.get(target)
  if(depsMap){
    const deps = depsMap.get(key)
    if(deps){
      deps.forEach(effect => {
        effect()
      } )
    }
  }
}



const reactive = (target:object) : object => {
  const handler: ProxyHandler<object>= {
    get(target, key, receiver){
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value,receiver){
      const result  = Reflect.set(target,key ,value, receiver)
      trigger(target, key)
      return result
    }
  }
  return new Proxy(target, handler)
}


const effect = (fn: Effect) => {
  activeEffect = fn
  fn()
  activeEffect = null
}

export {
  effect,
  reactive
}