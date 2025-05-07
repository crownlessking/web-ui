import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StatePageAppbar from '../../controllers/templates/StatePageAppbar';

interface IJsonMIProps {
  def: StatePageAppbar;
  toggle: () => void;
}

/**
 * If a drawer is defined for the current page then it will take priority.
 * However, there's a new system in place which generates a drawer to display
 * app bar links in mobile view.
 * That system is referred as the "default drawer" and it is not recorgnized as
 * a user-defined drawer.
 * To make use of the default drawer, the flag, `generateDefaultDrawer` needs
 * to be set to `true`.
 */
export default function StateJsxMenuIcon ({ def: appbar, toggle }: IJsonMIProps) {
  if (appbar.parent.hasDrawer) {
    return (
      <IconButton {...appbar.menuIconProps}>
        <MenuIcon />
      </IconButton>
    );
  }

  if (appbar.parent.generateDefaultDrawer) {
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
    );
  }

  return ( null );
}
