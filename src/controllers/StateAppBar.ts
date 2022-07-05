import { AppBarProps, IconButtonProps } from '@mui/material'
import AbstractState from './AbstractState'
import IStateAppBar from './interfaces/IStateAppBar'
import IStateBackground from './interfaces/IStateBackground'
import IStateTypography from './interfaces/IStateTypography'
import State from './State'
import StateAppBarBackground from './StateAppBarBackground'
import StateAppBarTypography from './StateAppBarTypography'
import StateComponent from './StateComponent'
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
  protected appBarComponentsJson: Required<IStateAppBar>['components']
  protected appBarComponents: {
    [comp: string]: StateComponent[]
  }

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
    this.appBarComponentsJson = this.appBarJson.components || {}
    this.appBarComponents = {}
  }

  /** Get a copy of the `appBar` json. */
  get json(): IStateAppBar { return this.appBarJson }
  /** Chain-access to root definition. */
  get parent(): P { return this.parentObj }
  get props(): AppBarProps {
    return {
      position: 'static',
      ...this.appBarJson.props
    }
  }
  get theme(): any { return this.appBarJson.theme || {} }
  get layout(): Required<IStateAppBar>['layout'] {
    return this.appBarLayout
      || (this.appBarLayout = (
            this.appBarJson.layout && this.appBarJson.layout.length > 0
          ) ? this.appBarJson.layout
            : ['logo','space','menu']
          )
  }
  get logoTag(): Required<IStateAppBar>['logoTag'] {
    return this.appBarJson.logoTag || 'img'
  }
  get toolbarProps(): Required<IStateAppBar>['toolbarProps'] {
    return this.appBarJson.toolbarProps || {}
  }
  get logoProps(): any { return this.appBarJson.logoProps || {} }

  get menuIconProps(): IconButtonProps {
    return {
      size: 'large',
      edge: 'start',
      color: 'inherit',
      'aria-label': 'open drawer',
      sx: { mr: 2 },
      ...this.appBarJson.menuIconProps
    }
  }

  get searchFieldProps(): any {
    return {
      placeholder: 'Search…',
      inputProps: { 'aria-label': 'search' },
      ...this.appBarJson.searchFieldProps
    }
  }

  get desktopMenuItemsProps(): Required<IStateAppBar>['desktopMenuItemsProps'] {
    return {
      sx : { display: { xs: 'none', md: 'flex' } },
      ...this.appBarJson.desktopMenuItemsProps
    }
  }

  get mobileMenuItemsProps(): Required<IStateAppBar>['mobileMenuItemsProps'] {
    return {
      sx : { display: { xs: 'flex', md: 'none' } },
      ...this.appBarJson.mobileMenuItemsProps
    }
  }

  get mobileMenuIconProps(): Required<IStateAppBar>['mobileMenuIconProps'] {
    return this.appBarJson.mobileMenuIconProps || {}
  }

  get menuItemsProps(): any {
    return {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      keepMounted: true,
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      ...this.appBarJson.menuItemsProps
    }
  }

  get logoTheme(): any { return this.appBarJson.logoTheme || {} }

  get hasLogo (): boolean {
    return Object.keys(this.logoProps).length > 0
  }

  get textLogoProps(): any {
    return {
      variant: 'h6',
      noWrap: true,
      component: 'div',
      sx: { display: { xs: 'none', sm: 'block' } },
      ...this.appBarJson.textLogoProps
    }
  }

  /**
  * Get appbar icon objects.
  */
  get items(): StateLink<this>[] {
    return this.appBarItems || (
      this.appBarItems = this.appBarJson.items.map(
        item => new StateLink(item, this)
      )
    )
  }

  /**
  * Chain-access to appbar background definition.
  */
  get background(): StateAppBarBackground<P> {
    return this.appBarBackground
      || (this.appBarBackground = new StateAppBarBackground<P>(
        this.appBarBackgroundJson,
        this
      ))
  }

  /**
  * Chain-access to typography definition.
  */
  get typography(): StateAppBarTypography<P> {
    return this.appBarTypography
      || (this.appBarTypography = new StateAppBarTypography<P>(
        this.appBarTypographyJson,
        this
      ))
  }

  getComponentItem(c: string): StateComponent<this>[] {
    if (this.appBarComponents[c]) {
      return this.appBarComponents[c]
    }
    if (this.appBarComponentsJson[c]) {
      return this.appBarComponents[c] = this.appBarComponentsJson[c].map(
        comp => new StateComponent(comp, this)
      )
    }
    return []
  }

} // END class StateAppBar --------------------------------------------------
