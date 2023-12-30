import { IRedux } from 'src/state'
import { get_appbar_input_val } from 'src/business.logic'
import { get_req_state } from 'src/state/net.actions'
import { APP_IS_FETCHING_BOOKMARKS, PAGE_RESEARCH_APP_ID } from '../tuber.config'
import { get_parsed_page_content } from 'src/controllers'
import { to_slug } from './_callbacks.common.logic'
import { pre, log } from '../../../business.logic/logging'

/**
 * Callback to handle the search field in the appbar when the user submits a
 * query to search for bookmarks.
 * @param redux store, actions, and route
 */
export default function appbar_search_bookmarks (redux: IRedux) {
  return async () => {
    const { store: { dispatch, getState }, actions: A } = redux
    const rootState = getState()
    const route = rootState.app.route ?? ''
    const searchQuery = get_appbar_input_val(rootState.appbarQueries, route)
    pre('appbar_search_bookmarks: ')
    if (!searchQuery) {
      log('no search query')
      return
    }

    if (searchQuery.startsWith(':')) {
      dispatch(A.appSwitchPage(`listings/${to_slug(searchQuery)}`))
      // [TODO] When creating a listing from the app bar, it will not be saved to
      //        until a bookmark is added to it on the server.
      return
    }

    const pageKey = rootState.stateRegistry[PAGE_RESEARCH_APP_ID]
    const content = rootState.pages[pageKey]?.content
    const endpoint = get_parsed_page_content(content).endpoint
    if (!endpoint) {
      log('Page content has no endpoint')
      return
    }
    dispatch(A.dataRemoveCol(endpoint))
    dispatch(A.dataClearRange(endpoint))
    dispatch(A.appSetFetchMessage(APP_IS_FETCHING_BOOKMARKS))

    // Prevent space-filled or empty search query requests
    if (searchQuery.replace(/\s+/, '').length < 2) {
      log('space-filled query detected')
      return
    }

    pre()
    const encodedSearchQuery = encodeURIComponent(searchQuery)
    const args = `filter[search]=${encodedSearchQuery}`
    dispatch(get_req_state(endpoint, args))
  }
}