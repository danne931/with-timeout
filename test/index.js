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
  testCbCalled({ t, cb, timeBefore: 499, timeAfter: 501 })
})

test.cb('calls cb after default timeout (500ms) if timeout passed is not of type string or number', t => {
  const cb = t.context.timeoutCb
  withTimeout(cb, {})
  testCbCalled({ t, cb, timeBefore: 499, timeAfter: 501 })
})

test.cb('calls cb after user-defined timeout (number)', t => {
  const cb = t.context.timeoutCb
  withTimeout(cb, 101)
  testCbCalled({ t, cb, timeBefore: 100, timeAfter: 102 })
})

test.cb('calls cb after user-defined timeout (string)', t => {
  const cb = t.context.timeoutCb
  withTimeout(cb, '11')
  testCbCalled({ t, cb, timeBefore: 10, timeAfter: 12 })
})
