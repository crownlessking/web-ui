import { IStateAppBar } from '../../interfaces'
import StatePage from './page.controller'
import StateAppBar from '../../material/appbar/controller'
import StatePageAppBarBackground from './background.appbar.c'
import StatePageAppBarTypography from './typography.appbar.c'

export default class StatePageAppBar extends StateAppBar<StatePage> {

  protected noAppBarBackground: boolean
  protected noAppBarTypography: boolean
  protected pageAppBarBackgroundDef?: StatePageAppBarBackground
  protected appBarTypography?: StatePageAppBarTypography

  constructor(appBar: IStateAppBar, parent: StatePage) {
    super(appBar, parent)
    this.noAppBarBackground = !this.appBarJson.background
    this.appBarBackgroundJson = this.appBarJson.background || this.initBackground()
    this.noAppBarTypography = !this.appBarJson.typography
    this.appBarTypographyJson = this.appBarJson.typography || this.initTypography()
  }

  get background(): StatePageAppBarBackground {
    return this.pageAppBarBackgroundDef
      || (this.pageAppBarBackgroundDef = new StatePageAppBarBackground(
        this.appBarBackgroundJson,
        this
      ))
  }

  /**
   * Chain-access to typography definition.
   */
  get typography(): StatePageAppBarTypography {
    return this.appBarTypography
      || (this.appBarTypography = new StatePageAppBarTypography(
          this.appBarTypographyJson,
          this
        ))
  }

  /** if `true`, a search field will be available in the appbar. */
  get hasSearchField () { return !!this.appBarJson.hasSearchField }

  private initBackground = () => {
    if (this.noAppBarBackground) {
      if (this.appBarJson.useDefaultBackground) {
        return this.parent.parent.parent.appBar.background
      }
      if (this.appBarJson.backgroundInherited) {
        const route = this.appBarJson.backgroundInherited
        return this.parent.parent.pageAt(route).appBar.background
      }
    }
    return StateAppBar.EMPTY_APPBAR_BACKGROUND
  }

  private initTypography = () => {
    if (this.noAppBarTypography) {
      if (this.appBarJson.useDefaultTypography) {
        return this.parent.parent.parent.appBar.typography
      }
      if (this.appBarJson.typographyInherited) {
        const route = this.appBarJson.typographyInherited
        return this.parent.parent.pageAt(route).appBar.typography
      }
    }
    return StateAppBar.EMPTY_APPBAR_TYPOGRAPHY
  }

}
