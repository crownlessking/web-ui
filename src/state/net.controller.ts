import fetch from 'cross-fetch'
import { Dispatch } from 'redux'
import { errorsAdd } from '../slices/errors.slice'
import { toJsonapiError } from './errors.controller'
import { _cancelSpinner, _scheduleSpinner } from './app.controller'
import runDefaultDriver from './default.driver.net.c'
import {
  appHideSpinner, appRequestFailed, appRequestStart, appRequestSuccess
} from '../slices/app.slice'
import { getEndpoint, getOriginEndingFixed } from '../controllers'
import _ from 'lodash'
import { RootState } from '.'
import { IAbstractResponse } from '../controllers/interfaces/IStateNet'

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
 */
const DEFAULT_POST_PAYLOAD: RequestInit = {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: {} as RequestInit['body']
}

/**
 * Handles errors.
 *
 * This is the one stop for error generated here, client side, based on the 
 * browser's interpretation of the response.
 * __Note__: The errors handled here are different from those generated
 * server-side. These would typically be considered a valid response and would
 * be handled by another function (delegateDataHandling).
 *
 * @param dispatch 
 * @param error 
 */
const delegateErrorHandling = (dispatch: Dispatch, error: any) => {
  dispatch(appRequestFailed())

  if (error) {
    dispatch(errorsAdd(toJsonapiError(error)))
  }

  dispatch(appHideSpinner())
}

/**
 * Handles successful responses.
 *
 * @param dispatch 
 * @param endpoint 
 * @param json 
 */
const delegateDataHandling = (
  dispatch: Dispatch,
  getState: () => RootState,
  endpoint: string,
  json: IAbstractResponse
) => {
  _cancelSpinner()

  // We need to apply the right drivers to the JSON response
  try {
    switch (json.driver) {
      default:
        runDefaultDriver(dispatch, getState, endpoint, json)
    }
  } catch (e) {
    dispatch(errorsAdd(toJsonapiError(e)))
  }
}

/**
 *
 * @param endpoint 
 * @param body 
 * @param success 
 * @param failure 
 */
export const postRequest = (
  endpoint: string,
  body: RequestInit['body'],
  success?: (json: Promise<any>, dispatch?: Dispatch, state?: () => RootState) => void,
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
export const getRequest = (
  endpoint: string,
  args = '',
  success: (json: any) => void,
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
export const postReqState = (
  endpoint: string,
  body?: any,
  headers?: RequestInit['headers']
) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(appRequestStart())
    _scheduleSpinner()
    try {
      const origin = getOriginEndingFixed(getState().app.origin)
      const url = `${origin}${endpoint}`
      const mergedHeaders = headers || getState().net.headers || {}
      DEFAULT_POST_PAYLOAD.headers = _.extend(
        DEFAULT_POST_PAYLOAD.headers,
        mergedHeaders
      )
      const response = await fetch(
        url,
        { ...DEFAULT_POST_PAYLOAD, body: JSON.stringify(body) }
      )
      const json = await response.json()
      delegateDataHandling(dispatch, getState, endpoint, json)
    } catch (error: any) {
      delegateErrorHandling(dispatch, error)
    }
  }
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
export const _getReqState = (endpoint: string, args = '') => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(appRequestStart())
    _scheduleSpinner()
    const uri = getState().app.origin + endpoint + args
    return fetch(uri)
      .then(
        response => response.json(),
        error => delegateErrorHandling(dispatch, error)
      )
      .then(json => delegateDataHandling(dispatch, getState, endpoint, json))
  }
}

export const getReqState = (
  origin: string,
  endpoint: string,
  args = ''
) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(appRequestStart())
    _scheduleSpinner()
    const uri = `${origin}${endpoint}`
    try {
      const response = await fetch(uri)
      const json = await response.json()
      delegateDataHandling(dispatch, getState, endpoint, json)
    } catch (error) {
      delegateErrorHandling(dispatch, error)
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
export const originPost = (
  route: string,
  payload: RequestInit['body'],
  success?: (json: any, endpoint: string) => void,
  failure?: (error: any) => void
) => {
  const endpoint = getEndpoint(route)
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(appRequestStart())
    _scheduleSpinner()
    const body = JSON.stringify(payload)
    return fetch(
      getState().app.origin + route,
      { ...DEFAULT_POST_PAYLOAD, ...{ body } } as RequestInit
    )
      .then(
        response => response.json(),
        error => failure
          ? failure(error)
          : delegateErrorHandling(dispatch, error)
      )
      .then(
        json => success
          ? success(json, endpoint)
          : delegateDataHandling(dispatch, getState, endpoint, json)
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
export const originGet = (
  route: string,
  success?: (endpoint: string, json: any) => void,
  failure?: (error: any) => void
) => {
  const endpoint = getEndpoint(route)
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(appRequestStart())
    _scheduleSpinner()
    return fetch(getState().app.origin + route)
      .then(
        response => response.json(),
        error => failure
          ? failure(error)
          : delegateErrorHandling(dispatch, error)
      )
      .then(
        json => success
          ? success(endpoint, json)
          : delegateDataHandling(dispatch, getState, endpoint, json)
      )
  }
}
