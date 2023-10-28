import { IRedux } from 'src/state'
import { get_search_query } from 'src/state/_errors.business.logic'
import { get_req_state } from 'src/state/net.actions'
import { APP_IS_FETCHING_BOOKMARKS } from '../tuber.config'

/**
 * Callback to handle the search field in the appbar when the user submits a 
 * search query.
 *
 * @param redux 
 * @returns 
 */
export function appbar_search_for_bookmarks (redux: IRedux) {
  return () => {
    const state = redux.store.getState()
    const route = state.app.route ?? ''
    const searchQuery = get_search_query(state.appBarQueries, route)
    if (!searchQuery) { return }
    redux.store.dispatch({
      type: 'appBarQueries/appBarQueriesDelete',
      payload: route
    })
    redux.store.dispatch({
      type: 'data/collectionRemove',
      payload: 'bookmarks'
    })
    redux.store.dispatch({
      type: 'app/appSetFetchMessage',
      payload: APP_IS_FETCHING_BOOKMARKS
    })

    // Prevent space-filled or empty search query requests
    if (searchQuery.replace(/\s+/, '').length < 2) { return }
    if (searchQuery.replace(/~!\*\(\)/, '').length === 0) { return }

    const encodedSearchQuery = encodeURIComponent(searchQuery)
    const args = `query=${encodedSearchQuery}`
    redux.store.dispatch(get_req_state('bookmarks', args))
  }
}