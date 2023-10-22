import fetch from 'cross-fetch'
import { Dispatch } from 'redux'
import { remember_exception } from './_errors.business.logic'
import { get_endpoint, schedule_spinner } from './_business.logic'
import net_default_200_driver from './net.default.200.driver.c'
import net_default_201_driver from './net.default.201.driver.c'
import net_default_400_driver from './net.default.400.driver.c'
import net_default_404_driver from './net.default.404.driver.c'
import net_default_409_driver from './net.default.409.driver.c'
import net_default_500_driver from './net.default.500.driver.c'
import {
  appHideSpinner, appRequestFailed, appRequestStart, appRequestSuccess
} from '../slices/app.slice'
import { get_query_starting_fixed, get_origin_ending_fixed } from '../controllers'
import { RootState } from '.'
import { IJsonapiAbstractResponse } from '../controllers/interfaces/IJsonapi'

const DEFAULT_HEADERS: RequestInit['headers'] = {
  'Content-Type': 'application/json',
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
 */
const DEFAULT_POST_PAYLOAD: RequestInit = {
  method: 'post',
  headers: DEFAULT_HEADERS,
  body: {} as RequestInit['body']
}

const DEFAULT_PUT_PAYLOAD: RequestInit = {
  method: 'put',
  headers: DEFAULT_HEADERS,
  body: {} as RequestInit['body']
}

const DEFAULT_GET_PAYLOAD: RequestInit = {
  method: 'get',
  headers: DEFAULT_HEADERS
}

const DEFAULT_DELETE_PAYLOAD: RequestInit = {
  method: 'delete',
  headers: DEFAULT_HEADERS
}

/**
 * Handles errors.
 *
 * This is the one stop for error generated here, client side, based on the 
 * browser's interpretation of the response.
 * __Note__: The errors handled here are different from those generated
 * server-side. These would typically be considered a valid response and would
 * be handled by another function (delegateDataHandling).
 */
const delegate_error_handling = (dispatch: Dispatch) => {
  dispatch(appRequestFailed())
  dispatch(appHideSpinner())
}

/** Handles successful responses. */
const delegate_data_handling = (
  dispatch: Dispatch,
  getState: () => RootState,
  endpoint: string,
  state: IJsonapiAbstractResponse
) => {
  dispatch(appHideSpinner())
  const status = state.status || 500

  const defaultDriver: { [key: number]: () => void } = {
    200: () => net_default_200_driver(dispatch, getState, endpoint, state),
    201: () => net_default_201_driver(dispatch, getState, endpoint, state),
    400: () => net_default_400_driver(dispatch, getState, endpoint, state),
    404: () => net_default_404_driver(dispatch, getState, endpoint, state),
    409: () => net_default_409_driver(dispatch, getState, endpoint, state),
    500: () => net_default_500_driver(dispatch, getState, endpoint, state),
  }

  // We need to apply the right drivers to the JSON response
  try {
    switch (state.driver) {
      default:
        defaultDriver[status]()
    }
  } catch (e) {
    remember_exception(e)
  }
}

/**
 *
 * @param endpoint 
 * @param body 
 * @param success 
 * @param failure 
 */
export const _post_request = (
  endpoint: string,
  body: RequestInit['body'],
  success?: (state: Promise<any>, dispatch?: Dispatch, store?: () => RootState) => void,
  failure?: (error: any, dispatch?: Dispatch, state?: () => RootState) => void
) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(appRequestStart())
    return fetch(
      getState().app.origin + endpoint,
      { ...DEFAULT_POST_PAYLOAD, ...{ body } }
    )
      .then(
        response => {
          dispatch(appRequestSuccess())
          success && success(response.json(), dispatch, getState)
        },
        error => {
          dispatch(appRequestFailed())
          failure && failure(error, dispatch, getState)
        }
      )
  }
}

/**
 * Get file content from the server.
 *
 * @param endpoint
 * @param args
 * @param success
 * @param failure
 *
 * @toto do a unit test for this. We need to make sure it works great.
 */
export const _get_request = (
  endpoint: string,
  args = '',
  success: (state: any) => void,
  failure?: (error: any) => void
) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(appRequestStart())
    return fetch(getState().app.origin + endpoint + args)
      .then(
        response => {
          dispatch(appRequestSuccess())
          return response.json()
        },
        error => {
          dispatch(appRequestFailed())
          failure && failure(error)
        }
      )
      .then(json => success(json))
  }
}

/**
 * Use this function make a POST request.
 *
 * [TODO] Implement the PUT request version of this function. Or just fully
 *        implement all HTTP verbs. PATCH, DELETE, OPTIONS, HEAD.
 *
 * @param endpoint usually an entity name. Otherwise, it's a valid URI endpoint.
 *                 e.g. `users`
 * @param args the data you want to send to the server. e.g. form data.
 */
export const post_req_state = (
  endpoint: string,
  body?: any,
  customHeaders?: RequestInit['headers']
) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(appRequestStart())
    schedule_spinner()
    try {
      const origin = get_origin_ending_fixed(getState().app.origin)
      const url = `${origin}${endpoint}`
      const headers = customHeaders || getState().net.headers || {}
      const response = await fetch(url, {
        ...DEFAULT_POST_PAYLOAD,
        ...headers,
        body: JSON.stringify(body)
      })
      const json = await response.json()
      json.status = response.status
      json.statusText = response.statusText
      json.ok = response.ok
      delegate_data_handling(dispatch, getState, endpoint, json)
    } catch (error: any) {
      remember_exception(error)
      delegate_error_handling(dispatch)
    }
  }
}

