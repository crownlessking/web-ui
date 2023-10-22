import { createSlice } from '@reduxjs/toolkit'
import { cancel_spinner } from '../state/_business.logic'
import initialState from '../state/initial.state'

export const APP_IS_BOOTSTRAPPED   = 'APP_IS_BOOTSTRAPPED'
export const APP_IS_FETCHING       = 'APP_IS_FETCHING'
export const APP_IS_READY          = 'APP_IS_READY'
export const APP_SWITCHED_PAGE     = 'APP_SWITCHED_PAGE'
export const BROWSER_SWITCHED_PAGE = 'BROWSER_SWITCHED_PAGE'
export const APP_REQUEST_FAILED    = 'APP_REQUEST_FAILED'
export const APP_REQUEST_SUCCESS   = 'APP_REQUEST_SUCCESS'

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState.app,
  reducers: {
    appPageUpdate: (state, action) => {
      state.lastRoute = state.route
      state.route = action.payload
      state.status = APP_SWITCHED_PAGE
    },
    appUrlPageUpdate: (state, action) => {
      state.lastRoute = state.route
      state.route = action.payload
      state.status = BROWSER_SWITCHED_PAGE
    },
    appTitleUpdate: (state, action) => {
      state.title = action.payload
    },
    appOriginUpdate: (state, action) => {
      state.origin = action.payload
    },
    appStatusUpdate: (state, action) => {
      state.status = action.payload
    },
    appTaskCompleted: (state) => {
      state.status = APP_IS_READY
    },
    appShowSpinner: (state) => {
      state.showSpinner = true
    },
    appHideSpinner: (state) => {
      cancel_spinner()
      state.showSpinner = false
    },
    appDisableSpinner: (state) => {
      state.spinnerDisabled = true
    },
    appEnableSpinner: (state) => {
      state.spinnerDisabled = false
    },
    appRequestStart: (state) => {
      state.status = APP_IS_FETCHING
    },
    appRequestSuccess: (state) => {
      state.status = APP_REQUEST_SUCCESS
    },
    appRequestFailed: (state) => {
      state.status = APP_REQUEST_FAILED
    },
    appRequestEnd: (state) => {
      state.status = APP_IS_BOOTSTRAPPED
    },
    appStartRequest: (state) => {
      state.status = APP_IS_FETCHING
    },
    appRequestProcessEnd: (state) => {
      state.status = APP_IS_BOOTSTRAPPED
    },
  },
})

export const appActions = appSlice.actions
export const {
  appHideSpinner,
  appOriginUpdate,
  appRequestEnd,
  appRequestFailed,
  appRequestProcessEnd,
  appRequestStart,
  appRequestSuccess,
  appShowSpinner,
  appDisableSpinner,
  appEnableSpinner,
  appStartRequest,
  appTaskCompleted,
  appTitleUpdate,
  appPageUpdate,
  appStatusUpdate,
  appUrlPageUpdate
} = appSlice.actions

export default appSlice.reducer
