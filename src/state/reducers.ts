import app from './app/reducer'
import appBar from '../material/appbar/reducer'
import appBarSearches from '../material/appbar/searchfield/reducer'
import data from './data/reducer'
import errors from './errors/reducer'
import formsData from './forms/data/reducer'
import meta from './meta/reducer'
import pagesData from './pages/data/reducer'
import pages from './pages/reducer'
import topLevelLinks from './links.toplevel/reducer'
import background from '../material/background/reducer'
import tmp from './tmp/reducer'
import typography from '../material/typography/reducer'
import dialog from '../material/dialog/reducer'
import dialogs from './dialogs/reducer'
import drawer from '../material/drawer/reducer'
import forms from './forms/reducer'
import snackbar from '../material/snackbar/reducer'
import Config from '../config'

/**
 * Merges fragment state received from server into the current redux state.
 *
 * @param state current redux state
 * @param fragment fragment state received from server
 *
 * @returns void
 */
export function mergeState(state: any, fragment: any): void {

  try {
    for (const prop in fragment) {
  
      if (prop in state) {
        const oldStateVal = state[prop]
        const newStateVal = fragment[prop]
  
        switch (typeof oldStateVal) {
  
        case 'object':
          state[prop] = { ...oldStateVal }
          return mergeState(state[prop], newStateVal)
  
        case 'symbol':
        case 'bigint':
        case 'number':
        case 'function':
        case 'string':
        case 'boolean':
          state[prop] = newStateVal
        }
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
