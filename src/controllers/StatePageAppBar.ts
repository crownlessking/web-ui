import IStateAppBar from './interfaces/IStateAppBar'
import StateAppBar from './StateAppBar'
import StatePage from './StatePage'
import StatePageAppBarBackground from './StatePageAppBarBackground'
import StatePageAppBarTypography from './StatePageAppBarTypography'

export default class StatePageAppBar 
  extends StateAppBar<StatePage> implements IStateAppBar
{
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

  /** Returns `true` if the appbar has a search field. */
  get hasSearchField () {
    return (this.appBarJson.layout || []).includes('search')
  }

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
