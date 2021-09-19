
import store from '../../state'
import { dataInsertOne } from './actions'
import Config from '../../common/configuration'
import { addError } from '../errors/actions'
import { getErrorCode } from '../errors/controller'
import StateController from '../../controllers/state.controller'
import State from '../controller'

/**
 * Use this function to merge an existing array of resources with a new array
 * of resources.
 *
 * #### purpose
 * The purpose of this function is to merge the array of resource document from
 * the server into existing array of resource received prior.
 *
 * Use this function if you want to preserve existing data
 *
 * @param currentList 
 * @param list 
 */
export function listMergeNew(current: any[], $new: any[]) {
  if (current && $new) {
    return [ ...current, ...$new ]
  } else if (current) {
    return current
  } else if ($new) {
    return $new
  }
  return []
}

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
      addError({
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
export function saveData(endpoint: string, doc: any) {
  store.dispatch(dataInsertOne(endpoint, doc))
}



export default class StateData extends StateController {

  private dataJson: any
  private parentObj: State

  constructor(dataJson: any, parent: State) {
    super()
    this.parentObj = parent
    this.dataJson = dataJson
  }

  get json() { return this.dataJson }

  get parent() { return this.parentObj }

  /**
   * Get a collection or a single document in a collection.
   *
   * @param endpoint
   * @param index
   */
  get = (endpoint: string, index?: number) => {
    const collection = this.dataJson[endpoint]

    if (index && index >= 0) {
      return collection[index]
    }

    return collection
  }
}
