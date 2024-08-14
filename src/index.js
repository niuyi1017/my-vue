import { reactive, effect, computed, watch } from "./reactivity.js";
import { fetch } from "./utils.js";

const obj = reactive({
  a: 1,
  b: 2
})

// const effectFn = effect(() => obj.a + obj.b, {
//   lazy: true
// })
// const value = effectFn()
// console.log(value)

// const sum = computed(() => obj.a + obj.b)
// console.log(sum.value)
// console.log(sum.value)
// obj.a++
// console.log(sum.value)

// effect(() => {
//   console.log("effct")
//   console.log(sum.value)
// })

// obj.a++ 

// const obj = reactive({
//   a:1
// })



let finallyData
watch(() => obj.a, async (newVal, oldVal, onInvalidate) => {
  let expired = false
  onInvalidate(() => {
    console.log('onInvalidate')
    expired = true
  })

  const res = await fetch()
  if (!expired) {
    finallyData = res
    console.log(finallyData)
  }
  // const result = new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(newVal)
  //   }, times === 1 ? 2000 : 0)
  // })

  // if (!expired) {
  //   result.then(res => {
  //     console.log(res)
  //   })
  // }
})

obj.a = obj.a + 10
setTimeout(() => {
  obj.a++
}, 200)