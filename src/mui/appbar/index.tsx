import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import MoreIcon from '@mui/icons-material/MoreVert'
import StatePage from '../../controllers/StatePage'
import _ from 'lodash'
import ThemeParser from '../../controllers/ThemeParser'
import { setAppBarLayout } from './controller'
import Logo from './logo'
import AppBarIcon from '../link'
import AppBarIconText from '../link/text'

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
  const parse = new ThemeParser({ alpha }).getParser()

  const LogoWrapper = styled('div')(({ theme }) => (_.extend({
    // [TODO] insert default logo wrapper theme here
  }, parse(theme, appbar.logoTheme))))

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)

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
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {appbar.items.map((menu, i) => (
        <MenuItem>
          <AppBarIcon key={`mobile-icon-${i}`} def={menu} />
          <AppBarIconText key={`mobile-icon-${i}-text`} def={menu} />
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar {...appbar.props}>
        <Toolbar {...appbar.toolbarProps}>
          <IconButton {...appbar.menuIconProps}>
            <MenuIcon />
          </IconButton>
          {
            setAppBarLayout(
              appbar.layout,
              <React.Fragment key='logo'>
                {appbar.hasLogo ? (
                  <LogoWrapper>
                    <Logo def={page} />
                  </LogoWrapper>
                ) : (
                  <Typography {...appbar.textLogoProps}>{ app.title }</Typography>
                )}
              </React.Fragment>,
              <React.Fragment key='search'>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase {...appbar.searchFieldProps} />
                </Search>
              </React.Fragment>,
              <React.Fragment key='menu'>
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
              </React.Fragment>,
              <React.Fragment key='box'>
                <Box sx={{ flexGrow: 1 }} />
              </React.Fragment>,
              <React.Fragment key='custom'>
                {appbar.components.map((c, i) => {
                  const Comp = styled(c.tag)(
                    ({ theme }) => parse(theme, c.theme)
                  )
                  return <Comp key={`custom-${i}`} {...c.props} />
                })}
              </React.Fragment>
            )
          }
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
