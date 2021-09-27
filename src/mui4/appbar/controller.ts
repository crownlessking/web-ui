import {
  IStateAppBar, IStateTypography, IStateBackground
} from '../../interfaces'
import StateController from '../../controllers/state.controller'
import State from '../../state/controller'
import StatePage from '../../state/pages/page.controller'
import StateAppBarBackground from './background.c'
import StateAppBarTypography from './typography.c'
import StateLink from '../link/controller'

/**
 * Ports previous appBar state properties over to the newest if missing.
 *
 * e.g. If the font color in the previous appBar state was define,
 *      this function will make sure that font color is available
 *      in the next appBar state if missing.
 *
 * @param dest 
 * @param source 
 */
export function mergeAppBarStyles (dest?: IStateAppBar, source?: IStateAppBar) {
  if (dest && source) {
    return { ...dest, ...source }
  }
  return source
}

/**
 * Retrieve the background of the default appbar.
 *
 * The default appbar is defined at the root state.
 *
 * @param page 
 */
export function getDefaultAppBarBackground (page: StatePage) {
  return page.parent.parent.appBar.background
}

export function getPageAppbarBackground (page: StatePage, route: string) {
  return page.parent.pageAt(route).background
}

export default class StateAppBar<P = State>
    extends StateController implements IStateAppBar {

  static EMPTY_APPBAR_BACKGROUND: IStateBackground = { type: 'none' }
  static EMPTY_APPBAR_TYPOGRAPHY: IStateTypography = {  }

  protected parentObj: P
  protected appBarJson: IStateAppBar
  protected appBarItems?: StateLink<this>[]
  protected appBarTypographyJson: IStateTypography
  protected appBarTypography?: StateAppBarTypography<P>
  protected appBarBackgroundJson: IStateBackground
  protected appBarBackground?: StateAppBarBackground<P>

  /**
   * Constructor
   *
   * @param appBarJson
   */
  constructor(appBarJson: IStateAppBar, parent: P) {
    super()
    this.parentObj = parent
    this.appBarJson = appBarJson
    this.appBarTypographyJson = this.appBarJson.typography
        || StateAppBar.EMPTY_APPBAR_TYPOGRAPHY
    this.appBarBackgroundJson = this.appBarJson.background
        || StateAppBar.EMPTY_APPBAR_BACKGROUND
  }

  /**
   * Get a copy of the `appBar` json.
   */
  get json() { return this.appBarJson }

  /**
   * Chain-access to parent (root) definition.
   */
  get parent() { return this.parentObj }

  /**
   * Get appbar icon objects.
   */
  get items() {
    return this.appBarItems || (
      this.appBarItems = this.appBarJson.items.map(
        item => new StateLink(item, this)
      )
    )
  }

  /**
   * Chain-access to appbar background definition.
   */
  get background() {
    return this.appBarBackground
      || (this.appBarBackground = new StateAppBarBackground<P>(
          this.appBarBackgroundJson,
          this
        ))
  }

  /**
   * Chain-access to typography definition.
   */
  get typography() {
    return this.appBarTypography
      || (this.appBarTypography = new StateAppBarTypography<P>(
          this.appBarTypographyJson,
          this
        ))
  }

} // END class StateAppBar --------------------------------------------------
