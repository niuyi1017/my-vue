
let activeEffect

const effect = (fn) => {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    fn()
  }
  effectFn.deps = []

  effectFn()

}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps = []
}

const targetMap = new WeakMap()

const track = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

const trigger = (target, key) => {
  const depsMap = targetMap.get(target)
  if (depsMap) {
    const deps = depsMap.get(key)
    if (deps) {
      const effectToRun = new Set(deps)
      effectToRun.forEach(effect => effect());
    }
  }
}


const reactive = (obj) => {
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
  return new Proxy(obj, handler)
}

const person = reactive({
  name: 'Jack',
  age: 18
})

effect(() => {
  console.log('effect run')
  console.log(person.age >= 18 ? person.name : 'not 18')
})

person.age = 18
person.name = '123'