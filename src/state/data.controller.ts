import store from '.'
import { dataAdd } from '../slices/data.slice'
import Config from '../config'
import { errorsAdd } from '../slices/errors.slice'
import { getErrorCode } from '../state/errors.controller'

/**
 * After making a request to get data from the server, use this function to
 * access that data.
 *
 * #### purpose
 * With this function, no need to import the store to access the data using the 
 * `getState()` method.
 *
 * @param endpoint 
 */
export function getData(endpoint: string): any[] {
  try {
    return store.getState().data[endpoint]
      || []
  } catch (e: any) {
    if (Config.debug) {
      errorsAdd({
        code: getErrorCode(),
        title: 'Error Retrieving a Collection',
        detail: e.stack,
        source: {
          parameter: `${endpoint}`
        }
      })
    }
  }
  return []
}

/**
 * Save a document into a specific collection.
 *
 * Note: It is preferred that the newly created resource be taken from the
 * successful response of a `201 Created` request and passed to this function
 * to be saved into the displayed collection.
 * But, you can use this function to immediately save a document that was
 * created using a form for testing purpose.
 *
 * @param endpoint 
 * @param doc 
 */
export function saveData(endpoint: string, doc: any): void {
  store.dispatch(dataAdd({endpoint, data: doc}))
}
