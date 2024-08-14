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
  flushJob,
  fetch
}