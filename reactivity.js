const reactive = (target) => {
  const handler = {
    get(target, key) {
      console.log("get!")
      return target[key]
    },
    set(target, key, value) {
      console.log('set!')
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