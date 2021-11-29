import { Dispatch } from 'redux'
import { setCollection } from '../data/actions'
import { setMeta } from '../meta/actions'
import { setTopLevelLinks } from '../links.toplevel/actions'
import { requestSuccess, requestFailed } from './actions.net'
import { addError } from '../errors/actions'
import { _cancelSpinner } from '../app/controller'
import { IAbstractResponse, IJsonapiResponse, IState } from '../../interfaces'
import { netPatchState } from '../actions'

/**
 * Once the server response is received, this function can be used to process it.
 */
export default function runDefaultDriver (
  dispatch: Dispatch,
  getState: ()=>IState,
  endpoint: string,
  json: IAbstractResponse
) {
  _cancelSpinner()
  const doc = json as IJsonapiResponse

  if (doc.meta) {
    dispatch(setMeta(endpoint, doc.meta))
  }

  if (doc.links) {
    dispatch(setTopLevelLinks(endpoint, doc.links))
  }

  if (doc.data) {

    // [TODO] The json contains, `data`, `meta`, and `included` keys. And they
    //        all need to be stored.
    //        - the json.meta will be stored in the `meta` state.
    //        - the json.data will be stored in the `data` state.
    //        - the json.included will be stored in the `included` state.
    //        The `included` state does not exist yet and needs to be created
    //        before moving forward. Make sure you do that first.
    //        I currently recommend to myself to buffer the data that arrives.
    //        As in, the app will have a config that dictates how many data it can
    //        hold at once. Let's say, the config says it can hold 100 documents.
    //        And on
    //        each request, it receives 25 documents. This means, based on the
    //        timestamp
    //        of each documents, the oldest 25 documents should be removed to make
    //        room for the newest 25.

    const data = { _endpoint: endpoint, list: doc.data }
    dispatch(setCollection(data))

    // [TODO] convert the array from the `json` parameter to an object where the
    //      entity ID is the key. You can put the logic in a controller called,
    //      `data.controller.ts` then import the function that makes the
    //      conversion.
    //      insertIndexes(endpoint, json)

  } else if (doc.errors) {
    dispatch(addError({
      title: 'No JSON',
      code: Date.now().toString(),
      meta: { endpoint }
    }))
  }

  // This if-condition handles redux state loaded from the server (remote).
  if (doc.state) {
    dispatch(netPatchState(doc.state))
  }

  if (!!(doc.meta || doc.data || doc.links || doc.state)) {
    dispatch(requestSuccess())
  } else {
    dispatch(requestFailed())
  }

}
