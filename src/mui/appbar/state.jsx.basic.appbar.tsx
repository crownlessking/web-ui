import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch } from 'react-redux'
import StatePage from '../../controllers/StatePage'
import { AppDispatch } from '../../state'
import AppBarButton from '../link'
import StateJsxLogo from './state.jsx.logo'

interface IJsonBasicAB {
  def: StatePage
}

export default function StateJsxBasicAppBar({ def: page }: IJsonBasicAB) {
  const { appBar } = page
  const dispatch = useDispatch<AppDispatch>()

  const handleDrawerOpen = () => {
    dispatch({ type: 'drawer/drawerOpen' })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        {...appBar.props}
        position="fixed"
      >
        <Toolbar {...appBar.toolbarProps}>
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
          {appBar.items.map((item, i) => (
            <AppBarButton def={item} key={`nav-menu-${i}`} />
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  )
}