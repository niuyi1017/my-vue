
const targetMap = new WeakMap()
let activeEffect = null
const effectStack = []

const jobQueue = new Set()
const p = Promise.resolve()
let isFlushing = false

function flushJob() {
  if (isFlushing) return
  isFlushing = true
  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    isFlushing = false
  })
}

function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }
  effectFn.deps = []
  effectFn.options = options
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
    }
  }
  return new Proxy(target, handler)
}

const obj = reactive({
  ok: true,
  name: 'Jack',
  value: 1
})


// effect(() => {
//   console.log('effect1', obj.ok)
//   effect(() => {
//     console.log('effect2', obj.name)
//   })
// })

effect(() => {
  console.log(obj.value)
}, {
  scheduler(fn) {
    jobQueue.add(fn)
    flushJob()
  }
})


obj.value++
obj.value++
// console.log('end')


