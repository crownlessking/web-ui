import { DEFAULT_PAGE_NOT_FOUND, log } from '.'
import { IStateAllPages, IStatePage } from '../interfaces'
import initialState from '../state/initial.state'
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

    // Okay, that did not work. Let's omit the forwardslash this time.
    let page = this.allPagesJson[route]
    if (page) { return page }

    // Try with the forwardslash first
    page = this.allPagesJson[`/${route}`]
    if (page) { return page }

    log(`'${route}' page does exist`)

    if (route === '/') {
      return this.allPagesJson[initialState.app.route]
    }

    // Oops! No default page. Let's create one.
    return this.allPagesJson[DEFAULT_PAGE_NOT_FOUND]
  }

} // END class AllPages -------------------------------------------------------
