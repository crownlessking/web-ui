import React from 'react';
import { styled } from '@mui/material/styles';
import Appbar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import StatePage from '../../controllers/StatePage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, redux } from '../../state';
import StatePageAppbarMidSearch from '../../controllers/templates/StatePageAppbarMidSearch';
import StateJsxLogo from './state.jsx.logo';
import AppbarButton from '../link';
import InputAdornment from '@mui/material/InputAdornment';
import { StateJsxIcon } from '../state.jsx.icons';
import Menu from '@mui/material/Menu';
import StateLink from '../../controllers/StateLink';
import StateJsxChip from './state.jsx.chip';
import { appbarQueriesSet } from 'src/slices/appbarQueries.slice';
import StateAppbarQueries from 'src/controllers/StateAppbarQueries';
import { drawerOpen } from '../../slices/drawer.slice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  border: `2px solid ${theme.palette.grey[300]}`,
  backgroundColor: theme.palette.grey[300],
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 500,
  },
}));

const UrlIconWrapper = styled('div')(({ theme }) => ({
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
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function StateJsxMidSearchAppbar({ def: page }: { def: StatePage; }) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const appbar = new StatePageAppbarMidSearch(page.appbarJson, page);
  const chips = useSelector((rootState: RootState) => rootState.chips);
  const route = page.parent.parent.app.route;
  appbar.configure({ chips, route, template: page._key });
  const dispatch = useDispatch<AppDispatch>();
  const queries = new StateAppbarQueries(
    useSelector((rootState: RootState) => rootState.appbarQueries)
  );
  const value = queries.alwaysGet(route).value;

  const handleSearchfieldOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(appbarQueriesSet({ route, value: e.target.value }));
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      appbar.searchFieldIconButton.onClick(redux)(e);
    }
  };

  const handleDrawerOpen = () => {
    dispatch(drawerOpen());
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={appbar.mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {appbar.items.map((item, i) => (
        <AppbarButton def={item} key={`nav-menu-${i}`} />
      ))}
    </Menu>
  );

  const appbarChips = appbar.chips;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Appbar {...appbar.props} position="fixed">
        <Toolbar>
          {appbar.parent.hasDrawer ? (
            <IconButton
              {...appbar.menuIconProps}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          ) : ( null )}
          {appbar.hasLogo ? (
            <StateJsxLogo def={appbar} />
          ) : (
            <Typography
              sx={{
                fontFamily: appbar.typography.fontFamily,
                color: appbar.typography.color
              }}
              {...appbar.textLogoProps}
            >
              { page.parent.parent.app.title }
            </Typography>
          )}
          <Search {...appbar.searchFieldProps}>
            {appbarChips.length < 1 ? (
              <UrlIconWrapper>
                <StateJsxIcon def={appbar.searchFieldIcon} />
              </UrlIconWrapper>
            ) : ( null )}
            <StyledInputBase
              {...appbar.inputBaseProps}
              startAdornment={appbar.inputHasChips ? (
                <InputAdornment position='start'>
                  <StateJsxChip def={appbarChips} />
                </InputAdornment>
              ) : ( null )}
              endAdornment={
                <InputAdornment position='end'>
                  {value ? (
                    <AppbarButton def={new StateLink({
                      'type': 'icon',
                      'has': {
                        'icon': 'clear_outline',
                        'iconProps': { 'color': 'error', 'fontSize': 'small' },
                      },
                      'onClick': ({ store, actions }) => () => {
                        store.dispatch(actions.appbarQueriesDelete(route));
                        const inputId = appbar.inputBaseProps.id;
                        if (inputId) {
                          document.getElementById(inputId)?.focus();
                        }
                      }
                    })} />
                  ): ( null )}
                  <AppbarButton def={appbar.searchFieldIconButton} />
                </InputAdornment>
              }
              onChange={handleSearchfieldOnChange}
              onKeyDown={handleOnKeyDown}
              value={value}
            />
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {appbar.items.map((item, i) => (
              <AppbarButton def={item} key={`nav-menu-${i}`} />
            ))}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={appbar.mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Appbar>
      { renderMobileMenu }
    </Box>
  );
}
