import Box from '@mui/material/Box'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import HamburgerIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import StatePage from '../../controllers/StatePage'
import AppBarButton from '../link'
import StateJsxLogo from './state.jsx.logo'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../state'
import { styled } from '@mui/material/styles'
import { get_drawer_width } from '../../state'

interface IJsonBasicAB {
  def: StatePage
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: get_drawer_width(),
    width: `calc(100% - ${get_drawer_width()}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function StateJsxMiniAppBar({ def: page }: IJsonBasicAB) {
  const { appBar } = page
  const open = useSelector((state: RootState) => state.drawer.open)
  const dispatch = useDispatch<AppDispatch>()

  const handleDrawerOpen = () => {
    dispatch({ type: 'drawer/drawerOpen' })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        {...appBar.props}
        position='fixed'
        open={open}
      >
        <Toolbar {...appBar.toolbarProps}>
          {appBar.parent.hasDrawer ? (
            <IconButton
              {...appBar.menuIconProps}
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
              onClick={handleDrawerOpen}
            >
              <HamburgerIcon />
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
          {appBar.items.map((item, i) => (
            <AppBarButton def={item} key={`nav-menu-${i}`} />
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
