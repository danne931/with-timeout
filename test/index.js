import test from 'ava'
import sinon from 'sinon'
import withTimeout from '../index'

const testCbCalled = ({ t, cb, timeBefore, timeAfter }) => {
  const beforeCbCalled = setTimeout(() => {
    t.false(cb.called)
    clearTimeout(beforeCbCalled)
  }, timeBefore)

  const afterCbCalled = setTimeout(() => {
    t.true(cb.called)
    clearTimeout(afterCbCalled)
    t.end()
  }, timeAfter)
}

test.beforeEach(t => {
  t.context.timeoutCb = sinon.spy()
})

test.cb('calls cb after default timeout (500ms) if no timeout passed', t => {
  const cb = t.context.timeoutCb
  withTimeout(cb)
  testCbCalled({ t, cb, timeBefore: 495, timeAfter: 505 })
})

test.cb('calls cb after default timeout (500ms) if timeout passed is not of type string or number', t => {
  const cb = t.context.timeoutCb
  withTimeout(cb, {})
  testCbCalled({ t, cb, timeBefore: 495, timeAfter: 505 })
})

test.cb('calls cb after default timeout (500ms) if timeout passed is NaN', t => {
  const cb = t.context.timeoutCb
  withTimeout(cb, 'abc123')
  testCbCalled({ t, cb, timeBefore: 495, timeAfter: 505 })
})

test.cb('calls cb after user-defined timeout (number)', t => {
  const cb = t.context.timeoutCb
  withTimeout(cb, 100)
  testCbCalled({ t, cb, timeBefore: 95, timeAfter: 105 })
})

test.cb('calls cb after user-defined timeout (string)', t => {
  const cb = t.context.timeoutCb
  withTimeout(cb, '10')
  testCbCalled({ t, cb, timeBefore: 5, timeAfter: 15 })
})

test.cb('calls cb with specified cb args', t => {
  const cb1 = sinon.spy()
  const cb2 = sinon.spy()
  const cb3 = sinon.spy()
  const cb4 = sinon.spy()
  withTimeout(cb1, 10, 'hello', 'hi')
  withTimeout(cb2, 10, [1, 2], [3, 4])
  withTimeout(cb3, 10)
  withTimeout(cb4, 10, 'hi')

  const timeout = setTimeout(() => {
    t.true(cb1.called)
    t.true(cb2.called)
    t.true(cb3.called)
    t.true(cb4.called)

    t.deepEqual(cb1.args[0], ['hello', 'hi'])
    t.deepEqual(cb2.args[0], [[1, 2], [3, 4]])
    t.is(cb3.args[0][0], undefined)
    t.is(cb4.args[0][0], 'hi')

    clearTimeout(timeout)
    t.end()
  }, 15)
})

test('returns a promise', t => {
  t.is(typeof withTimeout().then, 'function')
})

test('promise resolves with undefined if cb passed is not not of type function', t => {
  const promise = withTimeout()
  promise.then(result => {
    t.is(result, undefined)
  })
})

test('promise resolves with call to cb passed', t => {
  const cb = () => 3
  const promise = withTimeout(cb)

  promise.then(result => {
    t.is(result, 3)
  })
})
