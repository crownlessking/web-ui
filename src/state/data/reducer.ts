import { IReduxAction, IStateCollection } from '../../interfaces'
import initialState from '../../state/initial.state'
import {
  DATA_CREATE_NEW_COLLECTION, DATA_INSERT_MANY, DATA_SET_COLLECTION,
  DATA_INSERT_ONE
} from './actions'
import { listMergeNew } from './controller'

const INIT = initialState.data

export default function stateDataReducer (
  state = INIT,
  {payload, type}: IReduxAction
) {
  const collection: IStateCollection = payload
  const p = payload

  switch (type) {

  // Note: if the specified endpoint already exist as a key, then whatever
  //       data was contained at that key will be overwritten,
  case DATA_CREATE_NEW_COLLECTION:
  case DATA_SET_COLLECTION:
    return { ...state, [collection._endpoint]: collection.list }

  case DATA_INSERT_MANY:
    const endpoint = collection._endpoint
    const mergedData = listMergeNew(state[endpoint], collection.list)
    return { ...state, [endpoint]: mergedData }

  case DATA_INSERT_ONE:
    state[p.endpoint] = state[p.endpoint] || []
    state[p.endpoint].push(p.doc)
    return { ...state, [p.endpoint]: state[p.endpoint] }

  default:
    return state
  }

}
