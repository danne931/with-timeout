export default function withTimeout (fn, time, ...args) {
  if (typeof time !== 'number' && typeof time !== 'string') {
    time = 500
  }
  if (typeof time === 'string') {
    time = parseInt(time)
  }

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      resolve(typeof fn === 'function' ? fn(...args) : undefined)
    }, time)
  })
}
