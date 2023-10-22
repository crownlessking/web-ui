import { ler } from '.'
import { DEFAULT_LANDING_PAGE, DEFAULT_PAGE_NOT_FOUND } from '../constants'
import AbstractState from './AbstractState'
import IStateAllPages from './interfaces/IStateAllPages'
import IStatePage from './interfaces/IStatePage'
import State from './State'
import StateApp from './StateApp'
import StatePage from './StatePage'

export default class StateAllPages extends AbstractState {

  private allPagesState: IStateAllPages
  private parentDef?: State
  private appDef?: StateApp

  constructor(allPagesState: IStateAllPages, parent?: State) {
    super()
    this.allPagesState = allPagesState
    this.parentDef = parent
  }

  /** Get a copy of all pages json. */
  get state(): IStateAllPages { return this.allPagesState }
  /** Chain-access root definition. */
  get parent(): State { return this.parentDef || new State() }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }
  /** Shortcutted chain-access to app definition. */
  get app(): StateApp { return this.appDef = this.appDef || new State().app }
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
    return this.allPagesState[route]
      || this.allPagesState[`/${route}`]
      || this.allPagesState[route.substring(1)]
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
    let pageState: IStatePage
    const route = this.app.route
    if (route === '/') {
      pageState = this.allPagesState[this.app.homePage]
      if (pageState) {
        return new StatePage(pageState, this)
      }
    }
    pageState = this.getPageJson(route)
    if (pageState) {
      return new StatePage(pageState, this)
    }
    if (window.location.pathname.length > 1) {
      pageState = this.getPageJson(window.location.pathname)
      if (pageState) {
        return new StatePage(pageState, this)
      }
    }
    // Oops! route is bad!
    if (route) {
      ler(`'${route}' page does exist`)
      return new StatePage(this.allPagesState[DEFAULT_PAGE_NOT_FOUND], this)
    }
    if (this.app.homePage) {
      pageState = this.getPageJson(this.app.homePage)
      if (pageState) {
        return new StatePage(pageState, this)
      }
    }
    return new StatePage(this.allPagesState[DEFAULT_LANDING_PAGE], this)
  }

  set app(app: StateApp) { this.appDef = app }
} // END class AllPages -------------------------------------------------------
