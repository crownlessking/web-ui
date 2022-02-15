import { arrayToEntities } from '.'
import { errorsAdd } from '../slices/errors.slice'
import store from '../state'
import { getErrorCode } from '../state/errors.controller'

/**
 * Indexes is a copy of the data received from the server.
 * 
 * That data is located at `state.data`
 *
 * However, indexes is reorganized as an object. Where the resource document
 * id is the key and the value is the resource document itself. e.g.
 *
 * ```ts
 * const indexes = {
 *    'errorLogs': {
 *        '5c98dd46dd702a2e89b8e1cc': { } // <-- resource document
 *    }
 * }
 * ```
 *
 * Indexes will be used to perform quick searches and comparison of data.
 *
 * Note: One caveat, indexes needs to be updated whenever the content of
 *       `state.data` is changed.
 */
let indexes: any = {}

/**
 * Indexes new data.
 *
 * The new indexed `data` will be added to existing indexed `data`
 *
 * @param endpoint 
 * @param res server response
 */
export function insertIndexes(endpoint: string, res: any): void {
  const update = arrayToEntities(res.data, 'id')

  indexes = { ...indexes, [endpoint]: { ...indexes[endpoint], ...update }}
}

/**
 * Remove `data` which was previously indexed.
 *
 * @param endpoint
 * @param data
 */
export function removeIndexes(endpoint: string, data: any): void {
  const update = arrayToEntities(data, 'id')

  for (const key in update) {
    delete indexes[endpoint][key]
  }

}

/**
 * Get resource document by id.
 *
 * Use this function to retrieve an resource document if you know their id.
 *
 * @param endpoint 
 * @param id 
 */
export function select(endpoint: string, id: string): any {
  try {
    return indexes[endpoint][id]
  } catch (e: any) {
    store.dispatch(errorsAdd({
      id,
      error: {
        'code': getErrorCode(),
        'title': e.message,
        'detail': e.stack,
        'source': {
          parameter: `${endpoint}/${id}`
        }
      }
    }))
  }
}
