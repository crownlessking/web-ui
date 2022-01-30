import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
// import logger from 'redux-logger'// TODO Uncomment when debugging Redux
// import thunk from 'redux-thunk'
import preloadedState from './initial.state'
import infoReducer from '../slices/app.slice'
import appBarReducer from '../slices/appBar.slice'
import metaReducer from '../slices/meta.slice'
import appBarSearchesReducer from '../slices/appBarSearches.slice'
import backgroundReducer from '../slices/background.slice'
import typographyReducer from '../slices/typography.slice'
import dialogReducer from '../slices/dialog.slice'
import dialogsReducer from '../slices/dialogs.slice'
import drawerReducer from '../slices/drawer.slice'
import formsReducer from '../slices/forms.slice'
import pagesReducer from '../slices/pages.slice'
import dataReducer from '../slices/data.slice'
import errorsReducer from '../slices/errors.slice'
import pagesDataReducer from '../slices/pagesData.slice'
import formsDataReducer from '../slices/formsData.slice'
import snackbarReducer from '../slices/snackbar.slice'
import tmpReducer from '../slices/tmp.slice'
import topLevelLinksReducer from '../slices/topLevelLinks.slice'
import themeReducer from '../slices/theme.slice'
import netReducer from '../slices/net.slice'
import allActions from './actions'
import Config from '../config'

export const NET_PATCH_STATE = 'NET_PATCH_STATE'
export const netPatchState = (stateFragment: any) => ({
  type: NET_PATCH_STATE,
  payload: stateFragment
})

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
function netPatchStateReducer(state: any, fragment: any) {
  try {
    for (const prop in fragment) {
      const newStateVal = fragment[prop]

      switch (typeof newStateVal) {

      case 'object':
        if (newStateVal === null) continue

        if (!Array.isArray(newStateVal)) { // if newStateVal is NOT an array
          state[prop] = { ...state[prop] }
          netPatchStateReducer(state[prop], newStateVal)
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
        state[prop] = newStateVal
        break
      } // END switch

    }
  } catch (e: any) {
    if (Config.DEBUG) console.error(e.stack)
  }

}

const appReducer = combineReducers({
  app: infoReducer,
  appBar: appBarReducer,
  appBarSearches: appBarSearchesReducer,
  background: backgroundReducer,
  data: dataReducer,
  dialog: dialogReducer,
  dialogs: dialogsReducer,
  drawer: drawerReducer,
  errors: errorsReducer,
  forms: formsReducer,
  formsData: formsDataReducer,
  meta: metaReducer,
  net: netReducer,
  pages: pagesReducer,
  pagesData: pagesDataReducer,
  snackbar: snackbarReducer,
  theme: themeReducer,
  tmp: tmpReducer,
  topLevelLinks: topLevelLinksReducer,
  typography: typographyReducer,
})

const rootReducer = (state: any, action: any) => {

  if (action.type === NET_PATCH_STATE) {
    netPatchStateReducer(state, action.payload)

    return appReducer(state, action)
  }

  return appReducer(state, action)
}

// https://redux-toolkit.js.org/usage/usage-with-typescript
// https://redux-toolkit.js.org/api/configureStore
const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware()
  //   .prepend(
  //     thunk
  //     // TODO add more middlewares here
  //   )
    // .concat(logger) // TODO Uncomment when debugging Redux
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

/**
 * Ensures that callbacks for buttons, links (, and more) can access the redux
 * store and fire all available redux actions...
 * Even if the callback is implemented in a pure javascript file.
 */
export interface IRedux {
  store: typeof store
  actions: typeof allActions

  /**
   * If you don't want to define a callback for your button or link,
   * you can use the href prop to set the target page. It's value will
   * then be passed to this route key.
   */
  route?: string
}

export default store
