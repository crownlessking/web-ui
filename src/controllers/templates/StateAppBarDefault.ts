import { AppBarProps, IconButtonProps } from '@mui/material'
import IStateAppBar from '../interfaces/IStateAppBar'
import State from '../State'
import StateAppBar from '../StateAppBar'
import StateAppBarBackground from './StateAppBarBackground'
import StateAppBarTypography from './StateAppBarTypography'

export default class StateAppBarDefault
  extends StateAppBar<State> implements IStateAppBar
{
  get props(): AppBarProps {
    return {
      ...this.appBarState.props
    }
  }

  get logoTag(): Required<IStateAppBar>['logoTag'] {
    return this.appBarState.logoTag || 'div'
  }
  get toolbarProps(): Required<IStateAppBar>['toolbarProps'] {
    return this.appBarState.toolbarProps || {}
  }
  get logoProps(): any { return this.appBarState.logoProps }

  get menuIconProps(): IconButtonProps {
    return {
      size: 'large',
      edge: 'start',
      color: 'inherit',
      'aria-label': 'open drawer',
      sx: { mr: 2, color: this.typography.color },
      ...this.appBarState.menuIconProps
    }
  }

  get searchFieldProps(): any {
    return {
      placeholder: 'Search…',
      inputProps: { 'aria-label': 'search' },
      ...this.appBarState.searchFieldProps
    }
  }

  get desktopMenuItemsProps(): Required<IStateAppBar>['desktopMenuItemsProps'] {
    return {
      sx : { display: { xs: 'none', md: 'flex' } },
      ...this.appBarState.desktopMenuItemsProps
    }
  }

  get desktopMenuItems2Props(): Required<IStateAppBar>['desktopMenuItems2Props'] {
    return {
      ...this.desktopMenuItemsProps,
      ...this.appBarState.desktopMenuItems2Props
    }
  }

  get mobileMenuItemsProps(): Required<IStateAppBar>['mobileMenuItemsProps'] {
    return {
      sx : { display: { xs: 'flex', md: 'none' } },
      ...this.appBarState.mobileMenuItemsProps
    }
  }

  get mobileMenuItems2Props(): Required<IStateAppBar>['mobileMenuItems2Props'] {
    return {
      ...this.mobileMenuItemsProps,
      ...this.appBarState.mobileMenuItems2Props
    }
  }

  get mobileMenuIconProps(): Required<IStateAppBar>['mobileMenuIconProps'] {
    return this.appBarState.mobileMenuIconProps || {}
  }

  get mobileMenuIcon2Props(): Required<IStateAppBar>['mobileMenuIcon2Props'] {
    return this.appBarState.mobileMenuIcon2Props || {}
  }

  get mobileMenuProps(): any {
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
      ...this.appBarState.mobileMenuProps
    }
  }

  get mobileMenu2Props(): any {
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
      ...this.appBarState.mobileMenu2Props
    }
  }

  get menuId(): string {
    return this.appBarState.menuId || 'primary-search-account-menu'
  }

  get mobileMenuId(): string {
    return this.appBarState.mobileMenuId || 'primary-menu-mobile'
  }

  get mobileMenu2Id(): string {
    return this.appBarState.mobileMenu2Id || 'primary-menu2-mobile'
  }

  get menuItemsSx(): any { return this.appBarState.menuItemsSx }

  get textLogoProps(): any {
    return {
      variant: 'h6',
      noWrap: true,
      component: 'div',
      sx: {
        display: { xs: 'none', sm: 'block' },
        color: this.typography.color
      },
      ...this.appBarState.textLogoProps
    }
  }

  get logoContainerProps(): any {
    return {
      ...this.appBarState.logoContainerProps,
      sx: {
        flexGrow: 1,
        ...this.appBarState.logoContainerProps?.sx
      },
    }
  }

  /**
   * Chain-access to appbar background definition.
   */
  get background(): StateAppBarBackground<State> {
    return this.appBarBackground
      || (this.appBarBackground = new StateAppBarBackground<State>(
        this.appBarBackgroundState,
        this
      ))
  }

  /**
   * Chain-access to typography definition.
   */
  get typography(): StateAppBarTypography<State> {
    return this.appBarTypography
      || (this.appBarTypography = new StateAppBarTypography<State>(
        this.appBarTypographyState,
        this
      ))
  }

}
