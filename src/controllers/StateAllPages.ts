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
  getPageJson = (route: string): IStatePage => {

    // Try with the forwardslash first
    let page = this.allPagesJson[`/${route}`]

    if (page) { return page }

    // Okay, that did not work. Let's omit the forwardslash this time.
    page = this.allPagesJson[route]

    if (page) { return page }

    log(`'${route}' page does exist`)

    // Yup! The route is bad.  We'll just use the default rout then.
    page = this.allPagesJson[initialState.app.route]

    if (page) { return page }

    console.log(this.allPagesJson[DEFAULT_PAGE_NOT_FOUND])

    // Oops! No default page. Let's create one.
    // [TODO] Improve the default page
    //        Right now, it depends on a div located in the index.html file.
    //        But, what if someone delete it by mistake. I suggest hardcoding
    //        the default page just like src/components/pages/success.tsx
    return this.allPagesJson[DEFAULT_PAGE_NOT_FOUND]
  }

} // END class AllPages -------------------------------------------------------
