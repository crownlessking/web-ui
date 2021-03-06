import { DEFAULT_LANDING_PAGE, DEFAULT_PAGE_NOT_FOUND, log } from '.'
import AbstractState from './AbstractState'
import IStateAllPages from './interfaces/IStateAllPages'
import IStatePage from './interfaces/IStatePage'
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

  /** Get a copy of all pages json. */
  get json(): IStateAllPages { return this.allPagesJson }
  /** Chain-access root definition. */
  get parent(): State { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }

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
  getPageJson = (route: string): IStatePage => {
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
  pageAt = (route: string): StatePage => {
    const pageJson = this.getPageJson(route)

    return new StatePage(pageJson, this)
  }

  /**
   * Get a page definition
   *
   * @returns 
   */
  getPage = (): StatePage => {
    const route = this.parent.app.route
    let page: IStatePage

    // If a page that is NOT the landing page is requested
    if (window.location.pathname.length > 1) {
      page = this.allPagesJson[window.location.pathname.substring(1)]
      || this.allPagesJson[window.location.pathname]
      if (page) {
        return new StatePage(page, this)
      }
      return new StatePage(this.allPagesJson[DEFAULT_PAGE_NOT_FOUND], this)
    }
    page = this.getPageJson(route)

    if (page) { return new StatePage(page, this) }

    // Maybe its a url switched to the default page
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
