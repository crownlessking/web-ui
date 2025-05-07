import Appbar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import StatePage from '../../controllers/StatePage';
import { AppDispatch } from '../../state';
import AppbarButton from '../link';
import StateJsxLogo from './state.jsx.logo';

interface IJsonBasicAB {
  def: StatePage;
}

export default function StateJsxBasicAppbar({ def: page }: IJsonBasicAB) {
  const { appbar } = page;
  const dispatch = useDispatch<AppDispatch>();

  const handleDrawerOpen = () => {
    dispatch({ type: 'drawer/drawerOpen' });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Appbar
        {...appbar.props}
        position="fixed"
      >
        <Toolbar {...appbar.toolbarProps}>
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
          {appbar.items.map((item, i) => (
            <AppbarButton def={item} key={`nav-menu-${i}`} />
          ))}
        </Toolbar>
      </Appbar>
    </Box>
  );
}