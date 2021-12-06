
import Config from '../../controllers/config.controller'

test('IConfiguration.init()', done => {
  Config.init({
    init: 'foo',
    tries: 1
  })

  expect(Config.init).not.toBe('foo')
  expect(Config.tries).toBe(1)

  Config.tries = 2
  expect(Config.tries).toBe(2)

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

test('IConfiguration.write()', done => {

  Config.write('firstname', 'joe')
  expect(Config.firstname).toBe('joe')

  Config.write('firstname', 'foo')
  expect(Config.firstname).toBe('foo')

  done()
})
