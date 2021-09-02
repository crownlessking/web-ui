import {
  IStateAppBar, IStateTypography, IStateBackground
} from '../../interfaces'
import StateController from '../../controllers/state.controller'
import State from '../../state/controller'
import StatePage from '../../state/pages/page.controller'
import StateAppBarBackground from './background.c'
import StateAppBarTypography from './typography.c'

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

  protected parentDef: P
  protected appBar: IStateAppBar
  protected appBarTypography: IStateTypography
  protected appBarTypographyDef?: StateAppBarTypography<P>
  protected appBarBackground: IStateBackground
  protected appBarBackgroundDef?: StateAppBarBackground<P>

  /**
   * Constructor for .
   *
   * @param appBar
   */
  constructor(appBar: IStateAppBar, parent: P) {
    super()
    this.parentDef = parent
    this.appBar = appBar
    this.appBarTypography = this.appBar.typography
        || StateAppBar.EMPTY_APPBAR_TYPOGRAPHY
    this.appBarBackground = this.appBar.background
        || StateAppBar.EMPTY_APPBAR_BACKGROUND
  }

  /**
   * Get a copy of the `appBar` state.
   */
  get state() { return this.appBar }

  /**
   * Get a patched version of the `appBar` state.
   *
   * __Warning__: Don't use! Not implemented yet.
   */
  get patched(): IStateAppBar {
    throw new Error(`'Patched appBar state' NOT implemented.`)
  }

  /**
   * Chain-access to parent (root) definition.
   */
  get parent() { return this.parentDef }

  /**
   * Get appbar icon states.
   */
  get items() { return this.appBar.items }

  /**
   * Chain-access to appbar background definition.
   */
  get background() {
    return this.appBarBackgroundDef
      || (this.appBarBackgroundDef = new StateAppBarBackground<P>(
          this.appBarBackground,
          this
        ))
  }

  /**
   * Chain-access to typography definition.
   */
  get typography() {
    return this.appBarTypographyDef
      || (this.appBarTypographyDef = new StateAppBarTypography<P>(
          this.appBarTypography,
          this
        ))
  }

} // END class StateAppBar --------------------------------------------------
