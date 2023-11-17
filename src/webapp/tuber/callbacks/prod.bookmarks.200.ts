import { IRedux, pre, log } from 'src/state'
import { get_search_query } from 'src/state/_errors.business.logic'
import { get_req_state } from 'src/state/net.actions'
import { APP_IS_FETCHING_BOOKMARKS, PAGE_RESEARCH_APP_ID } from '../tuber.config'
import { set_url_query_val } from 'src/controllers'

/**
 * Callback to handle the search field in the appbar when the user submits a
 * query to search for bookmarks.
 */
export function appbar_search_bookmarks (redux: IRedux) {
  return async () => {
    const rootState = redux.store.getState()
    const route = rootState.app.route ?? ''
    const searchQuery = get_search_query(rootState.appBarQueries, route)
    pre('appbar_search_bookmarks: ')
    if (!searchQuery) {
      log('no search query')
      return
    }
    const pageKey = rootState.stateRegistry[PAGE_RESEARCH_APP_ID]
    const endpoint = rootState.pages[pageKey]?.meta?.endpoint
    redux.store.dispatch({
      type: 'appBarQueries/appBarQueriesDelete',
      payload: route
    })
    redux.store.dispatch({
      type: 'data/collectionRemove',
      payload: endpoint
    })
    redux.store.dispatch({
      type: 'dataLoadedPages/endpointRemove',
      payload: endpoint
    })
    redux.store.dispatch({
      type: 'app/appSetFetchMessage',
      payload: APP_IS_FETCHING_BOOKMARKS
    })

    // Prevent space-filled or empty search query requests
    if (searchQuery.replace(/\s+/, '').length < 2) {
      log('space-filled query detected')
      return
    }

    pre()
    const encodedSearchQuery = encodeURIComponent(searchQuery)
    const args = `query=${encodedSearchQuery}`
    redux.store.dispatch(get_req_state(endpoint, args))
    const href = window.location.href
    const url = set_url_query_val(href, 'query', encodedSearchQuery)
    window.history.pushState({ path: url }, '', url)
  }
}