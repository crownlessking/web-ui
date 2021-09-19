import { IStateAllPages, IStatePage } from '../../interfaces'
import StatePage, { HARD_CODED_PAGE } from './page.controller'
import State from '../controller'
import StateController from '../../controllers/state.controller'
import initialState from '../initial.state'

/**
 * Get page name.
 *
 * @param name 
 */
export function getPageName(name: string) {
  return name + 'Page'
}

/**
 * Parses the definition `string` found in `pageState.content`
 *
 * @param content
 *
 * @deprecated
 */
export function parsePageContent(content: string | undefined) {
  if (content) {
    const options = content.replace(/\s+/g,'').split(':')
    if (options.length >= 3) {
      return {
        type: options[0],
        name: options[1],
        endpoint: options[2],
        args: options[3] || ''
      }
    }
    throw new Error('Invalid `page` content definition')
  }
  throw new Error('`def` is undefined.')
}

export default class StateAllPages extends StateController {

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
      _id: HARD_CODED_PAGE,
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
