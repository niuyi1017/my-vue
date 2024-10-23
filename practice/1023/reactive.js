
const targetMap = new WeakMap()
let activeEffect = null

const track = (target, key) => {
  if (activeEffect) {
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
    deps.add(activeEffect)
  }

}

const trigger = (target, key) => {
  const depsMap = targetMap.get(target)
  if (depsMap) {
    const deps = depsMap.get(key)
    if (deps) {
      deps.forEach(effect => {
        effect()
      });
    }
  }
}

const effect = (fn) => {
  activeEffect = fn
  fn()
  activeEffect = null
}

const reactive = (target) => {
  const handler = {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
      return true
    }
  }
  return new Proxy(target, handler)
}

const obj = reactive({ a: 1 })

effect(() => {
  console.log(obj.a)
})

setTimeout(() => {
  obj.a = 6
}, 1000)


