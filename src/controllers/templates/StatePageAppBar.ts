import IStateAppBar, { TAppBarStyle } from '../../interfaces/IStateAppBar'
import IStateBackground from '../../interfaces/IStateBackground'
import IStateTypography from '../../interfaces/IStateTypography'
import StateAppBar from '../StateAppBar'
import StateAppBarDefault from './StateAppBarDefault'
import StatePage from '../StatePage'
import StatePageAppBarBackground from './StatePageAppBarBackground'
import StatePageAppBarTypography from './StatePageAppBarTypography'
import { remember_exception } from 'src/business.logic/errors'

export default class StatePageAppBar 
  extends StateAppBar<StatePage> implements IStateAppBar
{
  protected noAppBarBackground: boolean
  protected noAppBarTypography: boolean
  protected pageAppBarBackgroundDef?: StatePageAppBarBackground
  protected appBarTypography?: StatePageAppBarTypography
  private _default: StateAppBarDefault
  private _appBarLogoProps?: Required<IStateAppBar>['logoProps']

  constructor(appBar: IStateAppBar, parent: StatePage) {
    super(appBar, parent)
    this._default = this.parent.parent.parent.appBar
    this.noAppBarBackground = !this.appBarState.background
    this.appBarBackgroundState = this.appBarState.background || this.initBackground()
    this.noAppBarTypography = !this.appBarState.typography
  }

  get theme(): any { return this.appBarState.theme || this._default.theme }
  get props(): any { return this.appBarState.props || this._default.props }
  get _type(): string { return this.appBarState._type || this._default._type }
  get appBarStyle(): TAppBarStyle {
    return this.appBarState.appBarStyle || this._default.appBarStyle
  }

  get background(): StatePageAppBarBackground {
    return this.pageAppBarBackgroundDef
      || (this.pageAppBarBackgroundDef = new StatePageAppBarBackground(
        this.appBarBackgroundState,
        this
      ))
  }

  /**
   * Chain-access to typography definition.
   */
  get typography(): StatePageAppBarTypography {
    this.appBarTypographyState = this.appBarState.typography || this.initTypography()
    return this.appBarTypography
      || (this.appBarTypography = new StatePageAppBarTypography(
        this.appBarTypographyState,
        this
      ))
  }

  get menuId(): string {
    return this.appBarState.menuId
      || this._default.menuId
  }

  get mobileMenuId(): string {
    return this.appBarState.mobileMenuId 
      || this._default.mobileMenuId
  }

  get mobileMenu2Id(): string {
    return this.appBarState.mobileMenu2Id
      || this._default.mobileMenu2Id
  }

  get toolbarProps(): Required<IStateAppBar>['toolbarProps'] {
    return {
      ...this._default.toolbarProps,
      ...this.appBarState.toolbarProps
    }
  }

  get mobileMenuProps(): Required<IStateAppBar>['mobileMenuProps'] {
    return {
      ...this._default.mobileMenuProps,
      ...this.appBarState.mobileMenuProps
    }
  }

  get mobileMenu2Props(): Required<IStateAppBar>['mobileMenuProps'] {
    return {
      ...this._default.mobileMenu2Props,
      ...this.appBarState.mobileMenu2Props
    }
  }

  get menuIconProps(): Required<IStateAppBar>['menuIconProps'] {
    return {
      ...this._default.menuIconProps,
      ...this.appBarState.menuIconProps
    }
  }

  get menuItemsProps(): any {
    return this.appBarState.menuItemsProps || {}
  }

  get menuItemsSx(): any {
    return this.appBarState.menuItemsSx || this._default.menuItemsSx
  }

  get logoTag(): Required<IStateAppBar>['logoTag'] {
    return this.parent.parent.parent.app.logoTag
      || this.appBarState.logoTag
      || this._default.logoTag
  }

  get logoProps() {
    if (this._appBarLogoProps) {
      return this._appBarLogoProps
    }
    const logoUri = this.parent.parent.parent.app.logoUri
    if (logoUri) {
      if (this.logoTag.toLowerCase() === 'div') {
        return this._appBarLogoProps = {
          ...this._default.logoProps,
          sx: {
            backgroundSize: 'contain',
            backgroundImage: `url("${logoUri}")`,
            width: this.parent.parent.parent.app.state.logoWidth,
            height: this.parent.parent.parent.app.state.logoHeight
          }
        }
      }
      if (this.logoTag.toLowerCase() === 'img') {
        return this._appBarLogoProps = {
          ...this._default.logoProps,
          src: logoUri,
          ...this.appBarState.logoProps
        }
      }
    }
    return this._appBarLogoProps = {
      ...this._default.logoProps,
      ...this.appBarState.logoProps
    }
  }

  get hasLogo(): boolean {
    return !!this.parent.parent.parent.app.logoUri
      || Object.keys(this.logoProps).length > 0
  }

  get textLogoProps() {
    return {
      ...this._default.textLogoProps,
      ...this.appBarState.textLogoProps
    }
  }

  get logoContainerProps(): any {
    return {
      ...this._default.logoContainerProps,
      ...this.appBarState.logoContainerProps
    }
  }

  get searchFieldProps() {
    return {
      ...this._default.searchFieldProps,
      ...this.appBarState.searchFieldProps
    }
  }

  get desktopMenuItemsProps(): Required<IStateAppBar>['desktopMenuItemsProps'] {
    return {
      ...this._default.desktopMenuItemsProps,
      ...this.appBarState.desktopMenuItemsProps
    }
  }

  get desktopMenuItems2Props(): Required<IStateAppBar>['desktopMenuItems2Props'] {
    return {
      ...this._default.desktopMenuItems2Props,
      ...this.appBarState.desktopMenuItems2Props
    }
  }

  get mobileMenuItemsProps(): Required<IStateAppBar>['mobileMenuItemsProps'] {
    return {
      ...this._default.mobileMenuItemsProps,
      ...this.appBarState.mobileMenuItemsProps
    }
  }

  get mobileMenuItems2Props(): Required<IStateAppBar>['mobileMenuItems2Props'] {
    return {
      ...this._default.mobileMenuItems2Props,
      ...this.appBarState.mobileMenuItems2Props
    }
  }

  get mobileMenuIconProps(): Required<IStateAppBar>['mobileMenuIconProps'] {
    return {
      ...this._default.mobileMenuIconProps,
      ...this.appBarState.mobileMenuIconProps
    }
  }

  get mobileMenuIcon2Props(): Required<IStateAppBar>['mobileMenuIcon2Props'] {
    return {
      ...this._default.mobileMenuIcon2Props,
      ...this.appBarState.mobileMenuIcon2Props
    }
  }

  /** For use with app bar with search fields. */
  protected handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  private initBackground = (): IStateBackground => {
    if (this.noAppBarBackground) {
      if (this.appBarState.useDefaultBackground) {
        return this.parent.parent.parent.appBar.background
      }
      if (this.appBarState.backgroundInherited) {
        const inheritedRoute = this.appBarState.backgroundInherited
        const backgroundInheritedState = this.parent.parent
          .getPageState(inheritedRoute)
          ?.appBar
          ?.background
        if (backgroundInheritedState) { return backgroundInheritedState }
      }
    }
    return {}
  }

  private initTypography = (): IStateTypography => {
    if (this.noAppBarTypography) {
      const defaultTypography = this.parent.parent.parent.appBar.state.typography
      if (this.appBarState.useDefaultTypography && defaultTypography) {
        return defaultTypography
      }
      try {
        const route = this.appBarState.typographyInherited
        if (route) {
          const inheritedTypography = this.parent.parent.state[route].typography
          if (inheritedTypography) {
            return inheritedTypography
          }
        }
      } catch (e: any) { remember_exception(e) }
    }
    return {}
  }

}
