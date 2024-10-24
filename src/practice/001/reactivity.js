import { traverse, cleanup } from './utils.js'
const targetMap = new WeakMap()
let activeEffect = null
const effectStack = []


function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    const res = fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    return res
  }
  effectFn.deps = []
  effectFn.options = options

  if (!options.lazy) {
    effectFn()
  } else {
    return effectFn
  }

}

function computed(getter) {
  let value
  let dirty = true

  let effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true
      trigger(obj, 'value')
    }
  })
  const obj = {
    get value() {
      if (dirty) {
        track(obj, 'value')
        value = effectFn()
        dirty = false
      }
      return value
    }
  }
  return obj
}

function watch(source, cb, options = {}) {
  let getter

  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }

  let cleanup

  function onInvalidate(fn) {
    cleanup = fn
  }

  let oldValue, newValue

  const job = () => {
    newValue = effectFn()
    if (cleanup) {
      cleanup()
    }
    cb(newValue, oldValue, onInvalidate)
    oldValue = newValue
  }


  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler() {
      if (options.flush === 'post') {
        const p = Promise.resolve()
        p.then(() => {
          job()
        })
      } else {
        job()
      }
    }
  })

  if (options.immediate) {
    job()
  } else {
    oldValue = effectFn()
  }
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
      const effectsToRun = new Set()
      deps && deps.forEach(effectFn => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn)
        }
      })
      effectsToRun.forEach(effectFn => {
        if (effectFn.options.scheduler) {
          effectFn.options.scheduler(effectFn)
        } else {
          effectFn()
        }
      });
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
      return true
    }
  }
  return new Proxy(target, handler)
}




export {
  reactive,
  effect,
  computed,
  watch
}





