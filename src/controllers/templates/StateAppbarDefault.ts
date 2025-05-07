import { AppBarProps, IconButtonProps } from '@mui/material';
import IStateAppbar from '../../interfaces/IStateAppbar';
import State from '../State';
import StateAppbar from '../StateAppbar';
import StateAppbarBackground from './StateAppbarBackground';
import StateAppbarTypography from './StateAppbarTypography';

export default class StateAppbarDefault
  extends StateAppbar<State> implements IStateAppbar
{
  get props(): AppBarProps {
    return {
      ...this.appbarState.props
    };
  }

  get logoTag(): Required<IStateAppbar>['logoTag'] {
    return this.appbarState.logoTag || 'div';
  }
  get toolbarProps(): Required<IStateAppbar>['toolbarProps'] {
    return this.appbarState.toolbarProps || {};
  }
  get logoProps(): any { return this.appbarState.logoProps; }

  get menuIconProps(): IconButtonProps {
    return {
      size: 'large',
      edge: 'start',
      color: 'inherit',
      'aria-label': 'open drawer',
      sx: { mr: 2, color: this.typography.color },
      ...this.appbarState.menuIconProps
    };
  }

  get searchFieldProps(): any {
    return {
      placeholder: 'Search…',
      inputProps: { 'aria-label': 'search' },
      ...this.appbarState.searchFieldProps
    };
  }

  get desktopMenuItemsProps(): Required<IStateAppbar>['desktopMenuItemsProps'] {
    return {
      sx : { display: { xs: 'none', md: 'flex' } },
      ...this.appbarState.desktopMenuItemsProps
    };
  }

  get desktopMenuItems2Props(): Required<IStateAppbar>['desktopMenuItems2Props'] {
    return {
      ...this.desktopMenuItemsProps,
      ...this.appbarState.desktopMenuItems2Props
    };
  }

  get mobileMenuItemsProps(): Required<IStateAppbar>['mobileMenuItemsProps'] {
    return {
      sx : { display: { xs: 'flex', md: 'none' } },
      ...this.appbarState.mobileMenuItemsProps
    };
  }

  get mobileMenuItems2Props(): Required<IStateAppbar>['mobileMenuItems2Props'] {
    return {
      ...this.mobileMenuItemsProps,
      ...this.appbarState.mobileMenuItems2Props
    };
  }

  get mobileMenuIconProps(): Required<IStateAppbar>['mobileMenuIconProps'] {
    return this.appbarState.mobileMenuIconProps || {};
  }

  get mobileMenuIcon2Props(): Required<IStateAppbar>['mobileMenuIcon2Props'] {
    return this.appbarState.mobileMenuIcon2Props || {};
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
      ...this.appbarState.mobileMenuProps
    };
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
      ...this.appbarState.mobileMenu2Props
    };
  }

  get menuId(): string {
    return this.appbarState.menuId || 'primary-search-account-menu';
  }

  get mobileMenuId(): string {
    return this.appbarState.mobileMenuId || 'primary-menu-mobile';
  }

  get mobileMenu2Id(): string {
    return this.appbarState.mobileMenu2Id || 'primary-menu2-mobile';
  }

  get menuItemsSx(): any { return this.appbarState.menuItemsSx; }

  get textLogoProps(): any {
    return {
      variant: 'h6',
      noWrap: true,
      component: 'div',
      sx: {
        display: { xs: 'none', sm: 'block' },
        color: this.typography.color
      },
      ...this.appbarState.textLogoProps
    };
  }

  get logoContainerProps(): any {
    return {
      ...this.appbarState.logoContainerProps,
      sx: {
        flexGrow: 1,
        ...this.appbarState.logoContainerProps?.sx
      },
    };
  }

  /**
   * Chain-access to appbar background definition.
   */
  get background(): StateAppbarBackground<State> {
    return this.appbarBackground
      || (this.appbarBackground = new StateAppbarBackground<State>(
        this.appbarBackgroundState,
        this
      ));
  }

  /**
   * Chain-access to typography definition.
   */
  get typography(): StateAppbarTypography<State> {
    return this.appbarTypography
      || (this.appbarTypography = new StateAppbarTypography<State>(
        this.appbarTypographyState,
        this
      ));
  }

}
