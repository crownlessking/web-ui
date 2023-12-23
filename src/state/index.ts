import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
// import logger from 'redux-logger'// TODO Uncomment when debugging Redux
import infoReducer, { appActions } from '../slices/app.slice'
import appbarReducer, { appbarActions } from '../slices/appbar.slice'
import metaReducer, { metaActions } from '../slices/meta.slice'
import appbarQueriesReducer, { appbarQueriesActions } from '../slices/appbarQueries.slice'
import backgroundReducer, { backgroundActions } from '../slices/background.slice'
import typographyReducer, { typographyActions } from '../slices/typography.slice'
import dialogReducer, { dialogActions } from '../slices/dialog.slice'
import dialogsReducer, { dialogsAction } from '../slices/dialogs.slice'
import drawerReducer, { drawerActions } from '../slices/drawer.slice'
import formsReducer, { formsActions } from '../slices/forms.slice'
import pagesReducer, { pagesActions } from '../slices/pages.slice'
import dataReducer, { dataActions } from '../slices/data.slice'
import dataLoadedPagesSlice from '../slices/dataLoadedPages.slice'
import errorsReducer, { errorsActions } from '../slices/errors.slice'
import pagesDataReducer, { pagesDataActions } from '../slices/pagesData.slice'
import formsDataReducer, { formsDataActions } from '../slices/formsData.slice'
import formsDataErrorsReducer, { formsDataErrorsActions } from '../slices/formsDataErrors.slice'
import snackbarReducer, { snackbarActions } from '../slices/snackbar.slice'
import tmpReducer, { tmpActions } from '../slices/tmp.slice'
import topLevelLinksReducer, { topLevelLinksActions } from '../slices/topLevelLinks.slice'
import themeReducer, { themeActions } from '../slices/theme.slice'
import netReducer, { netActions } from '../slices/net.slice'
import pathnamesReducer, { pathnamesActions } from '../slices/pathnames.slice'
import stateRegistryReducer from '../slices/stateRegistry.slice'
import dialogsLightReducer, { dialogsLightActions } from '../slices/dialogsLight.slice'
import dialogsDarkReducer, { dialogsDarkActions } from '../slices/dialogsDark.slice'
import formsLightReducer, { formsLightActions } from '../slices/formsLight.slice'
import formsDarkReducer, { formsDarkActions } from '../slices/formsDark.slice'
import pagesLightReducer, { pagesLightActions } from '../slices/pagesLight.slice'
import pagesDarkReducer, { pagesDarkActions } from '../slices/pagesDark.slice'
import themeLightReducer, { themeLightActions } from '../slices/themeLight.slice'
import themeDarkReducer, { themeDarkActions } from '../slices/themeDark.slice'
import sessionReducer, { sessionActions } from '../slices/session.slice'
import chipReducer, { chipActions } from '../slices/chip.slice'
import { NET_STATE_PATCH_DELETE, TCallback } from '../constants'
import Config from '../config'
import { remember_exception } from '../business.logic/errors'
import initialState from './initial.state'
import { clear_last_content_jsx } from '../business.logic'

export const NET_STATE_PATCH = 'NET_STATE_PATCH'
export const net_patch_state = (stateFragment: any) => ({
  type: NET_STATE_PATCH,
  payload: stateFragment
})

