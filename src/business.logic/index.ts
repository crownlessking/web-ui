import Config from '../config'
// WARNING: Do not import anything here.

/**
 * Log Error message if in debug mode.
 * @param msg
 */
function ler(msg: string): void {
  if (Config.DEBUG) {
    console.error(msg)
  }
}

/**
 * Holds the last rendered content so that if a new one was not provided,
 * that one can be used.
 */
let currentContentJsx: JSX.Element | null

/** Get the last rendered content. */
export function get_last_content_jsx(): JSX.Element | null {
  return currentContentJsx
}

/** Save the newly rendered content. */
export function save_content_jsx(content: JSX.Element | null): void {
  currentContentJsx = content
}

export function clear_last_content_jsx(): void {
  currentContentJsx = null
}

/** Returns `true` if the argument is an object. */
export const is_object = (obj: any) => {
  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    return true
  }
  return false
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
 * Ensures the origin is a valid URL has an ending forward slash.
 *
 * @returns string
 */
export function get_origin_ending_fixed(origin?: string): string {
  if (origin) {
    return origin.slice(-1) === '/' ? origin : origin + '/'
  }
  return window.location.origin + '/'
}

/**
 * Ensures that the endpoint has an ending forward slash.
 *
 * @returns string
 * @returns fixed endpoint
 */
export function get_endpoint_ending_fixed(endpoint?: string): string {
  if (endpoint) {
    return endpoint.slice(-1) === '/' ? endpoint : endpoint + '/'
  }
  return ''
}

/**
 * Removes ending forward slash from the endpoint if there is one.
 *
 * @param endpoint
 * @returns string
 */
export function clean_endpoint_ending(endpoint?: string): string {
  if (endpoint) {
    return endpoint.slice(-1) === '/' ? endpoint.slice(0, -1) : endpoint
  }
  return ''
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
 * Get the form state name
 *
 * __Problem__: We needed a way to get the `formName` without the use of any
 * other information. This problem arised while attempting to display a form
 * in the fullscreen dialog of the virtualized table, which appears when
 * clicking on a row to edit or view data in greater detail.
 *
 * @param name 
 */
export function get_state_form_name(name: string): string {
  return name.slice(-4) === 'Form' ? name : name + 'Form'
}

/**
 * Ensures that the dialog name ends with 'Dialog'.
 *
 * @param {string} name 
 * @returns {string}
 */
export function get_state_dialog_name(name: string): string {
  return name.slice(-6) === 'Dialog' ? name : name + 'Dialog'
}

/** Get the bootstrap key from head tag. */
export function get_bootstrap_key(): string {
  const savedKey = Config.read('bootstrap_key', '')
  if (savedKey) { return savedKey }
  const meta = document.querySelector('meta[name="bootstrap"]')
  const key = (meta as HTMLMetaElement)?.content
  if (key) {
    Config.set('bootstrap_key', key)
    return key
  }
  return ''
}

/**
 * Generates a mongodb ObjectId
 *
 * @see https://gist.github.com/solenoid/1372386
 */
export function mongo_object_id(): string {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16)
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16)
  }).toLowerCase()
}

/**
 * Removes leading and ending forward and back slashes.
 *
 * @param str 
 */
export function trim_slashes(str: string): string {
  let s = str
  while(s.charAt(0) === '/' || s.charAt(0) === '\\')
  {
    s = s.substring(1);
  }
  while (s.charAt(s.length - 1) === '/' || s.charAt(s.length - 1) === '\\')
  {
    s = s.substring(0, s.length - 1)
  }
  return s
}

/**
 * Extracts the endpoint from the pathname.
 *
 * The pathname can include a query string e.g. `name1/name2?q=123`
 *
 * This function will not work with whole URL that includes the domain name
 * and/or the protocol.
 *
 * @param pathname 
 */
export function get_endpoint(pathname: string): string {
  let pname = trim_slashes(pathname);
  const argsIndex = pathname.indexOf('?')
  if (argsIndex >= 0) {
    pname = pathname.substring(0, argsIndex)
  }
  const params = pname.split(/\/|\\/)

  return params[params.length - 1]
}

/**
 * Given a URL, it will return the content as a string.
 *
 * Note: This function is NOT used anywhere. Most likely, it is safe to remove.
 *
 * @param theUrl 
 *
 * @see https://stackoverflow.com/questions/10642289/return-html-content-as-a-string-given-url-javascript-function
 * @deprecated
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
 * Get the right theme state.
 * @param mode light or dark
 * @param main the main state
 * @param light the light state
 * @param dark the dark state
 * @returns the right state
 */
export function get_themed_state<T=any>(
  mode: 'dark'|'light',
  main: any,
  light: any,
  dark: any
): T {
  if (light && dark) {
    return mode === 'dark' ? dark : light
  }
  ler(`get_themed_state: light or dark state is missing.`)
  return main
}
