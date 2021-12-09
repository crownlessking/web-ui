import { DEFAULT_LANDING_PAGE, DEFAULT_PAGE_NOT_FOUND, log } from '.'
import { IStateAllPages, IStatePage } from '../interfaces'
import AbstractState from './AbstractState'
import State from './State'
import StatePage from './StatePage'

export default class StateAllPages extends AbstractState {

  private allPagesJson: IStateAllPages
  private parentObj: State

  constructor(allPagesJson: IStateAllPages, parent: State) {
    super()
    this.allPagesJson = allPagesJson
    this.parentObj = parent
  }

  /**
   * Get a copy of all pages state.
   */
  get json() { return this.allPagesJson }

  /**
   * Chain-access to parent (root) definition.
   */
  get parent() { return this.parentObj }

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
  private getPageJson = (route: string): IStatePage => {
    let page = this.allPagesJson[route] || this.allPagesJson[`/${route}`]

    if (page) { return page }

    // Maybe its a url switch to the default page
    if (route === '/') {
      page = this.allPagesJson[this.parent.app.defaultPage]
        || this.allPagesJson[DEFAULT_LANDING_PAGE]
      if (page) { return page }
    }

    // Oops!
    if (route) {
      log(`'${route}' page does exist`)
      return this.allPagesJson[DEFAULT_PAGE_NOT_FOUND]
    }

    return this.allPagesJson[DEFAULT_LANDING_PAGE]
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
    const pageJson = this.getPageJson(this.parent.app.route)

    return new StatePage(pageJson, this)
  }

} // END class AllPages -------------------------------------------------------
