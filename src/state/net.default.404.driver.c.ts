import { Dispatch } from 'redux'
import { IJsonapiResponse } from 'src/controllers/interfaces/IJsonapi'
import { appRequestFailed } from 'src/slices/app.slice'
import { RootState } from '.'
import { ler } from '../controllers'
import {
  mongo_object_id,
  remember_error,
  remember_jsonapi_errors
} from './_errors.business.logic'

export default function net_default_404_driver (
  dispatch: Dispatch,
  _getState: () => RootState,
  endpoint: string,
  response: IJsonapiResponse
): void {
  if (!response.errors) {
    const title = 'net_default_404_driver: No errors were received.'
    ler(title)
    remember_error({
      id: mongo_object_id(),
      code: 'no_errors',
      title,
      detail: JSON.stringify(response, null, 4),
      source: { 'pointer': endpoint },
    })
    return
  }

  remember_jsonapi_errors(response.errors)
  ler(`net_default_404_driver: endpoint: ${endpoint}`)
  ler('net_default_404_driver: response:', response)
  dispatch(appRequestFailed())
}