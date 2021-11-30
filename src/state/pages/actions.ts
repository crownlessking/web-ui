import { IStateAllPages, IStatePage } from '../../interfaces'
import { Dispatch } from 'redux'
import { updatePage } from '../app/actions'
import { storeVolatile } from '../tmp/actions'
import { getPageName } from '.'

export const APP_INSERT_PAGES = 'APP_INSERT_PAGES'
export const insertPages = (pages: IStateAllPages) => ({
  type: APP_INSERT_PAGES,
  payload: pages
})

export const APP_REMOVE_PAGES = 'APP_REMOVE_PAGES'
export const removePages = (pageNames: string[]) => ({
  type: APP_REMOVE_PAGES,
  payload: pageNames
})

export const APP_GENERATE_PAGE = 'APP_GENERATE_PAGE'
export const generateNewPage = (pageName:string, page:IStatePage) => ({
  type: APP_GENERATE_PAGE,
  payload: { pageName, page }
})

export const displayPage = (name: string, vars: any) => {
  return (dispatch: Dispatch /*,getState: ()=>IState*/) => {
    dispatch(storeVolatile(getPageName(name), vars))
    dispatch(updatePage(name))
  }
}
