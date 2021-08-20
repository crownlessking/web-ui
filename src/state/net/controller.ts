import { IReduxAction } from '../../interfaces'

export const START_REQUEST = 'START_REQUEST'
export const startRequest = (): IReduxAction => ({
  type: START_REQUEST
})

export const REQUEST_FAILED = 'REQUEST_FAILED'
export const requestFailed = () => ({
  type: REQUEST_FAILED,
})

export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const requestSuccess = () => ({
  type: REQUEST_SUCCESS
})

export const REQUEST_PROCESS_END = 'REQUEST_PROCESS_END'
export const endRequestProcess = () => ({
  type: REQUEST_PROCESS_END
})
