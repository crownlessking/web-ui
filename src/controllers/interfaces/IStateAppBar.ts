import { AppBarProps, ToolbarProps, IconButtonProps, BoxProps } from '@mui/material'
import StateComponent from '../StateComponent'
import IAbstractState from './IAbstractState'
import IStateBackground from './IStateBackground'
import IStateLink from './IStateLink'
import IStateTypography from './IStateTypography'

export default interface IStateAppBar extends IAbstractState {
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
