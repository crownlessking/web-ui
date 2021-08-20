import {
  IReduxAction, IJsonapiError
} from '../../interfaces'

export const ADD_ERROR = 'ADD_ERROR'
export const addError = (error: IJsonapiError): IReduxAction => ({
  type: ADD_ERROR,
  payload: error
})
