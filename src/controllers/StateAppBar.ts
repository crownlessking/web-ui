import { AppBarProps, BoxProps, IconButtonProps, ToolbarProps } from '@mui/material'
import AbstractState, { IAbstractState } from './AbstractState'
import State from './State'
import StateAppBarBackground from './StateAppBarBackground'
import StateAppBarTypography from './StateAppBarTypography'
import { IStateBackground } from './StateBackground'
import StateComponent from './StateComponent'
import StateLink, { IStateLink } from './StateLink'
import { IStateTypography } from './StateTypography'

export interface IStateAppBar extends IAbstractState {
  /** navigation layout */
  layout?: ('logo' | 'search' | 'menu' | 'space' | 'components')[]
  /** mui5 logo tag. i.e. "img" */
  logoTag?: keyof JSX.IntrinsicElements
  /** app bar component props */
  props?: AppBarProps
  /** toolbar component props */
  toolbarProps?: ToolbarProps
  /** hamburger icon props */
  menuIconProps?: IconButtonProps
  logoProps?: any
  /** mui5 text-logo props */
  textLogoProps?: any
  searchFieldProps?: any
  /** (Desktop) props for box grouping the menu link */
  desktopMenuItemsProps?: BoxProps
  /** (Mobile) props for box grouping the menu link */
  mobileMenuItemsProps?: BoxProps
  /** when web page is in mobile view, this icon will show */
  mobileMenuIconProps?: IconButtonProps
  /** each individual items */
  menuItemsProps?: any
  /** mui5 logo wrapper styles */
  logoTheme?: any
  /** Appbar background color, image, gradient... etc. */
  background?: IStateBackground
  /** Appbar font color and family. */
  typography?: IStateTypography
  /** Appbar icons and links. */
  items: IStateLink[]
  /**
   * If `true`, the background of the appbar defined at the root state (`IState`)
   * will be used.
   */
  useDefaultBackground?: boolean
  /** The route of the page with a valid appbar background. */
  backgroundInherited?: string
  /**
   * If `true`, the typography of the appbar defined at the root state
   * (`IState`) will be used.
   */
  useDefaultTypography?: boolean
  /** The route of the page with a valid appbar typography. */
  typographyInherited?: string
  /**
   * There are times when the available options are not enough.
   * With this function, you can insert a JSON defined components
   * into existing component to customize them even further.
   */
   components?: StateComponent[]
}

export interface IStateAppBarSearches {
  [pageName: string]: string
}

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
  protected appBarComponents?: StateComponent<this>[]

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

  /** Get a copy of the `appBar` json. */
  get json() { return this.appBarJson }
  /** Chain-access to root definition. */
  get parent() { return this.parentObj }
  get props(): AppBarProps {
    return {
      position: 'static',
      ...this.appBarJson.props
    }
  }
  get theme() { return this.appBarJson.theme || {} }
  get layout() {
    return this.appBarLayout
      || (this.appBarLayout = (
            this.appBarJson.layout && this.appBarJson.layout.length > 0
          ) ? this.appBarJson.layout
            : ['logo','space','menu']
          )
  }
  get logoTag() { return this.appBarJson.logoTag || 'img' }
  get toolbarProps() {
    return this.appBarJson.toolbarProps || {}
  }
  get logoProps() { return this.appBarJson.logoProps || {} }

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

  get searchFieldProps() {
    return {
      placeholder: 'Search…',
      inputProps: { 'aria-label': 'search' },
      ...this.appBarJson.searchFieldProps
    }
  }

  get desktopMenuItemsProps() {
    return {
      sx : { display: { xs: 'none', md: 'flex' } },
      ...this.appBarJson.desktopMenuItemsProps
    }
  }

  get mobileMenuItemsProps() {
    return {
      sx : { display: { xs: 'flex', md: 'none' } },
      ...this.appBarJson.mobileMenuItemsProps
    }
  }

  get mobileMenuIconProps() {
    return this.appBarJson.mobileMenuIconProps || {}
  }

  get menuItemsProps() {
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

  get logoTheme() { return this.appBarJson.logoTheme || {} }

  get hasLogo () {
    return Object.keys(this.logoProps).length > 0
  }

  get textLogoProps() {
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

  get components() {
    return this.appBarComponents || (
      this.appBarComponents = (this.appBarJson.components || []).map(
        c => new StateComponent(c, this)
      )
    )
  }

} // END class StateAppBar --------------------------------------------------
