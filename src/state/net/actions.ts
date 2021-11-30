import { IReduxAction } from '../../interfaces'

export const APP_START_REQUEST = 'APP_START_REQUEST'
export const startRequest = (): IReduxAction => ({
  type: APP_START_REQUEST
})

export const APP_REQUEST_FAILED = 'APP_REQUEST_FAILED'
export const requestFailed = () => ({
  type: APP_REQUEST_FAILED,
})

export const APP_REQUEST_SUCCESS = 'APP_REQUEST_SUCCESS'
export const requestSuccess = () => ({
  type: APP_REQUEST_SUCCESS
})

export const REQUEST_PROCESS_END = 'REQUEST_PROCESS_END'
export const endRequestProcess = () => ({
  type: REQUEST_PROCESS_END
})
