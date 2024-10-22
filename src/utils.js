function traverse(value, seen = new Set()) {

  if (typeof value !== 'object' || value === null || seen.has(value)) return
  seen.add(value)
  for (let k in value) {
    traverse(value[k], seen)
  }
  return value

}



function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps = []
}


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


let count = 0
function fetch() {
  count++
  const res = count === 1 ? 'A' : 'B'
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(res)
    }, count === 1 ? 1000 : 100);
  })
}

export {
  traverse,
  cleanup,
  flushJob,
  fetch
}