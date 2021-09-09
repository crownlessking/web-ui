import store from '..'
import { APP_SWITCHED_PAGE, showSpinner } from './actions'
import { IStateAllForms, IStateApp } from '../../interfaces'
import StateController from '../../controllers/state.controller'
import State from '../controller'

/**
 * Temporarily holds the handle id of a `setTimeout` function which has been
 * scheduled to run.
 *
 * The variable's purpose is to prevent functions from running after they have
 * been scheduled to do so via `setTimeout`
 */
let handle: any

/**
 * Parses the definition `string` found in `pageState.content`
 * e.g. the page definition object
 *
 * @param def
 *
 * @deprecated
 */
export function parseContentDef(def: string | undefined) {
  if (def) {
    const options = def.replace(/\s+/g,'').split(':')
    if (options.length >= 3) {
      return {
        type: options[0],
        name: options[1],
        endpoint: options[2],
        args: options[3] || ''
      }
    }
  }
  throw new Error('Invalid `page` content definition')
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
 * Get the form state.
 *
 * __Problem__: We implemented a solution for applying default values to form
 * fields. However, although it worked, the solution caused React to complain.
 * To stop react from complaining we had to move the solution from `render()`
 * to `componentDidMount()`.
 * Since we do not want duplicate codes, we decided to move the part of the
 * logic that involves acquiring the form state to this function.
 *
 * @param stateAllForms 
 * @param name 
 */
export function getStateForm (stateAllForms: IStateAllForms, name: string) {
  const formName = getStateFormName(name)
  return { stateForm: stateAllForms[formName], formName }
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

/**
 * Get the proper route.
 *
 * This function helps by giving priority to page switching triggered by the Redux
 * state over those triggered by a URL change.
 * It's an implementation issue. Initially, you could not tell the difference between
 * a route change from the Redux state and the URL.
 * So I introduced a new status that indicates that the app is switching page from
 * Redux state change and these have priority over those from URL change.
 *
 * @param stateRoute route from the Redux state
 * @param pathname   route from the URL
 * @param status     current app status
 */
export function getRoute(stateRoute: string, pathname: string, status?: string) {
  return status === APP_SWITCHED_PAGE ? stateRoute : pathname
}

export default class StateApp extends StateController implements IStateApp {

  private app: IStateApp
  private parentDef: State
  private originValidation: boolean

  constructor(app: IStateApp, parent: State) {
    super()
    this.app = app
    this.parentDef = parent
    this.originValidation = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
        .test(this.app.origin)
  }

  /**
   * Get a copy of the app definition.
   */
  get state() { return this.app }

  get patched() {
    throw new Error(`'Patched app state' NOT implemented.`)
  }

  /**
   * Chain-access to parent (root) definition.
   */
  get parent() { return this.parentDef }

  get origin() { return this.app.origin }

  /**
   * Chain-access to the current page route.
   */
  get route() { return this.app.route }

  get showSpinner() { return this.app.showSpinner }

  get status() { return this.app.status || '' }

  get title() { return this.app.title }

  get logo() { return this.app.logo || ''}

  get lastRoute() { return this.app.lastRoute || ''}

  /**
   * @returns returns `true` if origin is a valid URL.
   */
  originIsValid = () => {
    return this.originValidation
  }

}
