import { err } from "."

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
 * **WARNING**  
 * BUG ALERT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  
 * If you add a new method to the interface above, make sure to insert the name
 * of that method as a property in this object with a truthy value.
 * If you don't, your method key may be overwritten when setting or writting
 * values in the configuration object if the specified key is the same
 * as the name of the method you just created.
 */
const invalidKeys = { 'init': 1, 'set': 1, 'read': 1, 'write': 1, 'clear': 1 }

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

const config: IConfiguration = {

  init: (data?: any) => {
    writable = false
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      for (const key in data) {
        if (!(key in invalidKeys)) { // if key is invalid
          config[key] = data[key]
        } else {
          if (config.DEBUG) {
            throw new Error(`'${key}' cannot be specified as a key.`)
          }
        }
      }
    }
  },

  set: (path: string, val: any) => {
    resolve(config, path, val)
  },

  /**
   * Reads a value
   *
   * @param prop period-seperated list of properties
   */
  read: (path: string) => {
    return resolve(config, path)
  },

  /**
   * Saves a value
   *
   * This value is mutable
   *
   * @param prop period-seprated list of properties
   * @param val value to be saved.
   */
  write: (path: string, val: any) => {
    writable = true
    resolve(config, path, val)
    writable = false
  },

  /**
   * Use this method if you want to remove all values from the config object.
   */
  clear: () => {
    for (const configKey in config) {
      delete config[configKey]
    }
  }
}

export default config
