import IStateAppBar from './interfaces/IStateAppBar'
import IStateBackground from './interfaces/IStateBackground'
import IStateTypography from './interfaces/IStateTypography'
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
    this.appBarTypographyJson = this.appBarJson.typography || this.initTypography()
    return this.appBarTypography
      || (this.appBarTypography = new StatePageAppBarTypography(
        this.appBarTypographyJson,
        this
      ))
  }

  /** Returns `true` if the appbar has a search field. */
  get hasSearchField(): boolean {
    return (this.appBarJson.layout || []).includes('search')
  }

  private initBackground = (): IStateBackground => {
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

  private initTypography = (): IStateTypography => {
    if (this.noAppBarTypography) {
      const defaultTypography = this.parent.parent.parent.appBar.json.typography
      if (this.appBarJson.useDefaultTypography && defaultTypography) {
        return defaultTypography
      }
      try {
        const route = this.appBarJson.typographyInherited
        if (route) {
          const inheritedTypography = this.parent.parent.json[route].typography
          if (inheritedTypography) {
            return inheritedTypography
          }
        }
      } catch (_e) { }
    }
    return StateAppBar.EMPTY_APPBAR_TYPOGRAPHY
  }

}
