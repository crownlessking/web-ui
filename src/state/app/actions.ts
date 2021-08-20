
import { IReduxAction } from '../../interfaces'

export const APP_IS_FETCHING = 'APP_IS_FETCHING'
export const APP_IS_BOOTSTRAPPED = 'APP_IS_BOOTSTRAPPED'
export const APP_IS_READY = 'APP_IS_READY'
export const APP_SWITCHED_PAGE = 'APP_SWITCHED_PAGE'
export const BROWSER_SWITCHED_PAGE = 'BROWSER_SWITCHED_PAGE'

export const APP_UPDATE_TITLE = 'APP_UPDATE_TITLE'
export const updateAppTitle = (title: string) => ({
  payload: title,
  type: APP_UPDATE_TITLE
})

export const APP_UPDATE_ORIGIN = 'APP_UPDATE_ORIGIN'
export const updateOrigin = (origin: string): IReduxAction => ({
  payload: origin,
  type: APP_UPDATE_ORIGIN,
})

export const UI_UPDATE_LAYOUT = 'UI_UPDATE_LAYOUT'
export const updateLayout = (layout: any): IReduxAction => ({
  payload: layout,
  type: UI_UPDATE_LAYOUT
})

export const UI_SHOW_SPINNER = 'UI_SHOW_SPINNER'
export const showSpinner = (): IReduxAction => ({
  type: UI_SHOW_SPINNER
})

export const UI_HIDE_SPINNER = 'UI_HIDE_SPINNER'
export const hideSpinner = (): IReduxAction => ({
  type: UI_HIDE_SPINNER
})

export const APP_UPDATE_PAGE = 'APP_UPDATE_PAGE'
export const updatePage = (page: string): IReduxAction => ({
  payload: page,
  type: APP_UPDATE_PAGE
})

export const APP_URL_UPDATE_PAGE = 'APP_URL_UPDATE_PAGE'
export const urlUpdatePage = (url: string): IReduxAction => ({
  payload: url,
  type: APP_URL_UPDATE_PAGE
})

export const APP_UPDATE_STATUS = 'APP_UPDATE_STATUS'
export const updateAppStatus = (status: string): IReduxAction => ({
  payload: status,
  type: APP_UPDATE_STATUS
})

/**
 * I have decided to create this action because I needed a way to differentiate
 * between a page update from Redux and one from a browser's URL change.
 * These typically occur when clicking the the browser's back and forward
 * buttons.
 */
export const APP_TASK_COMPLETED = 'APP_TASK_COMPLETED'
export const resetStatus = (): IReduxAction => ({
  type: APP_TASK_COMPLETED,
})
