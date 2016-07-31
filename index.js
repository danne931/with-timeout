export default function withTimeout (fn, time, ...args) {
  if (typeof time === 'string') {
    time = parseInt(time)
  }
  if (typeof time !== 'number' || Number.isNaN(time)) {
    time = 500
  }

  return new Promise(resolve => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      resolve(typeof fn === 'function' ? fn.apply(this, args) : undefined)
    }, time)
  })
}
