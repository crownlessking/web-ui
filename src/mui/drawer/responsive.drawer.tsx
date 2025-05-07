import {
  Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar
} from '@mui/material';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import StateDrawerResponsive from 'src/controllers/templates/StateDrawerResponsive';
import store, { RootState, actions } from 'src/state';
import { Link as RouterLink } from 'react-router-dom';
import { get_formatted_route } from 'src/controllers/StateLink';
import { StateJsxIcon } from '../state.jsx.icons';

interface IResDrawerProps {
  def: StateDrawerResponsive;
}

export default function ResponsiveDrawer({ def: drawer }: IResDrawerProps) {
  const open = useSelector((state: RootState) => state.drawer.open);

  const drawerContent = (
    <Fragment>
      { !drawer.parent.hideAppbar && drawer.parent.hasAppbar ? (
        <Fragment>
          <Toolbar />
          <Divider />
        </Fragment>  
      ) :
        ( null ) }
      <List>
        { drawer.items.map((item, i) => (
          <ListItem
            key={i + 1}
            button
            onClick={item.onClick({store, actions, route: item.has.route})}
            component={RouterLink as any}
            to={get_formatted_route(item.has)}
          >
            <ListItemIcon>
              <StateJsxIcon def={item.has} />
            </ListItemIcon>
            <ListItemText primary={item.has.state.text} />
          </ListItem>
        )) }
      </List>
    </Fragment>
  );

  return (
    <Fragment>
      {/*
        The implementation can be swapped with js to avoid SEO duplication of
        links.
      */}
      <Drawer
        {...drawer.props}
        open={open}
      >
        { drawerContent }
      </Drawer>
      <Drawer {...drawer.propsPermanent}>
        { drawerContent }
      </Drawer>
    </Fragment>
  );
}
