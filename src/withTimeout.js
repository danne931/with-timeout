function withTimeout (fn, { fnArgs, time = 500 } = {}) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      resolve(_.isFunction(fn) ? fn(fnArgs) : undefined)
    }, time)
  })
}

module.exports = {
  withTimeout
}
