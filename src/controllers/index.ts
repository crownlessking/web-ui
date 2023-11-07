import Config from '../config'
import { APP_CONTENT_VIEW, DEFAULT_LANDING_PAGE_VIEW, TCallback } from '../constants'
import { IJsonapiResourceAbstract } from './interfaces/IJsonapi'
import { IStatePageContent } from './interfaces/IStatePage'

/** Helps to shorten error message */
let _msgPrefix = ''

/**
 * Set message prefix.
 *
 * Helps keep error message short. Works with `msg()`, `log()`, `warn()`,
 * and `ler()`.
 */
export function pre(prefix?: string): void {
  _msgPrefix = prefix ?? ''
}

/** Prepends message prefix. */
export function msg(msg: string): string {
  return _msgPrefix + msg
}

/**
 * Sometimes, you don't want a hard crash. Sometimes, you want a simple
 * console print out.
 */
export function log(...args: any): void {
  if (Config.DEBUG) {
    console.log(_msgPrefix, ...args)
  }
}

/** Logs a warning to the console. */
export function warn(...args: any): void {
  if (Config.DEBUG) {
    console.warn(_msgPrefix, ...args)
  }
}

/** Logs an error to the console. */
export function ler(...args: any): void {
  if (Config.DEBUG) {
    console.error(_msgPrefix, ...args)
  }
}

/**
 * A simple shortcut for triggering exceptions and preventing unecessarily
 * inflated code blocks.
 */
export function err(message: string): void {
  if (Config.DEBUG) {
    throw new Error (message)
  }
}

export function dev(message: string): void {
  if (Config.DEV) {
    console.log(message)
  }
}

/** Returns `true` if the argument is an object. */
export const is_object = (obj: any) => {
  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    return true
  }
  return false
}

/**
 * Get page name.
 *
 * This function is only used to store a data for a page into `state.tmp`.
 *
 * @param name 
 */
 export function get_page_name(name: string): string {
  return name + 'Page'
}

/**
 * If a callback is required for a link or button but is not defined, then this
 * method will provide a dummy one.
 */
export function get_dud_event_callback (): TCallback {
  return (e: any) => {
    ler('No callback was assigned.')
  }
}

/**
 * Converts an icon definition to a valid argument for the `FontAwesomeIcon`
 * element.
 *
 * e.g.
 * 
 * ```tsx
 * const iconDefinition = '<icon_type>, <icon_name>'
 * const validIconArgument = getFontAwesomeIconProp(iconDefinition)
 *
 * <FontAwesomeIcon icon={validIconArgument} />
 * ```
 *
 * Icon types are, "fas, far, fab"
 *
 * @param iconDef 
 */
export function get_font_awesome_icon_prop(iconDef: string): string[]|string {
  const pieces = iconDef.replace(/\s+/,'').split(',')

  if (pieces.length === 2) {
    return pieces
  } else if (pieces.length === 1) {
    return ['fas', iconDef]
  }

  err('bad icon definition. Check your JSON.')

  return ''
}

/**
 * Get viewport size.
 *
 * Creedit:
 * @see https://stackoverflow.com/questions/1377782/javascript-how-to-determine-the-screen-height-visible-i-e-removing-the-space
 */
