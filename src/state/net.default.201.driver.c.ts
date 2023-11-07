import { Dispatch } from 'redux'
import { is_object, ler } from 'src/controllers'
import {
  IJsonapiAbstractResponse,
  IJsonapiResponse
} from 'src/controllers/interfaces/IJsonapi'
import {
  appRequestFailed,
  appRequestSuccess
} from 'src/slices/app.slice'
import { net_patch_state, RootState } from '.'

export default function net_default_201_driver (
  dispatch: Dispatch,
  getState: ()=> RootState,
  endpoint: string,
  response: IJsonapiAbstractResponse
): void {
  const doc = response as IJsonapiResponse

  if (doc.data) {
    if (Array.isArray(doc.data) && doc.data.length === 1) {
      dispatch({
        type: 'data/collectionStack',
        payload: {
          endpoint,
          data: doc.data
        }
      })
    } else if (Array.isArray(doc.data) && doc.data.length > 1) {
      ler('net_default_201_driver: more than one data received on a 201 response.')
    } else if (is_object(doc.data)) {
      dispatch({
        type: 'data/dataStack',
        payload: {
          endpoint,
          data: doc.data
        }
      })
    }
  }

  if (is_object(doc.meta)) {
    const { meta } = doc
    dispatch({
      type: 'meta/metaAdd',
      payload: { endpoint, meta }
    })
  }

  if (is_object(doc.state)) {
    dispatch(net_patch_state(doc.state))
  }

  if (!!(doc.meta || doc.data || doc.links || doc.state)) {
    dispatch(appRequestSuccess())
  } else {
    dispatch(appRequestFailed())
  }
}
