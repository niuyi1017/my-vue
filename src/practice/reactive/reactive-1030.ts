type Key = string | symbol
type Effect = () => void
type DepsMap = Map<Key, Set<Effect>>
type TargetMap = WeakMap<object, DepsMap>

const targetMap: TargetMap = new WeakMap()
let activeEffect: Effect | null = null

const track = (target: object, key: Key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }
  if (activeEffect) {
    deps.add(activeEffect)
  }
}

const trigger = (target: object, key: Key) => {
  const depsMap = targetMap.get(target)
  if (depsMap) {
    const deps = depsMap.get(key)
    if (deps) {
      deps.forEach(effect => effect())
    }
  }
}

const effect = (fn: Effect) => {
  activeEffect = fn
  fn()
  activeEffect = null
}

const reactive = <T extends object>(target: T): T => {
  const handler: ProxyHandler<T> = {
    get(target, key,receiver) {
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key)
      return result
    }
  }
  return new Proxy(target, handler)
}

export {
  effect,
  reactive
}