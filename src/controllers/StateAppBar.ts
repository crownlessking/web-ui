import _ from 'lodash'
import {
  IStateAppBar, IStateBackground, IStateTypography
} from '../interfaces'
import AbstractState from './AbstractState'
import State from './State'
import StateAppBarBackground from './StateAppBarBackground'
import StateAppBarTypography from './StateAppBarTypography'
import StateLink from './StateLink'

export default class StateAppBar<P = State>
  extends AbstractState implements IStateAppBar {

  static EMPTY_APPBAR_BACKGROUND: IStateBackground = { type: 'none' }
  static EMPTY_APPBAR_TYPOGRAPHY: IStateTypography = {}

  protected parentObj: P
  protected appBarJson: IStateAppBar
  protected appBarLayout?: IStateAppBar['layout']
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

  get layout() {
    return this.appBarLayout
      || (this.appBarLayout = (
            this.appBarJson.layout && this.appBarJson.layout.length > 0
          ) ? this.appBarJson.layout
            : ['menu','space','logo','space','search']
          )
  }

  get logoTag() { return this.appBarJson.logoTag || 'img' }

  get logoProps() { return this.appBarJson.logoProps || {} }

  get logoTheme() { return this.appBarJson.logoTheme || {} }

  get hasLogo () {
    return Object.keys(this.logoProps).length > 0
  }

  get textLogoProps() {
    return _.extend({
      variant: 'h6',
      noWrap: true,
      component: 'div',
      sx: { display: { xs: 'none', sm: 'block' } }
    }, this.appBarJson.textLogoProps)
  }

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
