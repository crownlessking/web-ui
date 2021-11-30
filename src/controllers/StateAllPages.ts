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
    const statePage = this.getStatePage(route)

    if (statePage !== null) {
      return new StatePage(statePage, this)
    }

    return new StatePage({
      _id: StatePage.HARD_CODED_PAGE,
      title: 'Default page',
      content: '$html : default.html : n/a',
      useDefaultBackground: true
    }, this)
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
  getStatePage = (route: string): IStatePage => {
                      // Try with the forwardslash first
    return this.allPagesJson[`/${route}`]

      // Okay, that did not work. Let's omit the forwardslash this time.
      || this.allPagesJson[route]

      // Yup! The route is bad.  We'll just juse the default rout then.
      || this.allPagesJson[initialState.app.route]

      // Oops! No default page.
      || null
  }

} // END class AllPages -------------------------------------------------------
