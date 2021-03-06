import store, { RootState } from '.'
import { appShowSpinner } from '../slices/app.slice'
import { err } from '../controllers'
import Config from '../config'

/**
 * Temporarily holds the handle id of a `setTimeout` function which has been
 * scheduled to run.
 *
 * The variable's purpose is to prevent functions from running after they have
 * been scheduled to do so via `setTimeout`
 */
let handle: any

export function getBootstrapKey(): string {
  const key = document.querySelector('meta[name="bootstrap"]')

  if (key) {
    return (key as HTMLMetaElement).content
  }

  err('Missing bootstrap key')

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
export function getStateFormName(name: string): string {
  return name + 'Form'
}

export function getStateDialogName(name: string): string {
  return name + 'Dialog'
}

/**
 * We don't want to spinner to show up right away, so we schedule it to appear
 * if a specific operation takes too long.
 *
 * @param time when is the spinner scheduled to appear in milliseconds 
 */
export function _scheduleSpinner(time = 200): void {
  if (!handle) {
    const callback = () => store.dispatch(appShowSpinner())
    handle = setTimeout(callback, time)
  }
}

/**
 * Cancels a spinner which was previously scheduled to show.
 *
 * Whenever the app makes an Ajax request, the spinner would flash for a split second.
 * This made for a horrible user experience when paginating through rows of data
 * (the page would constantly flicker).
 * With this function, the spinner will only show when the request takes longer than
 * it should to complete which then prevents the flickering.
 *
 * Note: consider using another type of spinner e.i. the thin spinner bar that
 *       can be placed at the top of the page.
 */
export function _cancelSpinner(): void {
  if (handle) {
    clearTimeout(handle)
    handle = null
  }
}

/**
 * Configuration might need to be updated if state is loaded remotely.
 *
 * @param state
 */
 export function setConfiguration(state: RootState): void {
  Config.write('DEBUG', state.app.inDebugMode)
}

/** Get the default drawer width. */
export function getDrawerWidth(): number {
  return store.getState().drawer.width
}

/**
 * Removes leading and ending forward and back slashes.
 *
 * @param str 
 */
 export function trimSlashes(str: string): string {
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
export function getEndpoint(pathname: string): string {
  let pname = trimSlashes(pathname);
  const argsIndex = pathname.indexOf('?')
  if (argsIndex >= 0) {
    pname = pathname.substring(0, argsIndex)
  }
  const params = pname.split(/\/|\\/)

  return params[params.length - 1]
}
