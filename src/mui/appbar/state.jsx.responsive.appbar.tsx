import * as React from 'react';
import Appbar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StateJsxMenuIcon from './state.jsx.menuicon.appbar';
import StatePage from '../../controllers/StatePage';

interface IJRAppbarProps {
  def: StatePage;
}

// const drawerWidth = 240;
const navItems = [ 'Home', 'About', 'Contact' ];

export default function StateJsxResponsiveAppbar({ def: page }: IJRAppbarProps) {
  const { appbar } = page;
  const [ mobileOpen, setMobileOpen ] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  // const drawer = (
  //   <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
  //     <Typography variant="h6" sx={{ my: 2 }}>
  //       MUI
  //     </Typography>
  //     <Divider />
  //     <List>
  //       {navItems.map((item) => (
  //         <ListItem key={item} disablePadding>
  //           <ListItemButton sx={{ textAlign: 'center' }}>
  //             <ListItemText primary={item} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );

  return (
    <Box sx={{ display: 'flex' }}>
      <Appbar component="nav">
        <Toolbar>
          <StateJsxMenuIcon def={appbar} toggle={handleDrawerToggle} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Appbar>
    </Box>
  );
}