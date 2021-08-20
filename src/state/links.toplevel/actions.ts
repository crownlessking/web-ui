
import { IJsonapiPaginationLinks, IReduxAction } from '../../interfaces'

export const SET_TOPLEVEL_LINKS = 'UPDATE_TOPLEVEL_LINKS'

/**
 * from jsonapi response:
 *
 * ```ts
 * const serverResponse = {
 *    included: [],
 *    data: [],
 *    links: {} // top level links
 * }
 * ```
 *
 * Hypothetically received from the following URI:
 * https://domain.com/endpoint
 *
 * into the redux store:
 * ```ts
 * const reduxStore = {
 *    // ...
 *    topLevelLinks: {
 *      [endpoint: string]: links
 *    }
 *    // ...
 * }
 * ```
 *
 * The top level links object, although it can contain any other type of
 * links, it is primarily used to receive the endpoint pagination links.
 *
 * @param endpoint 
 * @param links 
 *
 * @see https://jsonapi.org/format/#fetching-pagination
 */
export const setTopLevelLinks = (endpoint: string, links: IJsonapiPaginationLinks): IReduxAction => ({
  type: SET_TOPLEVEL_LINKS,
  payload: { endpoint, links }
})
