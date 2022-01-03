import { useState, Fragment } from 'react'
import {
  alpha, AppBar, Box, Toolbar, IconButton, Typography, InputBase, MenuItem,
  Menu, styled, Theme
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import MoreIcon from '@mui/icons-material/MoreVert'
import StatePage from '../../controllers/StatePage'
import ThemeParser from '../../controllers/ThemeParser'
import Logo from './logo'
import AppBarIcon from '../link'
import AppBarIconText from '../link/text'
import ComponentBuilder from '../../components'
import { makeStyles } from '@mui/styles'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function AppBarMui5({ def: page }:{ def: StatePage }) {

  const app = page.parent.parent.app
  const appbar = page.appBar
  const typography = appbar.typography
  const parse = new ThemeParser({ alpha }).getParser()

  const toolbarClasses = makeStyles((theme: Theme) => ({
    root: parse(theme, {
      ...appbar.theme,
      ...appbar.background.getJss(),
      color: typography.color,
    })
  }))()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  /**
   * Example for when an appbar menu item has a dropdown menu
   * 
   * [TODO] Don't remove yet. At some point you will rename it and use it to
   *        handle menu items that have dropdown menus.
   */
  // eslint-disable-next-line
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  // [TODO] The following set of code is a dropdown example
  //        Remove it only after assimilating it to give
  //        app bar items dropdown menu from their state definition
  const menuId = 'primary-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      {...appbar.menuItemsProps}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {appbar.items.map((menu, i) => (
        <MenuItem key={`mobile-menu-${i}`}>
          <AppBarIcon key={`mobile-icon-${i}`} def={menu} />
          <AppBarIconText key={`mobile-icon-${i}-text`} def={menu} />
        </MenuItem>
      ))}
    </Menu>
  );

  const LayoutFactory = () => {
    const factory: JSX.Element[] = []
    const LogoWrapper = styled('div')(({ theme }) => (
      parse(theme, appbar.logoTheme)
    ))
    for (let i = 0; i < appbar.layout.length; i++) {
      switch (appbar.layout[i]) {
      case 'logo':
        factory.push(
          <Fragment key={`logo-${i}`}>
            {appbar.hasLogo ? (
              <LogoWrapper>
                <Logo def={page} />
              </LogoWrapper>
            ) : (
              <Typography
                style={{ fontFamily: typography.fontFamily }}
                {...appbar.textLogoProps}
              >
                { app.title }
              </Typography>
            )}
          </Fragment>
        )
        break
      case 'search':
        factory.push(
          <Fragment key={`search-${i}`}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase {...appbar.searchFieldProps} />
            </Search>
          </Fragment>
        )
        break
      case 'menu':
        factory.push(
          <Fragment key={`menu-${i}`}>
            <Box {...appbar.desktopMenuItemsProps}>
              {appbar.items.map((menu, i) => (
                <AppBarIcon key={`mobile-icon-${i}`} def={menu} />
              ))}
            </Box>
            <Box {...appbar.mobileMenuItemsProps}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
                {...appbar.mobileMenuIconProps}
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Fragment>
        )
        break
      case 'space':
        factory.push(
          <Fragment key={`space-${i}`}>
            <Box sx={{ flexGrow: 1 }} />
          </Fragment>
        )
        break
      case 'components':
        factory.push(
          <ComponentBuilder
            key={`custom-${i}`}
            def={appbar.components}
            parent={appbar}
          />
        )
      }
    }
    return (
      <Fragment>
        { factory }
      </Fragment>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        {...appbar.props}
      >
        <Toolbar className={toolbarClasses.root} {...appbar.toolbarProps}>
          <IconButton {...appbar.menuIconProps}>
            <MenuIcon />
          </IconButton>
          <LayoutFactory />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
