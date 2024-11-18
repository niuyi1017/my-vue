
const targetMap = new WeakMap()

let activeEffect: (() => any) | null = null

const track = (target: any, key: string) => {
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

const trigger = (target: any, key: string, value: any) => {
  const depsMap = targetMap.get(target)
  if (targetMap) {
    const deps = depsMap.get(key)
    if (deps) {
      deps.forEach((effect: () => any) => effect())
    }
  }
}

const reactive = (target: any) => {
  const handler = {
    get(target: any, key: string) {
      track(target, key)
      return target[key]
    },
    set(target: any, key: string, value: any) {
      target[key] = value
      trigger(target, key, value)
      return true
    }
  }
  return new Proxy(target, handler)
}

const effect = (fn: () => any) => {
  activeEffect = fn
  fn()
  activeEffect = null
}

export {
  reactive,
  effect
}