import test from 'ava'
import sinon from 'sinon'
import withTimeout from '../index'

const testCbCalled = ({ t, cb, timeBefore, timeWhen }) => {
  const beforeCbCalled = setTimeout(() => {
    t.false(cb.called)
    clearTimeout(beforeCbCalled)
  }, timeBefore)

  const whenCbCalled = setTimeout(() => {
    t.true(cb.called)
    clearTimeout(whenCbCalled)
    t.end()
  }, timeWhen)
}

test.beforeEach(t => {
  t.context.timeoutCb = sinon.spy()
})

test.cb('calls cb after default timeout (500ms) if no timeout passed', t => {
  const cb = t.context.timeoutCb
  withTimeout(cb)
  testCbCalled({ t, cb, timeBefore: 499, timeWhen: 500 })
})

test.cb('calls cb after default timeout (500ms) if timeout passed is not of type string or number', t => {
  const cb = t.context.timeoutCb
  withTimeout(cb, { time: {} })
  testCbCalled({ t, cb, timeBefore: 499, timeWhen: 500 })
})

test.cb('calls cb after user-defined timeout (number)', t => {
  const cb = t.context.timeoutCb
  withTimeout(cb, { time: 101 })
  testCbCalled({ t, cb, timeBefore: 100, timeWhen: 101 })
})

test.cb('calls cb after user-defined timeout (string)', t => {
  const cb = t.context.timeoutCb
  withTimeout(cb, { time: '11' })
  testCbCalled({ t, cb, timeBefore: 10, timeWhen: 11 })
})
