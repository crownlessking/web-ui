import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
// import logger from 'redux-logger'// TODO Uncomment when debugging Redux
// import thunk from 'redux-thunk'
import infoReducer, { appActions } from '../slices/app.slice'
import appBarReducer, { appBarActions } from '../slices/appBar.slice'
import metaReducer, { metaActions } from '../slices/meta.slice'
import appBarQueriesReducer, { appBarQueriesActions } from '../slices/appBarQueries.slice'
import backgroundReducer, { backgroundActions } from '../slices/background.slice'
import typographyReducer, { typographyActions } from '../slices/typography.slice'
import dialogReducer, { dialogActions } from '../slices/dialog.slice'
import dialogsReducer from '../slices/dialogs.slice'
import drawerReducer, { drawerActions } from '../slices/drawer.slice'
import formsReducer, { formsActions } from '../slices/forms.slice'
import pagesReducer, { pagesActions } from '../slices/pages.slice'
import dataReducer, { dataActions } from '../slices/data.slice'
import dataLoadedPagesSlice from 'src/slices/dataLoadedPages.slice'
import errorsReducer, { errorsActions } from '../slices/errors.slice'
import pagesDataReducer, { pagesDataActions } from '../slices/pagesData.slice'
import formsDataReducer, { formsDataActions } from '../slices/formsData.slice'
import formsDataErrorsReducer, { formsDataErrorsActions } from '../slices/formsDataErrors.slice'
import snackbarReducer, { snackbarActions } from '../slices/snackbar.slice'
import tmpReducer, { tmpActions } from '../slices/tmp.slice'
import topLevelLinksReducer, { topLevelLinksActions } from '../slices/topLevelLinks.slice'
import themeReducer, { themeActions } from '../slices/theme.slice'
import netReducer, { netActions } from '../slices/net.slice'
import { err, ler } from '../controllers'
import { set_configuration } from './_business.logic'
import { NET_STATE_PATCH_DELETE, TCallback } from '../constants'
import { remember_exception } from './_errors.business.logic'

const BOOTSTRAP_CALLBACK_LIST: ((redux: IRedux) => void)[] = []

export const NET_STATE_PATCH = 'NET_STATE_PATCH'
export const netPatchState = (stateFragment: any) => ({
  type: NET_STATE_PATCH,
  payload: stateFragment
})

/**
 * Merges fragment state received from server into the current redux state.
 *
 * @param oldState current redux state
 * @param fragment piece of state received from server
 *
 * @returns RootState
 *
 * [TODO] Write a unit test for this function
 */
function netPatchStateReducer(oldState: any, fragment: any) {
  const state = { ...oldState }
  try {
    for (const prop in fragment) {
      const newStateVal = fragment[prop]

      switch (typeof newStateVal) {

      case 'object':
        if (newStateVal === null) continue

        if (!Array.isArray(newStateVal)) { // if newStateVal is NOT an array
          state[prop] = netPatchStateReducer(state[prop], newStateVal)
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
        if (newStateVal === NET_STATE_PATCH_DELETE) {
          state[prop] = undefined
        } else {
          state[prop] = newStateVal
        }
        break
      } // END switch

    }
  } catch (e: any) {
    remember_exception(e)
    err(e.stack)
  }

  return state
}

const appReducer = combineReducers({
  app: infoReducer,
  appBar: appBarReducer,
  appBarQueries: appBarQueriesReducer,
  background: backgroundReducer,
  data: dataReducer,
  dataLoadedPages: dataLoadedPagesSlice,
  dialog: dialogReducer,
  dialogs: dialogsReducer,
  drawer: drawerReducer,
  errors: errorsReducer,
  forms: formsReducer,
  formsData: formsDataReducer,
  formsDataErrors: formsDataErrorsReducer,
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

// https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
const rootReducer = (state: any, action: any) => {

  if (action.type === NET_STATE_PATCH) {
    const newState = netPatchStateReducer(state, action.payload)
    set_configuration(newState)
    return appReducer(newState, action)
  }

  return appReducer(state, action)
}

// https://redux-toolkit.js.org/usage/usage-with-typescript
// https://redux-toolkit.js.org/api/configureStore
const store = configureStore({
  reducer: rootReducer,
  // preloadedState,
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

export const actions = {
  ...appActions,
  ...appBarActions,
  ...appBarQueriesActions,
  ...backgroundActions,
  ...dataActions,
  ...dialogActions,
  ...drawerActions,
  ...errorsActions,
  ...formsActions,
  ...formsDataActions,
  ...formsDataErrorsActions,
  ...metaActions,
  ...netActions,
  ...pagesActions,
  ...pagesDataActions,
  ...snackbarActions,
  ...themeActions,
  ...tmpActions,
  ...topLevelLinksActions,
  ...typographyActions,
}

export type TAllActions = typeof actions

/**
 * Ensures that callbacks for buttons, links (, and more) can access the redux
 * store and fire all available redux actions...
 * Even if the callback is implemented in a pure javascript file.
 */
export interface IRedux {
  store: typeof store
  actions: typeof actions

  /**
   * If you don't want to define a callback for your button or link,
   * you can use the href prop to set the target page. It's value should
   * then be passed to this route key.
   */
  route?: string
}

/** Callback parameter */
export const redux: IRedux = {
  store,
  actions,
  route: ''
}

/** Type for callback that needs to access the redux store and actions. */
export type TReduxCallback = (redux: IRedux) => TCallback

/**
 * If a callback is required for a link or button but is not defined, then this
 * method will provide a dummy one.
 */
export function dummy_callback (_redux: IRedux): TCallback {
  return (e: any) => {
    ler('dummy_callback: No callback was assigned.')
  }
}

/**
 * If a link was not provided a callback, this one should be called
 * automatically.
 *
 * The app page will be updated based on the URL change triggered by the link.
 */
export function default_callback ({store, actions, route}:IRedux): TCallback {
  return (e: any) => {
    if (route) {
      store.dispatch(actions.appUrlPageUpdate(route))
    }
  }
}

/** Register a callback to run when app is bootstrapped. */
export const on_bootstrap_run = (callback: (redux: IRedux) => void) => {
  BOOTSTRAP_CALLBACK_LIST.push(callback)
}

/** Run all callbacks that were registered with onBoostrapRun(). */
export const bootstrap = () => {
  BOOTSTRAP_CALLBACK_LIST.forEach(callback => callback(redux))
}

/** Schedule callback run */
export const schedule_callback_run = (
  time: number,
  callback: (redux: IRedux) => void
) => {
  setTimeout(() => {
    callback(redux)
  }, time)
}

export default store
