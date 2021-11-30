import store from '..'
import { showSpinner } from './actions'
import { IStateApp } from '../../interfaces'
import AbstractState from '../../controllers/AbstractState'
import State from '../../controllers/State'
import { err } from '../../controllers'

/**
 * Temporarily holds the handle id of a `setTimeout` function which has been
 * scheduled to run.
 *
 * The variable's purpose is to prevent functions from running after they have
 * been scheduled to do so via `setTimeout`
 */
let handle: any

export function getBootstrapKey() {
  const key = document.querySelector('meta[name="source"]')

  if (key) {
    return (key as HTMLMetaElement).content
  }

  err('Invalid bootstrap key')

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
export function getStateFormName(name: string) {
  return name + 'Form'
}

/**
 * We don't want to spinner to show up right away, so we schedule it to appear
 * if a specific operation takes too long.
 *
 * @param time when is the spinner scheduled to appear in milliseconds 
 */
export function _scheduleSpinner(time = 200) {
  if (!handle) {
    const callback = () => store.dispatch(showSpinner())
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
export function _cancelSpinner() {
  if (handle) {
    clearTimeout(handle)
    handle = null
  }
}

export function getOriginValidation(origin: string) {
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
      .test(origin)
}

/**
 * Get location origin URL.
 *
 * @returns string
 */
export function getLocationOrigin() {
  return window.location.origin + '/'
}

/**
  * Ensures the origin URL is valid and has an ending forward slash.
  *
  * @returns string
  */
function getOriginEndingFixed(origin: string) {
  const endingChar = origin.charAt(origin.length - 1)

  return endingChar === '/' ?  origin : origin + '/'
}

/**
 * Get the origin URL determined to be valid.
 *
 * @returns string
 */
export function getOrigin() {
  const userOrigin = store.getState().app.origin

  return getOriginEndingFixed(userOrigin)
}

export default class StateApp extends AbstractState implements IStateApp {

  private appJson: IStateApp
  private parentObj: State
  private appOrigin?: string

  constructor(app: IStateApp, parent: State) {
    super()
    this.appJson = app
    this.parentObj = parent
  }

  /**
   * Get a copy of the app definition.
   */
  get json() { return this.appJson }

  /**
   * Chain-access to parent (root) definition.
   */
  get parent() { return this.parentObj }

  get inDebugMode() {
    return this.appJson.inDebugMode
  }

  get origin() {
    return this.appOrigin || (
      this.appOrigin = getOriginEndingFixed(this.appJson.origin)
    )
  }

  /**
   * Chain-access to the current page route.
   */
  get route() { return this.appJson.route }

  get showSpinner() { return this.appJson.showSpinner }

  get status() { return this.appJson.status || '' }

  get title() { return this.appJson.title }

  get logo() { return this.appJson.logo || ''}

  get lastRoute() { return this.appJson.lastRoute || ''}

}
