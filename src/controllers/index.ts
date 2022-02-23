import Config from '../config'
import { IRedux } from '../state'
import AbstractState from './AbstractState'
import StateLink from './StateLink'

export type TCallback = (e: any) => void

// layouts

export const LAYOUT_CENTERED = 'LAYOUT_CENTERED'
export const LAYOUT_CENTERED_NO_SCROLL = 'LAYOUT_CENTERED_NO_SCROLL'
export const LAYOUT_MINI_DRAWER_CONTENT = 'LAYOUT_MINI_DRAWER_CONTENT'
export const LAYOUT_TABLE_VIRTUALIZED = 'LAYOUT_TABLE_VIRTUALIZED'
export const LAYOUT_DEFAULT = 'LAYOUT_DEFAULT'
export const LAYOUT_NONE = 'LAYOUT_NONE'

// content types

export const APP_CONTENT_VIEW = '$view'

// miscellanous

export const DEFAULT_LANDING_PAGE = 'default-landing'
export const DEFAULT_PAGE_NOT_FOUND = 'default-notfound'
export const CONTENT_PAGE_NOT_FOUND = 'notfound_page'

// messages

export const FIELD_NAME_NOT_SET = 'FIELD NAME NOT SET!'

/**
 * Sometimes, you don't want a hard crash. Sometimes, you want a simple
 * console print out.
 */
export function log(message: string): void {
  if (Config.DEBUG) {
    console.log(message)
  }
}

/**
 * A simple shortcut for triggering exceptions and preventing unecessarily
 * inflated code blocks.
 */
export function err(message?: string): void {
  if (Config.DEBUG) {
    throw new Error (message)
  }
}

/**
 * Get page name.
 *
 * This function is only used to store a data for a page into `state.tmp`.
 *
 * @param name 
 */
 export function getPageName(name: string): string {
  return name + 'Page'
}

/**
 * If a callback is required for a link or button but is not defined, then this
 * method will provide a dummy one.
 */
export function getDudEventCallback (): TCallback {
  return (e: any) => { }
}

/**
 * If a callback is required for a link or button but is not defined, then this
 * method will provide a dummy one.
 */
export function dummyCallback (redux: IRedux): TCallback {
  return (e: any) => { }
}

/**
 * If a link was not provided a callback, this one should be called
 * automatically.
 *
 * The app page will be updated based on the URL change triggered by the link.
 */
export function defaultCallback ({store, actions, route}:IRedux): TCallback {
  return (e: any) => {
    if (route) {
      store.dispatch(actions.appUrlPageUpdate(route))
    }
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
export function getFontAwesomeIconProp(iconDef: string): string[]|string {
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
export function getViewportSize(): { width: number; height: number }
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
export function stretchToBottom(bottom: number): number {
  const height = getViewportSize().height

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
export function getVal(obj: any, path: string): any {
  if (obj === undefined || Array.isArray(obj) || typeof obj !== 'object') {
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
const createWritableProperty = (data: any, prop: string, val: any): void => {
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
export function setVal(obj: any, path: string, val: any): void {
  const propArray = path.split('.')
  let o = obj,
      candidate: any,
      j = 0

  do {
    let prop = propArray[j]
    candidate = o[prop]

    // if this is the last property
    if (j >= (propArray.length - 1)) {
      createWritableProperty(o, prop, val)
      return

    // if the property does not exist but a value was provided
    } else if (!candidate) {
      createWritableProperty(o, prop, {})
    }

    o = o[prop]
    j++
  } while (1)
}

/**
 * Get global variable value.
 *
 * Since there's a number of global variables that are defined by clients,
 * there's a strong chance that some or all of them may be undefined.
 * This function is a solution to that problem.
 *
 * @param varName string representation of in-code variable identifier.
 * @returns object or throws an exception
 * @throws an exception if the global variable name is invalid.
 */
export function getGlobalVar(varName: string): any {
  try {
    return window[varName]
  } catch (e: any) {
    err(`Global variable "${varName}" does not exist.`)
  }
  return { }
}

/**
 * Get HTML head meta data.
 *
 * @param name 
 * @returns 
 */
export function getHeadMetaContent(name: string): string {
  const meta = document.querySelector(`meta[name="${name}"]`)

  if (meta) {
    return (meta as HTMLMetaElement).content
  }

  // err(`Meta with '${name}' name does not exist.`)

  return ''
}

/**
 * Format routes
 *
 * **dev**
 * This function was created because I did not want to be force to include
 * the starting forwardslash in the route when defining buttons and links.
 * I believe it is much cleaner (in terms of naming convension) to keep the
 * forwardslash out of the definition.
 * Although an entire function is not necessary but you never know, the
 * route formatting process might grow in complexity in the furture.
 *
 * @todo This function could be moved to `links.controller.ts` file once it is
 *       created OR if there is a need to create it.
 *
 * @param route
 */
export function getFormattedRoute(def: StateLink, href?: string): string {
  const route = def.has.route
  if (route) {
    return route.charAt(0) !== '/' ? `/${route}` : route
  }
  return href || ''
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

/**
 * Generates a mongodb ObjectId
 *
 * @see https://gist.github.com/solenoid/1372386
 */
export function mongoObjectId(): string {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16)
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16)
  }).toLowerCase()
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
 */
export function safelyGet(obj: any, path?: string, _default?: any): any {
  const value = getVal(obj, path || '')

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
 * Given a URL, it will return the content as a string.
 *
 * Note: This function is NOT used anywhere. Most likely, it is safe to remove.
 *
 * @param theUrl 
 *
 * @see https://stackoverflow.com/questions/10642289/return-html-content-as-a-string-given-url-javascript-function
 */
export function httpGet(theUrl: string): void
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
export function getOriginEndingFixed(origin?: string): string {
  if (origin) {
    const endingChar = origin.charAt(origin.length - 1)

    return endingChar === '/' ? origin : origin + '/'
  }
  return window.location.origin + '/'
}

/**
 * Parses a cone expression.
 *
 * e.g. "<appInfo.origin>"
 *
 * Use a cone expression to give a property the value of another property. e.g.
 *
 * ```ts
 * const appNet = {
 *   headers: {
 *     origin: '<appInfo.origin>'
 *   }
 * };
 * ```
 *
 * `appNet.headers.origin` now as the value of `appInfo.origin`
 *
 * @param state that supports cone expressions
 * @param cone  the cone expression
 * @returns 
 */
export function parseConeExp(state: AbstractState, cone: string): string {
  if (/^<([-$_a-zA-Z0-9\\/]+)(\.[-$_a-zA-Z0-9\\/]+)*>$/.test(cone)) {
    const value = getVal(state, cone.substring(1).substring(0, cone.length - 2))
    if (!value) {
      err(`Cone expression resolution on '${cone}' failed.`)
    }
    return value
  }
  return cone
}
