import React from 'react'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import MenuIcon from '@mui/icons-material/Menu'
import MoreIcon from '@mui/icons-material/MoreVert'
import StatePage from '../../controllers/StatePage'
import { useDispatch, useSelector } from 'react-redux'
import store, { actions, AppDispatch, RootState } from '../../state'
import StatePageAppBarMidSearch from '../../controllers/templates/StatePageAppBarMidSearch'
import StateJsxLogo from './state.jsx.logo'
import AppBarButton from '../link'
import InputAdornment from '@mui/material/InputAdornment'
import StateJsxIcon from '../state.jsx.icons'
import { get_search_query } from 'src/state/_errors.business.logic'
import Menu from '@mui/material/Menu'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20, // theme.shape.borderRadius,
  border: `2px solid ${theme.palette.grey[300]}`,
  backgroundColor: theme.palette.grey[300],
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 500,
  },
}))

const UrlIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))

interface IJsonMidSearchAB { def: StatePage }

export default function StateJsxMidSearchAppBar({ def: page }: IJsonMidSearchAB) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const appBar = new StatePageAppBarMidSearch(page.appBarJson, page)
  const dispatch = useDispatch<AppDispatch>()
  const route = page.parent.parent.app.route
  const queries = useSelector((state: RootState) => state.appBarQueries)
  const value = get_search_query(queries, route)

  const handleSearchfieldOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'appBarQueries/appBarQueriesSet',
      payload: {
        route,
        value: e.target.value
      }
    })
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      appBar.searchFieldIconButton.onClick({ store, actions })(e)
    }
  }

  const handleDrawerOpen = () => {
    dispatch({ type: 'drawer/drawerOpen' })
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={appBar.mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
        {appBar.items.map((item, i) => (
          <AppBarButton def={item} key={`nav-menu-${i}`} />
        ))}
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar {...appBar.props} position="fixed">
        <Toolbar>
          {appBar.parent.hasDrawer ? (
            <IconButton
              {...appBar.menuIconProps}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          ) : ( null )}
          {appBar.hasLogo ? (
            <StateJsxLogo def={appBar} />
          ) : (
            <Typography
              sx={{
                fontFamily: appBar.typography.fontFamily,
                color: appBar.typography.color
              }}
              {...appBar.textLogoProps}
            >
              { page.parent.parent.app.title }
            </Typography>
          )}
          <Search>
            {appBar.state.searchFieldIcon ? (
              <UrlIconWrapper>
                <StateJsxIcon def={appBar.searchFieldIcon} />
              </UrlIconWrapper>
            ) : ( null )}
            <StyledInputBase
              {...appBar.inputBaseProps}
              endAdornment={
                <InputAdornment position='end'>
                  <AppBarButton def={appBar.searchFieldIconButton} />
                </InputAdornment>
              }
              onChange={handleSearchfieldOnChange}
              onKeyDown={handleOnKeyDown}
              value={value}
            />
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {appBar.items.map((item, i) => (
              <AppBarButton def={item} key={`nav-menu-${i}`} />
            ))}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={appBar.mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      { renderMobileMenu }
    </Box>
  )
}
