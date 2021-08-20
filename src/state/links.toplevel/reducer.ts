import { IReduxAction } from '../../interfaces'
import initialState from '../../state/initial.state'
import { SET_TOPLEVEL_LINKS } from './actions'

const INIT = initialState.topLevelLinks

/**
 * The top level link is the jsonapi response member, `links` that is located
 * at the top level of the json response along with `data`.
 *
 * e.g.
 * ```ts
 * const serverResponse = {
 *    data: [],
 *    links: {}, // top level links member
 * }
 * ```
 *
 * @param state
 */
export default function (state = INIT, { payload, type}: IReduxAction) {

  switch (type) {

  /**
   * When the top level links are received in the server response, this action
   * will save them in the store. Or it will update them if they already exist.
   */
  case SET_TOPLEVEL_LINKS:
    const { endpoint, links } = payload
    return { ...state, [endpoint]: links }

  default:
    return state
  }

}
