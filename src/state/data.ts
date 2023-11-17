import store, { err } from '.'
import { IJsonapiResource } from '../interfaces/IJsonapi'
import { collectionQueue } from '../slices/data.slice'
import { get_error_code, remember_exception } from '../business.logic/errors'

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
export function get_data(endpoint: string): any[] {
  try {
    return store.getState().data[endpoint]
      || []
  } catch (e: any) {
    remember_exception({
      code: get_error_code(),
      title: 'Error Retrieving a Collection',
      detail: e.stack,
      source: {
        parameter: `${endpoint}`
      }
    })
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
export function save_data(endpoint: string, doc: any): void {
  store.dispatch(collectionQueue({collection: doc, endpoint}))
}

/** Parse jsonapi collection */
export function parse_jsonapi_collection<T=any>(data: any, $default?: T): T {
  let processedData: any
  switch (typeof data) {
    case 'object':
      if (Array.isArray(data)) {
        processedData = data.map((item: IJsonapiResource) => {
          return {
            id: item.id,
            ...item.attributes
          }
        })
      } else {
        processedData = {
          id: data.id,
            ...data.attributes
        }
      }
      break
    case 'boolean':
    case 'number':
    case 'string':
      err('parse_jsonapi_collection: Invalid data type')
      break
    case 'undefined':
    default:
      if ($default !== undefined) {
        processedData = $default
      }
  }
  return processedData
}