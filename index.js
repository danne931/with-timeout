export default function withTimeout (fn, { fnArgs, time } = {}) {
  if (typeof time !== 'number' && typeof time !== 'string') {
    time = 500
  }
  if (typeof time === 'string') {
    time = parseInt(time)
  }

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      resolve(typeof fn === 'function' ? fn(fnArgs) : undefined)
    }, time)
  })
}