export function get_viewport_size(): { width: number; height: number }
{
  let e: any = window, a = 'inner'
  if ( !( 'innerWidth' in window ) ) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

/**
 * Get a height in pixels that can help you strech an HTML element vertically
 * to fit the remaining screen space.
 *
 * @param bottom margin between the bottom of the viewport and the streched
 *               element.
 *               e.g. How much space do you want between the bottom of the
 *                    viewport and your element
 */
export function stretch_to_bottom(bottom: number): number {
  const height = get_viewport_size().height

  return height - bottom
}

/**
 * Find nested values in object using a string of dot-separated object keys.
 *
 * e.i.
 * ```ts
 * const obj = {
 *    account: {
 *      user: {
 *        lastname: 'Foo'
 *      }
 *    }
 * };
 * const lastname = getVal(obj, 'account.user.lastname')
 * ```
 *
 * @param obj 
 * @param path dot-separated object (nested) keys
 */
export function get_val<T=any>(obj: any, path: string): T|null {
  if (typeof obj === 'undefined' || Array.isArray(obj) || typeof obj !== 'object') {
    return null
  }
  const paths = path.split('.')
  let i = 0,
    key = paths[i],
    candidate = obj[key]

  while (i < paths.length) {
    if (!candidate) {
      break
    } else if (i >= paths.length - 1) {
      return candidate
    }
    i++
    key = paths[i]
    candidate = candidate[key]
  }

  return null
}

/**
 * Adds a new property and value to an object.
 *
 * @param data an object
 * @param prop new property name of object
 * @param val the value at that object property
 */
const create_writable_property = (data: any, prop: string, val: any): void => {
  Object.defineProperty(data, prop, {
    value: val,
    writable: true
  })
}

/**
 * Set a value within an object.
 *
 * @param obj arbitrary object
 * @param path dot-separated list of properties
 *              e.g. "pagination.users.limit"
 * @param val value to be assigned
 *
 * @todo NOT TESTED, please test
 */
export function set_val(obj: any, path: string, val: any): void {
  const propArray = path.split('.')
  let o = obj,
      candidate: any,
      j = 0

  do {
    let prop = propArray[j]
    candidate = o[prop]

    // if this is the last property
    if (j >= (propArray.length - 1)) {
      create_writable_property(o, prop, val)
      return

    // if the property does not exist but a value was provided
    } else if (!candidate) {
      create_writable_property(o, prop, {})
    }

    o = o[prop]
    j++
  } while (1)
}

/** Get the query string value by key. */
export function get_query_val(url: string, key: string): string {
  const query = url.split('?')[1]
  if (!query) return ''
  const pairs = query.split('&')
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i]
    const [k, v] = pair.split('=')
    if (k === key) return v
  }
  return ''
}

/** Get all query string keys as an array */
export function get_query_keys(url: string): string[] {
  const query = url.split('?')[1]
  if (!query) return []
  return query.split('&').map((pair) => pair.split('=')[0])
}

/** Get all query string values as an object */
export function get_query_values(url: string): { [key: string]: string } {
  const query = url.split('?')[1]
  if (!query) return {}
  const values: { [key: string]: string } = {}
  const pairs = query.split('&')
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i]
    const [k, v] = pair.split('=')
    values[k] = v
  }
  return values
}

export function set_url_query_val(url: string, param: string, val?: string) {
  const urlObj = new URL(url)
  const query = new URLSearchParams(urlObj.searchParams)
  const { origin, pathname } = urlObj
  if (typeof val === 'undefined') {
    query.delete(param)
    const newUrl = `${origin}${pathname}?${query.toString()}`
    return newUrl
  }
  query.set(param, val.toString())
  const newUrl = `${origin}${pathname}?${query.toString()}`
  return newUrl
}

// Delete array elements by index range.
export function delete_range<T>(arr: T[], start: number, end: number): T[] {
  return arr.slice(0, start).concat(arr.slice(end + 1))
}

/**
 * Get HTML head meta data.
 *
 * @param name 
 * @returns 
 */
export function get_head_meta_content(name: string): string {
  const meta = document.querySelector(`meta[name="${name}"]`)

  if (meta) {
    return (meta as HTMLMetaElement).content
  }

  // err(`Meta with '${name}' name does not exist.`)

  return ''
}

/**
 * Converts an endpoint which contains hyphens to a camel case
 * version.
 *
 * @param endpoint
 */
export function camelize(endpoint: string): string {
  return endpoint.replace(/-([a-zA-Z])/g, g => g[1].toUpperCase())
}

/** Convert falsy to an empty string */
export function falsy_to_empty_string(value: any): string {
  return value || ''
}

/**
 * Safely get a value from the given object.
 *
 * This function will prevent exceptions or catch them so they can be store and
 * viewed later without crashing the app.
 *
 * @param obj 
 * @param path     an existing property of `obj` or a dot-separated list of
 *                 properties.
 * @param _default value to return if `obj[path]` is undefined
 * @deprecated
 */
