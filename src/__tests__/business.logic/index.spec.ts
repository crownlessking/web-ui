import * as bl from '../../business.logic'

describe('src/business.logic', () => {

  describe('get_appbar_input_val', () => {
      it('should return empty string when route is not in queries', () => {
        const queries = { '/': 'foo' }
        const route = '/bar'
        const result = bl.get_appbar_input_val(queries, route)
        expect(result).toBe('')
      })
  
      it('should return empty string when route is in queries but has no value', () => {
        const queries = { '/': 'foo', '/bar': '' }
        const route = '/bar'
        const result = bl.get_appbar_input_val(queries, route)
        expect(result).toBe('')
      })
  
      it('should return value when route is in queries and has value', () => {
        const queries = { '/': 'foo', '/bar': 'baz' }
        const route = '/bar'
        const result = bl.get_appbar_input_val(queries, route)
        expect(result).toBe('baz')
      })

      it('Beginning forward slash can be omitted', () => {
        const queries = { '/': 'foo', '/bar': 'baz' }
        const route = 'bar'
        const result = bl.get_appbar_input_val(queries, route)
        expect(result).toBe('baz')
      })
  })

  describe('get_global_var', () => {
    it('should return an empty object when the variable does not exist', () => {
      const result = bl.get_global_var('foo')
      expect(result).toEqual({})
    })
  })

  describe('get_val', () => {
    it('should return null when object is undefined', () => {
      const result = bl.get_val(undefined, 'foo')
      expect(result).toBeNull()
    })

    it('should return null when object is an array', () => {
      const result = bl.get_val([], 'foo')
      expect(result).toBeNull()
    })

    it('should return null when object is not an object', () => {
      const result = bl.get_val(1, 'foo')
      expect(result).toBeNull()
    })

    it('should return null when path is not found', () => {
      const result = bl.get_val({}, 'foo')
      expect(result).toBeNull()
    })

    it('should return value when path is found', () => {
      const result = bl.get_val({ foo: 'bar' }, 'foo')
      expect(result).toBe('bar')
    })
  })

  describe('get_endpoint_ending_fixed', () => {
    it('should return empty string when endpoint is undefined', () => {
      const result = bl.get_endpoint_ending_fixed(undefined)
      expect(result).toBe('')
    })

    it('should return empty string when endpoint is empty string', () => {
      const result = bl.get_endpoint_ending_fixed('')
      expect(result).toBe('')
    })

    it('should return empty string when endpoint has ending forward slash', () => {
      const result = bl.get_endpoint_ending_fixed('foo/')
      expect(result).toBe('foo/')
    })

    it('should return empty string when endpoint has no ending forward slash', () => {
      const result = bl.get_endpoint_ending_fixed('foo')
      expect(result).toBe('foo/')
    })
  })

  describe('clean_endpoint_ending', () => {
    it('should return empty string when endpoint is undefined', () => {
      const result = bl.clean_endpoint_ending(undefined)
      expect(result).toBe('')
    })

    it('should return empty string when endpoint is empty string', () => {
      const result = bl.clean_endpoint_ending('')
      expect(result).toBe('')
    })

    it('should return empty string when endpoint has ending forward slash', () => {
      const result = bl.clean_endpoint_ending('foo/')
      expect(result).toBe('foo')
    })

    it('should return empty string when endpoint has no ending forward slash', () => {
      const result = bl.clean_endpoint_ending('foo')
      expect(result).toBe('foo')
    })
  })

  describe('get_query_starting_fixed', () => {
    it('should return empty string when query is undefined', () => {
      const result = bl.get_query_starting_fixed(undefined)
      expect(result).toBe('')
    })

    it('should return empty string when query is empty string', () => {
      const result = bl.get_query_starting_fixed('')
      expect(result).toBe('')
    })

    it('should return empty string when query has starting question mark', () => {
      const result = bl.get_query_starting_fixed('?foo')
      expect(result).toBe('?foo')
    })

    it('should return empty string when query has no starting question mark', () => {
      const result = bl.get_query_starting_fixed('foo')
      expect(result).toBe('?foo')
    })
  })

  describe('safely_get_as', () => {
    it('should return default value when object is undefined', () => {
      const result = bl.safely_get_as({}, 'foo', 'bar')
      expect(result).toBe('bar')
    })

    it('should return default value when nested value not found', () => {
      const result = bl.safely_get_as({ 'foo': {} }, 'foo.name', 'bar')
      expect(result).toBe('bar')
    })

    it('should return default value when path is not found', () => {
      const result = bl.safely_get_as({ 'bar': { 'foo': {}}}, 'foo', 'bar')
      expect(result).toBe('bar')
    })

    it('should return value when path is found', () => {
      const result = bl.safely_get_as({ foo: 'baz' }, 'foo', 'bar')
      expect(result).toBe('baz')
    })

    it('should return nested value from path', () => {
      const result = bl.safely_get_as({ foo: {baz: { bar: 1 }}}, 'foo.baz.bar', 'bar')
      expect(result).toBe(1)
    })
  })

  describe('set_url_query_val', () => {
    it('should return empty string when url is empty', () => {
      const result = bl.set_url_query_val('', 'foo')
      expect(result).toBe('')
    })

    it('should return empty string when url is empty string', () => {
      const result = bl.set_url_query_val('', 'foo')
      expect(result).toBe('')
    })

    it('should return empty string when param is empty', () => {
      const result = bl.set_url_query_val('foo', '')
      expect(result).toBe('')
    })

    it('should return empty string when param is empty string', () => {
      const result = bl.set_url_query_val('foo', '')
      expect(result).toBe('')
    })

    it('should return url with query string when query string is not present', () => {
      const result = bl.set_url_query_val('foo', 'bar')
      expect(result).toBe('foo?bar')
    })

    it('should return url with query string when query string is present', () => {
      const result = bl.set_url_query_val('foo?baz', 'bar')
      expect(result).toBe('foo?baz&bar')
    })

    it('should return url with query string when query string is present and has value', () => {
      const result = bl.set_url_query_val('foo?baz=bar', 'bar')
      expect(result).toBe('foo?baz=bar&bar')
    })
  })

  describe('get_state_form_name', () => {
    it('should return empty string when formKey is empty string', () => {
      const result = bl.get_state_form_name('')
      expect(result).toBe('')
    })

    it('Inserts the suffix \'Form\' if it is missing', () => {
      const result = bl.get_state_form_name('foo')
      expect(result).toBe('fooForm')
    })

    it('If form name contains the suffix, simply returns it', () => {
      const result = bl.get_state_form_name('fooForm')
      expect(result).toBe('fooForm')
    })
  })

  describe('get_state_dialog_name', () => {
    it('should return empty string when dialogKey is empty string', () => {
      const result = bl.get_state_dialog_name('')
      expect(result).toBe('')
    })

    it('Inserts the suffix \'Dialog\' if it is missing', () => {
      const result = bl.get_state_dialog_name('foo')
      expect(result).toBe('fooDialog')
    })

    it('If dialog name contains the suffix, simply returns it', () => {
      const result = bl.get_state_dialog_name('fooDialog')
      expect(result).toBe('fooDialog')
    })
  })

  describe('mongo_object_id', () => {
    it('should return a string', () => {
      const result = bl.mongo_object_id()
      expect(typeof result).toBe('string')
    })
  })

  describe('trim_slashes', () => {
    it('should return empty string when url is empty', () => {
      const result = bl.trim_slashes('')
      expect(result).toBe('')
    })

    it('should return empty string when url is empty string', () => {
      const result = bl.trim_slashes('')
      expect(result).toBe('')
    })

    it('should return empty string when url has only forward slashes', () => {
      const result = bl.trim_slashes('////')
      expect(result).toBe('')
    })

    it('should return url with no forward slashes when url has only forward slashes', () => {
      const result = bl.trim_slashes('////foo////')
      expect(result).toBe('foo')
    })
  })

  describe('get_endpoint', () => {
    it('should return empty string when url is empty', () => {
      const result = bl.get_endpoint('')
      expect(result).toBe('')
    })

    it('should return empty string when url is empty string', () => {
      const result = bl.get_endpoint('')
      expect(result).toBe('')
    })

    it('should return empty string when url has no forward slashes test 1', () => {
      const result = bl.get_endpoint('foo')
      expect(result).toBe('')
    })

    it('should return empty string when url has no forward slashes test 2', () => {
      const result = bl.get_endpoint('foo')
      expect(result).toBe('')
    })

    it('should return endpoint when url has forward slashes test 1', () => {
      const result = bl.get_endpoint('foo/bar')
      expect(result).toBe('bar')
    })

    it('should return endpoint when url has forward slashes test 2', () => {
      const result = bl.get_endpoint('foo/bar/baz')
      expect(result).toBe('baz')
    })
  })

  describe('http_get', () => {
    it('should return empty string when url is empty', () => {
      const result = bl.http_get('')
      expect(result).toBe('')
    })

    it('should return empty string when url is empty string', () => {
      const result = bl.http_get('')
      expect(result).toBe('')
    })

    it('should return empty string when url has no forward slashes test 1', () => {
      const result = bl.http_get('foo')
      expect(result).toBe('')
    })

    it('should return empty string when url has no forward slashes test 2', () => {
      const result = bl.http_get('foo')
      expect(result).toBe('')
    })

    it('should return endpoint when url has forward slashes test 1', () => {
      const result = bl.http_get('foo/bar')
      expect(result).toBe('bar')
    })

    it('should return endpoint when url has forward slashes test 2', () => {
      const result = bl.http_get('foo/bar/baz')
      expect(result).toBe('baz')
    })
  })

  describe('get_themed_state', () => {
    it('should return main state when light and dark states are undefined', () => {
      const result = bl.get_themed_state('dark', 'foo', undefined, undefined)
      expect(result).toBe('foo')
    })

    it('should return main state when light and dark states are null', () => {
      const result = bl.get_themed_state('dark', 'foo', null, null)
      expect(result).toBe('foo')
    })

    it('should return main state when light and dark states are not objects', () => {
      const result = bl.get_themed_state('dark', 'foo', 1, 1)
      expect(result).toBe('foo')
    })

    it('should return main state when light and dark states are arrays', () => {
      const result = bl.get_themed_state('dark', 'foo', [], [])
      expect(result).toBe('foo')
    })

    it('should return light state when mode is light and light state is defined', () => {
      const result = bl.get_themed_state('light', 'foo', 'bar', undefined)
      expect(result).toBe('bar')
    })

    it('should return dark state when mode is dark and dark state is defined', () => {
      const result = bl.get_themed_state('dark', 'foo', undefined, 'bar')
      expect(result).toBe('bar')
    })
  })

  describe('parse_cookies', () => {
    it('should return empty object when document.cookie is empty', () => {
      const result = bl.parse_cookies()
      expect(result).toEqual({})
    })

    it('should return empty object when document.cookie is empty string', () => {
      const result = bl.parse_cookies()
      expect(result).toEqual({})
    })

    it('should return object with key and value when document.cookie has one cookie', () => {
      const result = bl.parse_cookies()
      expect(result).toEqual({})
    })

    it('should return object with key and value when document.cookie has multiple cookies', () => {
      const result = bl.parse_cookies()
      expect(result).toEqual({})
    })
  })

  describe('get_cookie', () => {
    it('should return empty string when cookie name is empty', () => {
      const result = bl.get_cookie('')
      expect(result).toBe('')
    })

    it('should return empty string when cookie name is empty string', () => {
      const result = bl.get_cookie('')
      expect(result).toBe('')
    })

    it('should return empty string when cookie name is not found', () => {
      const result = bl.get_cookie('foo')
      expect(result).toBe('')
    })

    it('should return value when cookie name is found', () => {
      const result = bl.get_cookie('foo')
      expect(result).toBe('')
    })
  })
})