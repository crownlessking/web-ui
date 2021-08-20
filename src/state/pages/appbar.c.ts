import { IStateAppBar } from '../../interfaces'
import StatePage from './page.controller'
import StateAppBar from '../../material/appbar/controller'
import StatePageAppBarBackground from './background.appbar.c'
import StatePageAppBarTypography from './typography.appbar.c'

export default class StatePageAppBar extends StateAppBar<StatePage> {

  protected noAppBarBackground: boolean
  protected noAppBarTypography: boolean
  protected pageAppBarBackgroundDef?: StatePageAppBarBackground
  protected appBarTypographyDef?: StatePageAppBarTypography

  constructor(appBar: IStateAppBar, parent: StatePage) {
    super(appBar, parent)
    this.noAppBarBackground = !this.appBar.background
    this.appBarBackground = this.appBar.background || this.initBackground()
    this.noAppBarTypography = !this.appBar.typography
    this.appBarTypography = this.appBar.typography || this.initTypography()
  }

  get background(): StatePageAppBarBackground {
    return this.pageAppBarBackgroundDef
      || (this.pageAppBarBackgroundDef = new StatePageAppBarBackground(
        this.appBarBackground,
        this
      ))
  }

  /**
   * Chain-access to typography definition.
   */
  get typography(): StatePageAppBarTypography {
    return this.appBarTypographyDef
      || (this.appBarTypographyDef = new StatePageAppBarTypography(
          this.appBarTypography,
          this
        ))
  }

  /** if `true`, a search field will be available in the appbar. */
  get hasSearchField () { return !!this.appBar.hasSearchField }

  private initBackground = () => {
    if (this.noAppBarBackground) {
      if (this.appBar.useDefaultBackground) {
        return this.parent.parent.parent.appBar.background
      }
      if (this.appBar.backgroundInherited) {
        const route = this.appBar.backgroundInherited
        return this.parent.parent.pageAt(route).appBar.background
      }
    }
    return StateAppBar.EMPTY_APPBAR_BACKGROUND
  }

  private initTypography = () => {
    if (this.noAppBarTypography) {
      if (this.appBar.useDefaultTypography) {
        return this.parent.parent.parent.appBar.typography
      }
      if (this.appBar.typographyInherited) {
        const route = this.appBar.typographyInherited
        return this.parent.parent.pageAt(route).appBar.typography
      }
    }
    return StateAppBar.EMPTY_APPBAR_TYPOGRAPHY
  }

}
