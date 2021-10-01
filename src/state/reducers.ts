import app from './app/reducer'
import appBar from '../mui4/appbar/reducer'
import appBarSearches from '../mui4/appbar/searchfield/reducer'
import data from './data/reducer'
import errors from './errors/reducer'
import formsData from './forms/data/reducer'
import meta from './meta/reducer'
import pagesData from './pages/data/reducer'
import pages from './pages/reducer'
import topLevelLinks from './links.toplevel/reducer'
import background from '../mui4/background/reducer'
import tmp from './tmp/reducer'
import typography from '../mui4/typography/reducer'
import dialog from '../mui4/dialog/reducer'
import dialogs from './dialogs/reducer'
import drawer from '../mui4/drawer/reducer'
import forms from './forms/reducer'
import snackbar from '../mui4/snackbar/reducer'
import Config from '../config'

/**
 * Merges fragment state received from server into the current redux state.
 *
 * @param state current redux state
 * @param fragment fragment state received from server
 *
 * @returns void
 */
 export function getNetMergedState(state: any, fragment: any) {
  try {
    for (const prop in fragment) {
      const newStateVal = fragment[prop]

      switch (typeof newStateVal) {

      case 'object':
        if (newStateVal === null) continue

        if (!Array.isArray(newStateVal)) { // if newStateVal is NOT an array
          state[prop] = { ...state[prop] }
          getNetMergedState(state[prop], newStateVal)
        } else {

          // arrays are never deeply copied
          state[prop] = [ ...newStateVal ]
        }

        break

      case 'symbol':
      case 'bigint':
      case 'number':
      case 'function':
      case 'string':
      case 'boolean':
        state[prop] = newStateVal
      }

    }
  } catch (e: any) {
    if (Config.DEBUG) console.error(e.stack)
  }

}

// Export all reducers in one object
const allReducers = {
  app,
  appBar,
  appBarSearches,
  background,
  data,
  dialog,
  dialogs,
  drawer,
  errors,
  formsData,
  forms,
  meta,
  pagesData,
  pages,
  snackbar,
  tmp,
  topLevelLinks,
  typography
}

export default allReducers
