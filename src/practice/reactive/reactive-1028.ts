type Effect = () => void;
type DepsMap = Map<string | symbol, Set<Effect>>;
type TargetMap = WeakMap<object, DepsMap>;

const targetMap: TargetMap = new WeakMap<object, DepsMap>();
let activeEffect: Effect | null = null;


const track = (target:object, key:string| symbol) => {
  let depsMap = targetMap.get(target)
  if(!depsMap){
    depsMap = new Map()
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

const trigger = (target:object, key: string | symbol) => {
  const depsMap =  targetMap.get(target)
  if(depsMap){
    const deps = depsMap.get(key)
    if(deps){
      deps.forEach(effect => {
        effect()
      })
    }
  }
}

const effect = (fn:Effect) => {
  activeEffect =fn
  fn()
  activeEffect = null
}

const reactive =  <T extends object>(target: T): T => {
  const handler :ProxyHandler<T> = {
    get(target, key ,receiver){
      track(target, key)
      return Reflect.get(target, key, receiver);
    },
    set(target:object, key:string, value:any, receiver){
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return result;
    }
  }
  return new Proxy(target, handler)
}

export {
  reactive,
  effect
}