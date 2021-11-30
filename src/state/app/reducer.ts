
import {
  UI_SHOW_SPINNER,
  APP_IS_READY,
  APP_IS_FETCHING,
  APP_IS_BOOTSTRAPPED,
  APP_SWITCHED_PAGE,
  APP_UPDATE_APP_TITLE,
  UI_HIDE_SPINNER,
  APP_UPDATE_STATUS,
  APP_UPDATE_PAGE,
  APP_UPDATE_APP_ORIGIN,
  APP_TASK_COMPLETED,
  APP_URL_UPDATE_PAGE,
  BROWSER_SWITCHED_PAGE,
  APP_UPDATE_APP_ROUTE,
  APP_UPDATE_APP_LOGO
} from './actions'

import { 
  APP_START_REQUEST,
  APP_REQUEST_FAILED,
  APP_REQUEST_SUCCESS,
  REQUEST_PROCESS_END
} from '../net/actions.net'

import {
  IReduxAction,
  IStateApp,
} from '../../interfaces'

import state from '../initial.state'
import { _cancelSpinner } from '.'

const INIT: IStateApp = state.app

export default function stateAppReducer (
  app = INIT,
  {payload, type}: IReduxAction
): IStateApp {

  switch (type) {

  case APP_UPDATE_PAGE:
    return { ...app, status: APP_SWITCHED_PAGE, route: payload }

  case APP_URL_UPDATE_PAGE:
    return { ...app, status: BROWSER_SWITCHED_PAGE, route: payload }

  case APP_UPDATE_APP_TITLE:
    return { ...app, title: payload }

  case APP_UPDATE_APP_ORIGIN:
    return { ...app, origin: payload }

  case APP_UPDATE_APP_ROUTE:
    return { ...app, route: payload }

  case APP_UPDATE_APP_LOGO:
    return { ...app, logo: payload }

  case APP_UPDATE_STATUS:
    return { ...app, status: payload }

  case APP_TASK_COMPLETED:
    return { ...app, status: APP_IS_READY }

  case UI_SHOW_SPINNER:
    return { ...app, showSpinner: true }

  case UI_HIDE_SPINNER:
    // Prevents a scheduled spinner from appearing after the fact.
    _cancelSpinner()

    return { ...app, showSpinner: false }

  case APP_START_REQUEST:
    return { ...app, status: APP_IS_FETCHING }

  case APP_REQUEST_SUCCESS:
    return { ...app, showSpinner: false, status: APP_REQUEST_SUCCESS }

  case APP_REQUEST_FAILED:
    return { ...app, showSpinner: false, status: APP_REQUEST_FAILED }

  case REQUEST_PROCESS_END:
    return { ...app, status: APP_IS_BOOTSTRAPPED }

  default:
    return app

  }

}
