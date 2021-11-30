
/**
 * **WARNING**
 * Do not add any new methods to this interface.
 * However, if you absolutely need to, make sure to add that method name to the
 * `invalidKeys` array below.
 * You've been warned.
 */
export interface IConfiguration {
  readonly init: (data?: any) => void
  readonly set: (path: string, val: any) => void
  readonly read: (path: string) => any
  readonly write: (path: string, val: any) => void
  readonly clear: () => void
  [key: string]: any
}

let writable: boolean = false

/**
 * **WARNING**
 * BUG ALERT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * If you add a new method to the interface above, make sure to insert the name
 * of that method as a string in this array.
 * If you don't, your method key may be overwritten when setting or writting
 * values in the configuration object if the specified key is the same
 * as the name of the method you just created.
 */
const invalidKeys = [ 'init', 'set', 'read', 'write', 'clear' ]

/**
 * Prevents existing properties, which includes methods, to be overwritten when
 * setting or writing a new value in the configuration object.
 *
 * @param path 
 */
const validPath = (path: string) => {
  for (const ik of invalidKeys) {
    if (ik === path) {
      return false
    }
  }
  return true
}

/**
 * Adds a new property and value to an object.
 *
 * @param obj arbitrary object
 * @param prop new property name
 * @param val the value at that property
 */
const createProperty = (obj: any, prop: string, val: any) => {
  Object.defineProperty(obj, prop, {
    value: val,
    writable
  })
}

/**
 * Resolves an object value from a period-separated list of object properties.
 *
 * This is a new implementation of `resolve()` that does not use a for-loop.
 *
 * TODO finish implementing this function
 *
 * @param obj  arbitrary object.
 * @param path a string containing the dot-separated list of object properties.
 *             e.g. "pagination.users.limit"
 */
const resolve = (obj: any, path: string, val?: any) => {
  const propArray = path.split('.')
  if (validPath(propArray[0])) {
    let o = obj,
        candidate: any,
        j = 0
    do {
      let prop = propArray[j]
      candidate = o[prop]

      // if this is the last property
      if (j >= (propArray.length - 1)) {
        if (val) {
          createProperty(o, prop, val)
          return val
        }
        return candidate

      // if the property does not exist but a value was provided
      } else if (!candidate && val) {
        createProperty(o, prop, {})
      }
      o = o[prop]
      j++
    } while (1)
  }
}

const config: any = {}

const init = (data?: any) => {
  writable = false
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const key in invalidKeys) {
      if (key in data) {
        throw new Error(`'${key}' cannot be specified as a key.`)
      }
    }
    Object.assign(config, data)
  }
}

Object.defineProperty(config, 'init', {
  value: init,
  configurable: false,
  writable: false
})

const set = (path: string, val: any) => {
  resolve(config, path, val)
}

Object.defineProperty(config, 'set', {
  value: set,
  configurable: false,
  writable: false
})

/**
 * Reads a value
 *
 * @param prop period-seperated list of properties
 */
const read = (path: string) => {
  return resolve(config, path)
}

Object.defineProperty(config, 'read', {
  value: read,
  configurable: false,
  writable: false
})

/**
 * Saves a value
 *
 * This value is mutable
 *
 * @param prop period-seprated list of properties
 * @param val value to be saved.
 */
const write = (path: string, val: any) => {
  writable = true
  resolve(config, path, val)
  writable = false
}

Object.defineProperty(config, 'write', {
  value: write,
  configurable: false,
  writable: false
})

/**
 * Use this method if you want to remove all values from the config object.
 */
const clear = () => {
  for (const configKey in config) {
    delete config[configKey]
  }
}

Object.defineProperty(config, 'clear', {
  value: clear,
  configurable: false,
  writable: false
})

export default config as IConfiguration
