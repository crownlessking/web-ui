import app from './app/reducer'
import appBar from '../mui/appbar/reducer'
import appBarSearches from '../mui/appbar/searchfield/reducer'
import data from './data/reducer'
import errors from './errors/reducer'
import formsData from './forms/data/reducer'
import meta from './meta/reducer'
import pagesData from './pages/data/reducer'
import pages from './pages/reducer'
import topLevelLinks from './links.toplevel/reducer'
import background from '../mui/background/reducer'
import tmp from './tmp/reducer'
import typography from '../mui/typography/reducer'
import dialog from '../mui/dialog/reducer'
import dialogs from './dialogs/reducer'
import drawer from '../mui/drawer/reducer'
import forms from './forms/reducer'
import snackbar from '../mui/snackbar/reducer'
import net from './net/reducer'
import theme from './theme/reducer'
import Config from '../config'

/**
 * Merges fragment state received from server into the current redux state.
 *
 * @param state current redux state
 * @param fragment fragment state received from server
 *
 * @returns void
 *
 * [TODO] Write a unit test for this function
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
      case 'boolean':
        state[prop] = newStateVal
        break
      case 'string':
        // if (prop.toLowerCase() === 'onclick'
        //   || 'callback' === prop.toLowerCase()
        // ) {
        //   state[prop] = eval(`(${newStateVal})`)
        // } else {
        //   state[prop] = newStateVal
        // }
        state[prop] = newStateVal
        break
      } // END switch

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
  net,
  pagesData,
  pages,
  snackbar,
  theme,
  tmp,
  topLevelLinks,
  typography
}

export default allReducers
