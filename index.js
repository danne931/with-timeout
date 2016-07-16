export default function withTimeout (fn, { fnArgs, time } = {}) {
  if (typeof time !== 'string' && typeof time !== 'number') {
    time = 500
  }

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      resolve(typeof fn === 'function' ? fn(fnArgs) : undefined)
    }, time)
  })
}
