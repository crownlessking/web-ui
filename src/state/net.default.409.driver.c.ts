import { Dispatch } from 'redux'
import { IJsonapiAbstractResponse, IJsonapiErrorResponse } from 'src/controllers/interfaces/IJsonapi'
import { appRequestFailed } from 'src/slices/app.slice'
import { netPatchState, RootState } from '.'
import { is_object, ler } from '../controllers'
import {
  mongo_object_id,
  remember_error,
  remember_jsonapi_errors
} from './_errors.business.logic'

export default function net_default_409_driver (
  dispatch: Dispatch,
  _getState: () => RootState,
  endpoint: string,
  response: IJsonapiAbstractResponse
): void {
  const doc = response as IJsonapiErrorResponse
  if (is_object(doc.state)) {
    dispatch(netPatchState(response.state))
  }

  if (!doc.errors) {
    const title = 'net_default_409_driver: No errors were received.'
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

  remember_jsonapi_errors(doc.errors)
  ler(`net_default_409_driver: endpoint: ${endpoint}`)
  ler('net_default_409_driver: response:', response)
  dispatch(appRequestFailed())
}