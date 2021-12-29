import store from '.'
import { showSpinner } from './app/actions'
import { err } from '../controllers'

/**
 * Temporarily holds the handle id of a `setTimeout` function which has been
 * scheduled to run.
 *
 * The variable's purpose is to prevent functions from running after they have
 * been scheduled to do so via `setTimeout`
 */
let handle: any

export function getBootstrapKey() {
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
