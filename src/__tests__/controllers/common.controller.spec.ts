import * as common from '../../controllers'

test('getVal()', (done) => {
  const obj = {
    account: {
      user: {
        lastname: 'Foo'
      }
    }
  }

  const value = common.getVal(obj, 'account.user.lastname')
  expect(value).toBe('Foo')
  const value1 = common.getVal(obj, 'account.usr.lastname')
  expect(value1).toBe(null)

  done()
})
