
const targetMap = new WeakMap()
let activeEffect = null

function effect(fn) {
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

const track = (target, key) => {
  // console.log('track')
  if (activeEffect) {
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


}

const trigger = (target, key) => {
  // console.log('trigger')
  const depsMap = targetMap.get(target)
  if (depsMap) {
    const deps = depsMap.get(key)
    if (deps) {
      const effectsToRun = new Set(deps)
      effectsToRun && effectsToRun.forEach(effect => effect());
    }
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
  ok: true,
  name: 'Jack'
})


effect(() => {
  console.log("effect run")
  console.log(obj.ok ? obj.name : 'not ok')
})


// obj.name = '123'
obj.ok = false
obj.name = '456'