export const put_req_state = (
  endpoint: string,
  body?: any,
  customHeaders?: RequestInit['headers']
) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(appRequestStart())
    schedule_spinner()
    try {
      const origin = get_origin_ending_fixed(getState().app.origin)
      const url = `${origin}${endpoint}`
      const headers = customHeaders || getState().net.headers || {}
      const response = await fetch(url, {
        ...DEFAULT_PUT_PAYLOAD,
        ...headers,
        body: JSON.stringify(body)
      })
      const json = await response.json()
      json.status = response.status
      json.statusText = response.statusText
      json.ok = response.ok
      delegate_data_handling(dispatch, getState, endpoint, json)
    } catch (error: any) {
      remember_exception(error)
      delegate_error_handling(dispatch)
    }
  }
}

export const axios_post_req_state = (
  _endpoint: string,
  _body?: any,
  _headers?: RequestInit['headers']
) => {
  // [TODO] Implement this function using axios.
  //        Install axios first: `yarn add axios`
  //        Then, import it: `import axios from 'axios'`
  //        Then, use it: `axios.post(url, body, headers)`
}

/**
 * Makes a `GET` request to an endpoint to retrieve a collection
 *
 * @param endpoint usually an entity name. Otherwise, it's a valid URI endpoint.
 *                 e.g. `users`
 * @param args URL query strings e.g. '?id=123'
 *             It must be a valid query string therefore, the interrogation
 *             point is required.
 */
export const get_req_state = (
  endpoint: string,
  args = '',
  customHeaders?: RequestInit['headers']
) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(appRequestStart())
    schedule_spinner()
    try {
      const origin = get_origin_ending_fixed(getState().app.origin)
      const query  = get_query_starting_fixed(args)
      const uri = `${origin}${endpoint}${query}`
      const headers = customHeaders || getState().net.headers || {}
      const response = await fetch(uri, { ...DEFAULT_GET_PAYLOAD, ...headers})
      const json = await response.json()
      json.status = response.status
      json.statusText = response.statusText
      json.ok = response.ok
      delegate_data_handling(dispatch, getState, endpoint, json)
    } catch (error) {
      remember_exception(error)
      delegate_error_handling(dispatch)
    }
  }
}

export const delete_req_state = (
  endpoint: string,
  args = '',
  customHeaders?: RequestInit['headers']
) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(appRequestStart())
    schedule_spinner()
    try {
      const origin = get_origin_ending_fixed(getState().app.origin)
      const query  = get_query_starting_fixed(args)
      const uri = `${origin}${endpoint}${query}`
      const headers = customHeaders || getState().net.headers || {}
      const response = await fetch(uri, { ...DEFAULT_DELETE_PAYLOAD, ...headers})
      const json = await response.json()
      json.status = response.status
      json.statusText = response.statusText
      json.ok = response.ok
      delegate_data_handling(dispatch, getState, endpoint, json)
    } catch (error) {
      remember_exception(error)
      delegate_error_handling(dispatch)
    }
  }
}

/**
 * Makes a `POST` request to server by providing your own callback to handle
 * the response.
 *
 * @param route Slash-separated URL params only e.g. `param1/param2/`
 * @param payload Data (an object) to be sent to server
 * @param success callback to receive a legitimate server response if there is
 *                one.
 * @param failure callback for a failed request with no proper server response.
 */
export const _origin_post = (
  route: string,
  payload: RequestInit['body'],
  success?: (state: any, endpoint: string) => void,
  failure?: (error: any) => void
) => {
  const endpoint = get_endpoint(route)
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(appRequestStart())
    schedule_spinner()
    const body = JSON.stringify(payload)
    return fetch(
      getState().app.origin + route,
      { ...DEFAULT_POST_PAYLOAD, ...{ body } } as RequestInit
    )
      .then(
        response => response.json(),
        error => failure
          ? failure(error)
          : delegate_error_handling(dispatch)
      )
      .then(
        json => success
          ? success(json, endpoint)
          : delegate_data_handling(dispatch, getState, endpoint, json)
      )
  }
}

/**
 * Makes a `GET` request to server by providing your own callbacks to handle
 * the response.
 *
 * @param route   Slash-separated URL params only e.g. `param1/param2/`
 * @param success callback to receive a legitimate server response if there is
 *                one.
 * @param failure callback for a failed request with no proper server response.
 */
export const _origin_get = (
  route: string,
  success?: (endpoint: string, state: any) => void,
  failure?: (error: any) => void
) => {
  const endpoint = get_endpoint(route)
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(appRequestStart())
    schedule_spinner()
    return fetch(getState().app.origin + route)
      .then(
        response => response.json(),
        error => failure
          ? failure(error)
          : delegate_error_handling(dispatch)
      )
      .then(
        json => success
          ? success(endpoint, json)
          : delegate_data_handling(dispatch, getState, endpoint, json)
      )
  }
}
