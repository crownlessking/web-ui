import * as c from '../../controllers'
// import store from '../../state'
// import actions from '../../state/actions'

// test('log()', done => { done() })
// test('err()', done => { done() })

// test('getDudEventCallback()', done => {
//   expect(typeof c.getDudEventCallback).toBe('function')
//   expect(typeof c.getDudEventCallback()).toBe('function')
  // done()
// })

// test('dummyCallback()', done => {
//   const route = 'someRoute'
//   expect(typeof c.dummyCallback).toBe('function')
//   expect(typeof c.dummyCallback({ store, actions, route})).toBe('function')
  // done()
// })

// test('defaultCallback()', done => {
//   const route = 'someRoute'
//   expect(typeof c.defaultCallback).toBe('function')
//   expect(typeof c.defaultCallback({ store, actions, route})).toBe('function')
  // done()
// })


// test('getVal()', (done) => {
//   const obj = {
//     account: {
//       user: {
//         lastname: 'Foo'
//       }
//     }
//   }

//   const value = c.getVal(obj, 'account.user.lastname')
//   expect(value).toBe('Foo')
//   const value1 = c.getVal(obj, 'account.usr.lastname')
//   expect(value1).toBeNull()

  // done()
// })

test('export function safelyGet()', done => {
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

export default undefined