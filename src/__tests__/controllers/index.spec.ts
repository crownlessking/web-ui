import * as c from '../../controllers'

describe('src/controller', () => {
  
  /* test get_query_values */
  describe('get_query_values', () => {
    it('should return an empty object if no query string is provided', () => {
      expect(c.get_query_values('')).toEqual({})
    })
    it('should return an empty object if query string is provided but no values are found', () => {
      expect(c.get_query_values('?')).toEqual({})
    })
    it('should return an object with one key/value pair if one key/value pair is found', () => {
      expect(c.get_query_values('?a=1')).toEqual({a: '1'})
    })
    it('should return an object with two key/value pairs if two key/value pairs are found', () => {
      expect(c.get_query_values('?a=1&b=2')).toEqual({a: '1', b: '2'})
    })
    it('should return an object with two key/value pairs if two key/value pairs are found and one key has no value', () => {
      expect(c.get_query_values('?a=1&b=')).toEqual({a: '1', b: ''})
    })
  })

  /* test get_query_val */
  describe('get_query_val', () => {
    it('should return an empty string if no query string is provided', () => {
      expect(c.get_query_val('', 'a')).toEqual('')
    })
    it('should return an empty string if query string is provided but no values are found', () => {
      expect(c.get_query_val('?', 'a')).toEqual('')
    })
    it('should return an empty string if query string is provided but no values are found for the key', () => {
      expect(c.get_query_val('?a=1', 'b')).toEqual('')
    })
    it('should return the value if query string is provided and a value is found for the key', () => {
      expect(c.get_query_val('?a=1', 'a')).toEqual('1')
      expect(c.get_query_val('?a=1&b=2', 'b')).toEqual('2')
      expect(c.get_query_val('?a=1&b=', 'b')).toEqual('')
    })
  })

  describe('set_query_val', () => {
    it('should change the value of a single query string parameter', () => {
      expect(c.set_query_val('size=large&topping=pineapple', 'topping')).toEqual('size=large')
      expect(c.set_query_val('size=large&topping=pineapple', 'topping', 'pepperoni'))
        .toEqual('size=large&topping=pepperoni')
      expect(c.set_query_val('www.domain.com/?username=foo&password=bar', 'username'))
        .toEqual('www.domain.com/?password=bar')
      expect(c.set_query_val('www.domain.com/?username=foo&password=bar', 'username', 'foobar'))
        .toEqual('www.domain.com/?username=foobar&password=bar')
      expect(c.set_query_val('?v=helloworld', 'v', 'foobar'))
        .toEqual('?v=foobar')
    })
  })
})