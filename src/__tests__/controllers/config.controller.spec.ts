
import Config from '../../controllers/config.controller'

test('IConfiguration.init()', done => {
  Config.init({
    init: 'foo'
  })

  expect(Config.init).not.toBe('foo')

  done()
})

test('IConfiguration.set()', done => {

  Config.set('pagination.users.limit', 5)
  expect(Config.pagination.users.limit).toBe(5)
  try {
    Config.write('pagination.users.limit', 25)
  } catch (e) {}
  expect(Config.pagination.users.limit).not.toBe(25)

  Config.set('init', '')
  expect(Config.init).not.toBe('')

  done()
})
