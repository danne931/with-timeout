export default function timeout (fn, { fnArgs, time = 500 } = {}) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      resolve(typeof fn === 'function' ? fn(fnArgs) : undefined)
    }, time)
  })
}
