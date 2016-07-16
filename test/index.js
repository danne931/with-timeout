import test from 'ava'
import sinon from 'sinon'
import withTimeout from '../index'

const testTimeout = ({ t, cb, timeBefore, timeWhen }) => {
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

test.cb('calls cb after default timeout (500ms)', t => {
  const cb = t.context.timeoutCb
  withTimeout(cb)
  testTimeout({ t, cb, timeBefore: 499, timeWhen: 500 })
})

test.cb('calls cb after user-defined timeout', t => {
  const cb = t.context.timeoutCb
  withTimeout(cb, { time: 101 })
  testTimeout({ t, cb, timeBefore: 100, timeWhen: 101 })
})
