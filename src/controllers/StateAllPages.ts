import { DEFAULT_LANDING_PAGE, DEFAULT_PAGE_NOT_FOUND, log } from '.'
import AbstractState from './AbstractState'
import State from './State'
import StatePage, { IStatePage } from './StatePage'

/**
 * Contains all page states.
 */
 export interface IStateAllPages {
  [prop: string]: IStatePage
}

export default class StateAllPages extends AbstractState {

  private allPagesJson: IStateAllPages
  private parentObj: State

  constructor(allPagesJson: IStateAllPages, parent: State) {
    super()
    this.allPagesJson = allPagesJson
    this.parentObj = parent
  }

  /** Get a copy of all pages json. */
  get json() { return this.allPagesJson }
  /** Chain-access root definition. */
  get parent() { return this.parentObj }
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }

  /**
   * Prevents app from crashing when given a bad route.
   *
   * Overall, this function is a temporary solution for a possibility where the
   * specified route does not exist and would cause the app to crash.
   * With this function however, the app will ignore the bad route and use the
   * default one instead.
   *
   * @param route the specified route
   */
  private getPageJson = (route: string) => {
    return this.allPagesJson[route]
      || this.allPagesJson[`/${route}`]
      || this.allPagesJson[route.substring(1)]
  }

  /**
   * Get a page definition.
   *
   * @param route key of page. These can be valid URI parameters. Therefore,
   *             they should not be accessed using the (dot) `.` operator.
   */
  pageAt = (route: string) => {
    const pageJson = this.getPageJson(route)

    return new StatePage(pageJson, this)
  }

  /**
   * Get a page definition
   *
   * @returns 
   */
  getPage = () => {
    const route = this.parent.app.route
    let page: IStatePage

    // If this is the first page to be rendered
    if (!this.parent.app.status) {
      page = this.allPagesJson[window.location.pathname.substring(1)]
        || this.allPagesJson[window.location.pathname]
      if (page) { return new StatePage(page, this) }
    }

    page = this.getPageJson(route)
    if (page) { return new StatePage(page, this) }

    // Maybe its a url switch to the default page
    if (route === '/' ) {
      page = this.allPagesJson[this.parent.app.defaultPage]
      if (page) { return new StatePage(page, this) }
    }

    // Oops!
    if (route) {
      log(`'${route}' page does exist`)
      return new StatePage(this.allPagesJson[DEFAULT_PAGE_NOT_FOUND], this)
    }

    return new StatePage(this.allPagesJson[DEFAULT_LANDING_PAGE], this)
  }

} // END class AllPages -------------------------------------------------------
