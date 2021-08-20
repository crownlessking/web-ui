import {
  APP_INSERT_PAGES, APP_REMOVE_PAGES, APP_GENERATE_PAGE
} from './actions'
import { IReduxAction, IStateAllPages } from '../../interfaces'
import state from '../../state/initial.state'

const INIT: IStateAllPages = state.pages

/**
 * Delete pages
 *
 * @param allPages 
 * @param pageNamesList 
 */
function removePages(allPages: any, pageNamesList: string[]) {
  const updatedAllPages = { ...allPages }
  for (const pn of pageNamesList) {
    const pageName = pn + 'Page'
    if (updatedAllPages[pageName]) {
      delete updatedAllPages[pageName]
    }
  }
  return updatedAllPages
}

export default function (allPages = INIT, {payload, type}: IReduxAction): IStateAllPages {

  switch (type) {

  case APP_INSERT_PAGES:
    return { ...allPages, ...payload }

  case APP_REMOVE_PAGES:
    return removePages(allPages, payload)

  case APP_GENERATE_PAGE:
    return { ...allPages, [payload.pageName]: payload.page }

  default:
    return allPages
  }

}
