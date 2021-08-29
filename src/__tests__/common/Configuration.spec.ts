
import Config from '../../common/configuration'

test('Configuration.set()', done => {

  Config.init({ })
  Config.set('pagination.users.limit', 5)
  expect(Config.pagination.users.limit).toBe(5)
  try {
    Config.write('pagination.users.limit', 25)
  } catch (e) {}
  expect(Config.pagination.users.limit).not.toBe(25)

  done()
})