export const STATE_RESET = 'STATE_RESET'
export const state_reset = () => ({
  type: STATE_RESET
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
const net_patch_state_reducer = (oldState: any, fragment: any) => {
  const state = { ...oldState }
  try {
    for (const prop in fragment) {
      const newStateVal = fragment[prop]
      switch (typeof newStateVal) {
      case 'undefined':
        state[prop] = undefined
        break
      case 'object':
        if (newStateVal === null) continue
        if (!Array.isArray(newStateVal)) {
          state[prop] = net_patch_state_reducer(state[prop], newStateVal)
        } else {
          state[prop] = [ ...newStateVal ] // arrays are never copied deeply
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
        if (newStateVal === NET_STATE_PATCH_DELETE) { // delete state
          state[prop] = undefined
          clear_last_content_jsx()
        } else {
          state[prop] = newStateVal
        }
        break
      } // END switch

      // Runs a list of callbacks when a state with a certain id is loaded.
      if (newStateVal._id) {
        ON_NET_LOAD_CALLBACK_LIST[newStateVal._id]
          ?.forEach(callback => callback(redux))
        // Delete the list of callbacks after they have been run.
        delete ON_NET_LOAD_CALLBACK_LIST[newStateVal._id]
      }
    }
  } catch (e: any) {
    remember_exception(e)
    err(e.stack)
  }
  return state
}

const appReducer = combineReducers({
  app: infoReducer,
  appbar: appbarReducer,
  appbarQueries: appbarQueriesReducer,
  background: backgroundReducer,
  data: dataReducer,
  dataPagesRange: dataLoadedPagesSlice,
  dialog: dialogReducer,
  dialogs: dialogsReducer,
  dialogsLight: dialogsLightReducer,
  dialogsDark: dialogsDarkReducer,
  drawer: drawerReducer,
  errors: errorsReducer,
  forms: formsReducer,
  formsLight: formsLightReducer,
  formsDark: formsDarkReducer,
  formsData: formsDataReducer,
  formsDataErrors: formsDataErrorsReducer,
  meta: metaReducer,
  net: netReducer,
  pages: pagesReducer,
  pagesLight: pagesLightReducer,
  pagesDark: pagesDarkReducer,
  pagesData: pagesDataReducer,
  chip: chipReducer,
  snackbar: snackbarReducer,
  theme: themeReducer,
  themeLight: themeLightReducer,
  themeDark: themeDarkReducer,
  tmp: tmpReducer,
  topLevelLinks: topLevelLinksReducer,
  typography: typographyReducer,
  pathnames: pathnamesReducer,
  stateRegistry: stateRegistryReducer,
  session: sessionReducer
})

// https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
const rootReducer = (state: any, action: any) => {

  if (action.type === NET_STATE_PATCH) {
    const newState = net_patch_state_reducer(state, action.payload)
    if (!state.app.isBootstrapped) {
      Config.set('DEBUG', action.payload.app.inDebugMode ?? false)
      Config.set('DEV', action.payload.app.inDevelMode ?? false)
    }

    // TODO Set more configuration here.

    return appReducer(newState, action)
  }

  // Reset of the state
  if (action.type === STATE_RESET) {
    return appReducer(initialState, action)
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
  //     // TODO add more middlewares here
  //   )
  //   .concat(logger) // TODO Uncomment when debugging Redux
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const actions = {
  ...appActions,
  ...appbarActions,
  ...appbarQueriesActions,
  ...backgroundActions,
  ...dataActions,
  ...dialogActions,
  ...dialogsAction,
  ...drawerActions,
  ...errorsActions,
  ...formsActions,
  ...formsDataActions,
  ...formsDataErrorsActions,
  ...metaActions,
  ...netActions,
  ...pagesActions,
  ...pagesDataActions,
  ...chipActions,
  ...snackbarActions,
  ...themeActions,
  ...themeLightActions,
  ...themeDarkActions,
  ...tmpActions,
  ...topLevelLinksActions,
  ...typographyActions,
  ...pathnamesActions,
  ...dialogsLightActions,
  ...dialogsDarkActions,
  ...formsLightActions,
  ...formsDarkActions,
  ...pagesLightActions,
  ...pagesDarkActions,
  ...sessionActions
}

export type TAllActions = typeof actions

/**
 * Ensures that callbacks for buttons, links (, and more) can access the redux
 * store and fire all available redux actions...
 * Even if the callback is implemented in pure javascript.
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

/** Helps to shorten error message */
let _msgPrefix = ''

/**
 * Set message prefix.
 *
 * Helps keep error message short. Works with `msg()`, `log()`, `warn()`,
 * and `ler()`.
 */
export function pre(prefix?: string): void {
  _msgPrefix = prefix ?? ''
}

/** Prepends message prefix. */
export function msg(msg: string): string {
  return _msgPrefix + msg
}

/** Logs to console if app is in debug mode. */
export function log (...args: any[]): void {
  if (redux.store.getState().app.inDebugMode) {
    console.log(...args)
  }
}

/** Logs to console if app is in debug mode. */
export function ler (...args: any[]): void {
  if (redux.store.getState().app.inDebugMode) {
    console.error(...args)
  }
}

/** Logs to console if app is in debug mode. */
export function warn (...args: any[]): void {
  if (redux.store.getState().app.inDebugMode) {
    console.warn(...args)
  }
}

/** Throws exception if app is in debug mode. */
export function err (...args: any[]): void {
  if (redux.store.getState().app.inDebugMode) {
    throw new Error(...args)
  }
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
 * If a callback is required for a link or button but is not defined, then this
 * method will provide a dummy one.
 */
export function dummy_callback (_redux: IRedux): TCallback {
  return () => {
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
  return () => {
    if (route) {
      store.dispatch(actions.appBrowserSwitchPage(route))
    }
  }
}

const BOOTSTRAP_CALLBACK_LIST: ((redux: IRedux) => void)[] = []

/** Register a callback to run when app is bootstrapped. */
export const on_bootstrap_run = (callback: (redux: IRedux) => void) => {
  BOOTSTRAP_CALLBACK_LIST.push(callback)
}

/** Run all callbacks that were registered with onBoostrapRun(). */
export const bootstrap = () => {
  BOOTSTRAP_CALLBACK_LIST.forEach(callback => callback(redux))
  for (let i = 0; BOOTSTRAP_CALLBACK_LIST.length > i; i++) {
    BOOTSTRAP_CALLBACK_LIST.pop()
  }
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

interface IOnNetLoadCallbackList {
  [_id: string]: ((redux: IRedux) => void)[]
}

/** Map list of function */
const ON_NET_LOAD_CALLBACK_LIST: IOnNetLoadCallbackList = {}

/** Run a list of function when a state with a certain id is loaded. */
export function on_net_load_run(
  _id: string,
  callback: (redux: IRedux) => void
) {
  ON_NET_LOAD_CALLBACK_LIST[_id] = ON_NET_LOAD_CALLBACK_LIST[_id] ?? []
  ON_NET_LOAD_CALLBACK_LIST[_id].push(callback)
}

export default store
