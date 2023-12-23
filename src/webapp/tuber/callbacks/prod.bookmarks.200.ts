import { IRedux, pre, log } from 'src/state'
import { get_search_query, mongo_object_id } from 'src/business.logic'
import { get_req_state } from 'src/state/net.actions'
import { APP_IS_FETCHING_BOOKMARKS, PAGE_RESEARCH_APP_ID } from '../tuber.config'
import { no_path_vars } from 'src/controllers'
import { to_slug } from './_callbacks.common.logic'

function _appbar_load_listing (redux: IRedux) {
  return async () => {
    const rootState = redux.store.getState()
    const { store: { dispatch }, actions } = redux

    const route = rootState.app.route ?? ''
    if (no_path_vars(route)) { return }
    const searchQuery = get_search_query(rootState.appbarQueries, route)
    pre('appbar_load_listing: ')
    if (!searchQuery) {
      log('no search query')
      return
    }

    if (searchQuery.startsWith(':')) {
      const id = mongo_object_id()
      const name = searchQuery.replace(':', '')
      dispatch(actions.dataUpdateByName({
        name,
        collectionName: 'listings',
        resource: {
          id,
          type: 'listings',
          attributes: {
            name,
            slug: to_slug(name),
          }
        }
      }))
      dispatch(actions.appSwitchPage(`listings/${id}`))
    }
  
    // [TODO] When creating a listing from the app bar, it will not be saved to
    //        until a bookmark is added to it.
  }
}

/**
 * Callback to handle the search field in the appbar when the user submits a
 * query to search for bookmarks.
 * @param redux store, actions, and route
 */
export default function appbar_search_bookmarks (redux: IRedux) {
  return async () => {
    const rootState = redux.store.getState()
    const route = rootState.app.route ?? ''
    const searchQuery = get_search_query(rootState.appbarQueries, route)
    pre('appbar_search_bookmarks: ')
    if (!searchQuery) {
      log('no search query')
      return
    }
    const pageKey = rootState.stateRegistry[PAGE_RESEARCH_APP_ID]
    const endpoint = rootState.pages[pageKey]?.meta?.endpoint
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
    const args = `filter[search]=${encodedSearchQuery}`
    redux.store.dispatch(get_req_state(endpoint, args))
  }
}