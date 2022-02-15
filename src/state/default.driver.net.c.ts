import { Dispatch } from 'redux'
import { dataAdd } from '../slices/data.slice'
import { metaAdd } from '../slices/meta.slice'
import { topLevelLinksAdd } from '../slices/topLevelLinks.slice'
import { appRequestSuccess, appRequestFailed } from '../slices/app.slice'
import { errorsAdd } from '../slices/errors.slice'
import { netPatchState, RootState } from '.'
import {
  IAbstractResponse, IJsonapiResponse
} from '../controllers/interfaces/IStateNet'

/**
 * Once the server response is received, this function can be used to process it.
 */
export default function runDefaultDriver (
  dispatch: Dispatch,
  getState: ()=> RootState,
  endpoint: string,
  json: IAbstractResponse
): void {
  const doc = json as IJsonapiResponse

  if (doc.meta) {
    dispatch(metaAdd({ endpoint, meta: doc.meta }))
  }

  if (doc.links) {
    dispatch(topLevelLinksAdd({ endpoint, links: doc.links }))
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
    dispatch(dataAdd({ endpoint, data: doc.data }))

    // [TODO] convert the array from the `json` parameter to an object where the
    //      entity ID is the key. You can put the logic in a controller called,
    //      `data.controller.ts` then import the function that makes the
    //      conversion.
    //      insertIndexes(endpoint, json)

  } else if (doc.errors) {
    dispatch(errorsAdd({
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
    dispatch(appRequestSuccess())
  } else {
    dispatch(appRequestFailed())
  }

}