export function safely_get(obj: any, path = '', _default?: any): any {
  const value = get_val(obj, path)

  if (value !== null) {
    return value
  }

  // force function to return undefined
  if (_default === 'undefined') {
    return undefined
  }

  if (_default === undefined) {
  
    // If a path was not provided, we can safely assume that the object is being
    // tested for a valid value
    if (!path) return {}
  
    return null
  }

  return _default
}

/**
 * Get a value from an object as the same type as the default value without
 * causing an exception.
 */
export function safely_get_as<T=any>(obj: any, path = '', _default: T): T {
  const value = get_val<T>(obj, path)

  return value !== null ? value : _default
}

/**
 * Given a URL, it will return the content as a string.
 *
 * Note: This function is NOT used anywhere. Most likely, it is safe to remove.
 *
 * @param theUrl 
 *
 * @see https://stackoverflow.com/questions/10642289/return-html-content-as-a-string-given-url-javascript-function
 */
export function http_get(theUrl: string): void
{
  // code for IE7+, Firefox, Chrome, Opera, Safari
  const xmlhttp = new XMLHttpRequest()

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      return xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET", theUrl, false);
  xmlhttp.send();    
}

/**
 * Ensures the origin URL is valid and has an ending forward slash.
 *
 * @returns string
 */
export function get_origin_ending_fixed(origin?: string): string {
  if (origin) {
    const endingChar = origin.charAt(origin.length - 1)
    return endingChar === '/' ? origin : origin + '/'
  }
  return window.location.origin + '/'
}

/** Ensures that question mark symbol is included query string. */
export function get_query_starting_fixed(query?: string): string {
  if (query) {
    const startingChar = query.charAt(0)
    return startingChar === '?' ? query : '?' + query
  }
  return ''
}

/**
 * Parses the definition string found in `PageState.content` and
 * `StateDialogForm.content`.
 *
 * Format: "type : name : endpoint : args"
 *
 * **type**: Type of content found on the page.  
 * **name**: Identifier for a a specific content.  
 * **endpoint**: to which data may be sent or retrieve for the page.  
 * **args**: URL arguments when making server request using the enpoint.  
 * 
 * __Note__: This method may be made to be `private` or `protected` in the
 * near future, depending on current and future scenarios.
 * 
 * @param content 
 * @returns `IStatePageContent` object.
 */
export function get_parsed_page_content(str?: string): IStatePageContent {
  const content = str ?? ''
  const options = content.replace(/\s+/g, '').split(':')
  if (options.length <= 1) {
    ler('get_parsed_page_content: Invalid or missing `page` content definition')
    return {
      type: APP_CONTENT_VIEW,
      name: DEFAULT_LANDING_PAGE_VIEW
    }
  }
  const contentObj: IStatePageContent = {
    type: options[0],
    name: options[1]
  }
  if (options.length >= 3) {
    contentObj.endpoint = options[2]
  }
  if (options.length >= 4) {
    contentObj.args = options[3]
  }
  return contentObj
}

/**
 * Save array index into the array element.
 * 
 * **Purpose:** Useful for array of object where an element needs to be modify
 * and retrieve in the index directly from the element to be modify avoid
 * having to iterate through the array find it.
 *
 * **Be careful:** Object to be indexed must extends the `IFeetlyIndexed`
 * interface.
 */
export function jsonapi_fleetly_index(a: IJsonapiResourceAbstract[]) {
  if (a.length <= 0
    || (a.length > 0 && typeof a[0] !== 'object' && !Array.isArray(a[0]))
  ) {
    err('Cannot index non-object array element.')
    return
  }
  a.map((e, i) => e._index = i)
}

/** Type for event's callback defined with a string. */
export type THandleEvent = 'onclick' | 'onchange' | 'onkeydown' | 'onblur'

/** Parse event's callback defined with a string. @deprecated */
export function get_handle_prop_name(handle: string): {
  event: THandleEvent,
  callbackName: string
} {
  const pieces = handle.replace(/\s+/g, '').split(':')

  if (pieces.length > 1) {
    return {
      event: pieces[0] as THandleEvent,
      callbackName: pieces[1]
    }
  }

  return {
    event: 'onclick',
    callbackName: handle
  }
}
