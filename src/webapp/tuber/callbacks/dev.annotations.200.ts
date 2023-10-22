import { get_req_state, post_req_state } from 'src/state/net.actions'
import { IRedux } from '../../../state'

/** Get collection of annotations from server using post request */
export function dev_get_annotations_callback (redux: IRedux, args = '') {
  return async () => {
    const { store: { dispatch } } = redux
    dispatch(get_req_state('annotations', args))
  }
}

// [TODO] Get a single annotation from server using post request

export function dev_create_annotation_search_index (redux: IRedux) {
  return async () => {
    redux.store.dispatch(post_req_state(
      'install-dev/setup-collection-index-search/annotations',
      {}
    ))
  }
}