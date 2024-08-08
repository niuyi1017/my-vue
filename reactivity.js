
const targetMap = new WeakMap()

const effect = () => {
  console.log('effect')
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
  deps.add(effect)

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
      trigger(target, key)
      target[key] = value
    }
  }
  return new Proxy(target, handler)
}

const obj = reactive({
  name: 'Jack'
})

console.log(obj)
console.log(obj.name)
obj.name = "Tom"
console.log(obj.name)