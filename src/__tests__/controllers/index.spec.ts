import * as c from '../../controllers'
import IStateLink from '../../controllers/interfaces/IStateLink'
import StateLink from '../../controllers/StateLink'
import store from '../../state'
import actions from '../../state/actions'

test('log()', done => { done() })
test('ler()', done => { done() })
test('err()', done => { done() })

test('getPageName()', done => {
  expect(c.getPageName('foo')).toBe('fooPage')
  done()
})

test('getDudEventCallback()', done => {
  expect(typeof c.getDudEventCallback).toBe('function')
  expect(typeof c.getDudEventCallback()).toBe('function')
  done()
})

test('dummyCallback()', done => {
  const route = 'someRoute'
  expect(typeof c.dummyCallback).toBe('function')
  expect(typeof c.dummyCallback({ store, actions, route})).toBe('function')
  done()
})

test('defaultCallback()', done => {
  const route = 'someRoute'
  expect(typeof c.defaultCallback).toBe('function')
  expect(typeof c.defaultCallback({ store, actions, route})).toBe('function')
  done()
})

test('getFontAwesomeIconProp()', done => {
  const iconDef = c.getFontAwesomeIconProp('foo')
  expect(Array.isArray(iconDef)).toBe(true)
  expect(iconDef[0]).toBe('fas')
  expect(iconDef[1]).toBe('foo')
  const iconDef1 = c.getFontAwesomeIconProp('far, bar')
  expect(Array.isArray(iconDef1)).toBe(true)
  expect(iconDef1[0]).toBe('far')
  expect(iconDef1[1]).toBe('bar')
  done()
})

test('getViewportSize()', done => {
  const viewportSize = c.getViewportSize()
  expect(typeof viewportSize).toBe('object')
  expect(typeof viewportSize.width).toBe('number')
  expect(typeof viewportSize.height).toBe('number')
  done()
})

test('stretchToBottom()', done => {
  const num1 = c.stretchToBottom(5)
  expect(typeof num1).toBe('number')
  done()
})

test('getVal()', (done) => {
  const obj = {
    account: {
      user: {
        lastname: 'Foo'
      }
    }
  }

  const value = c.getVal(obj, 'account.user.lastname')
  expect(value).toBe('Foo')
  const value1 = c.getVal(obj, 'account.usr.lastname')
  expect(value1).toBeNull()

  done()
})

test('setVal()', done => {
  let obj1: any = {}
  c.setVal(obj1, 'foo.depth', 1)
  c.setVal(obj1, 'foo.bar', 'hello world')
  expect(obj1.foo.depth).toBe(1)
  expect(obj1.foo.bar).toBe('hello world')
  done()
})

test('getGlobalVar()', done => {
  window.foo = 'bar'
  const val1 = c.getGlobalVar('foo')
  expect(val1).toBe('bar')
  delete window.foo
  done()
})

test('getHeadMetaContent()', done => {
  // [TODO] Find a way to test document.querySelector()... Good luck! :P
  done()
})

test('getFormattedRoute()', done => {
  const linkJson: IStateLink = { type:'link' }
  const link = new StateLink(linkJson, {})

  const formattedRoute = c.getFormattedRoute(link, '/bar')
  expect(formattedRoute).toBe('/bar')

  const link2 = new StateLink({
    type: 'link',
    has: {
      route: '/foo'
    }
  }, {})

  const formattedRoute2 = c.getFormattedRoute(link2, '/bar')
  expect(formattedRoute2).toBe('/foo')

  done()
})

test('camelize()', done => {
  expect(c.camelize('foo-bar')).toBe('fooBar')
  done()
})

test('mongoObjectId()', done => {
  const objectId = c.mongoObjectId()
  expect(typeof objectId).toBe('string')
  expect(objectId.length).toBe(24)
  done()
})

test('safelyGet()', done => {
  const obj1 = {
    basicInfo: {
      firstname: 'Koolio'
    },
  }

  expect(c.safelyGet(obj1, 'basicInfo.firstname')).toBe('Koolio')
  expect(c.safelyGet(obj1, 'occupation')).toBeNull()

  const obj2 = undefined
  expect(c.safelyGet(obj2)).toBeDefined()

  done()
})

test('httpGet()', done => {
  // [TODO] To test this method, you need to fix it first.
  //        The issue: It uses a callback to get the result.
  //        and the function returns undefined.
  done()
})

test('getOriginEndingFixed()', done => {
  const origin1 = c.getOriginEndingFixed('foo')
  expect(origin1).toBe('foo/')
  const origin2 = c.getOriginEndingFixed('foo/')
  expect(origin2).toBe('foo/')
  done()
})

test('parseConeExp()', done => {
  const link = new StateLink({ type: 'link' }, {})
  const value = c.parseConeExp(link, '<type>')
  expect(value).toBe('link')
  done()
})

export default undefined