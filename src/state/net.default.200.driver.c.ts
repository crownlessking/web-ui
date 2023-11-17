import { Dispatch } from 'redux'
import {
  collectionLimitedQueue,
  collectionLimitedStack,
} from '../slices/data.slice'
import { metaAdd } from '../slices/meta.slice'
import { topLevelLinksStore } from '../slices/topLevelLinks.slice'
import { appRequestSuccess, appRequestFailed } from '../slices/app.slice'
import { bootstrap, net_patch_state, RootState } from '.'
import {
  IJsonapiAbstractResponse,
  IJsonapiResponse
} from '../interfaces/IJsonapi'
import StateDataPagesRange from 'src/controllers/StateDataPagesRange'
import JsonapiPaginationLinks from 'src/controllers/JsonapiPaginationLinks'
import { is_object, safely_get_as } from 'src/controllers'
import { remember_jsonapi_errors } from '../business.logic/errors'

// [TODO] The `included` state does not exist yet and needs to be created

/**
 * Once the server response is received, this function can be used to process it.
 */
export default function net_default_200_driver (
  dispatch: Dispatch,
  getState: ()=> RootState,
  endpoint: string,
  response: IJsonapiAbstractResponse
): void {
  const doc = response as IJsonapiResponse
  let insertPosition: 'beginning' | 'end' | '' = 'end'
  const maxLoadedPages = parseInt(safely_get_as(
    doc.meta,
    'max_loaded_pages',
    '4'
  ))
  const dataManager = new StateDataPagesRange(getState().dataLoadedPages)
  dataManager.configure({ endpoint })
  let currentPageNumber = 1
  let pageSize = 25

  // Top level links
  if (is_object(doc.links) && typeof doc.links !== 'undefined') {
    const links = new JsonapiPaginationLinks(doc.links)
    pageSize = links.pageSize
    dataManager.configure({
      endpoint,
      pageSize,
      maxLoadedPages
    })
    if (links.selfPageNumber < dataManager.firstPage) {
      insertPosition = 'beginning'
    } else if (dataManager.isPageInRange(links.selfPageNumber)) {
      insertPosition = ''
    }
    if (insertPosition) {
      dispatch(topLevelLinksStore({ endpoint, links: doc.links }))
    }
    currentPageNumber = links.selfPageNumber
  }

  // meta member
  if (is_object(doc.meta) && insertPosition) {
    dispatch(metaAdd({ endpoint, meta: doc.meta }))
  }

  // data member
  if (doc.data && Array.isArray(doc.data)) {
    if (insertPosition === 'end') {
      dispatch(collectionLimitedQueue({
        collection: doc.data,
        endpoint,
        pageSize,
        limit: dataManager.getMaxLoadedPages()
      }))
    } else if (insertPosition === 'beginning') {
      dispatch(collectionLimitedStack({
        collection: doc.data,
        endpoint,
        pageSize,
        limit: dataManager.getMaxLoadedPages()
      }))
    }
    const newRange = dataManager.pageToBeLoaded(currentPageNumber)
      .getNewPageRange()
    if (newRange) {
      dispatch({
        type: 'dataLoadedPages/loadedRangeUpdate',
        payload: {
          endpoint,
          pageNumbers: newRange
        }
      })
    }
  } else if (doc.errors) {
    remember_jsonapi_errors(doc.errors)
  }

  // This if-condition handles redux state loaded from the server (remote).
  if (is_object(doc.state)) {
    dispatch(net_patch_state(doc.state))
    if (doc.state?.app?.isBootstrapped) {
      bootstrap()
    }
  }

  if (!!(doc.meta || doc.data || doc.links || doc.state)) {
    dispatch(appRequestSuccess())
  } else {
    dispatch(appRequestFailed())
  }

}
