
const targetMap = new WeakMap()
let activeEffect = null

const effect = fn => {
  activeEffect = fn
  fn()
}

const track = (target, key) => {
  console.log('track')
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  if (activeEffect) {
    deps.add(activeEffect)
  }

}

const trigger = (target, key) => {
  console.log('trigger')
  const depsMap = targetMap.get(target)
  if (depsMap) {
    const deps = depsMap.get(key)
    deps && deps.forEach(effect => effect());
  }
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
    }
  }
  return new Proxy(target, handler)
}

const obj = reactive({
  name: 'Jack'
})

effect(() => {
  console.log("effect", obj.name)
})


console.log(obj.name)
obj.name = "Tom"
