import React from 'react'
import classNames from 'classnames'
import {
  IconButton, ListItem, ListItemText, ListItemIcon, withStyles, Theme,
  createStyles, WithStyles
} from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
// import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
// import Divider from '@material-ui/core/Divider'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { IState, IStateLink } from '../../interfaces'
import { closeDrawer, openDrawer } from './actions'
import { connect } from 'react-redux'
import { getDrawerWidth } from './controller'
import store from '../../state'
import actions from '../../state/actions'
import { getFormattedRoute } from '../../controllers'
import { Link as RouterLink } from 'react-router-dom'
import JsonIcon from '../json.icons'
import StatePage from '../../state/pages/page.controller'

const styles = (theme: Theme) => createStyles({
  drawer: {
    width: getDrawerWidth(),
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: getDrawerWidth(),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    borderRight: 0,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    // ...theme.mixins.toolbar,
  },
  drawerPaper: {
    overflowY: 'hidden',
  },

  list: {
    overflowY: 'auto',
    overflowX: 'hidden'
  },

  hiddenChevron: {
    width: 64,
    minHeight: 64
  }
})

const mapStateToProps = (state: IState) => ({
  open: state.drawer.open,
})

const mapDispatchToProps = {
  onCloseDrawer: closeDrawer,
  onOpenDrawer: openDrawer
}

interface IProps extends WithStyles<typeof styles> {
  onCloseDrawer: ()=>void
  onOpenDrawer: ()=>void
  open: boolean
  def: StatePage // {stateApp: IStateApp, statePage: IStatePage}
  theme: Theme
}

class MiniDrawer extends React.Component<IProps, { open: boolean }> {

  constructor(props: any) {
    super(props)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
  }

  handleDrawerOpen = () => {
    this.props.onOpenDrawer()
  }

  handleDrawerClose = () => {
    this.props.onCloseDrawer()
  }

  render() {
    const { classes, open, def: page, theme } = this.props
    const items = page.drawer.items

    return (
      <Drawer
        variant='permanent'
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        PaperProps={{
          classes: { root: classes.drawerPaper }
        }}
        open={open}
      >
        { !page.hideAppBar && page.hasAppBar ? (
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
        ) :
        ( null ) }
        <List classes={{ root: classes.list }}>
          { items.map((item, index) => (
            <ListItem
              key={index + 1}
              button
              onClick={item.onClick({store, actions})}
              component={RouterLink as any}
              to={getFormattedRoute(item)}
            >
              <ListItemIcon>
                <JsonIcon json={item} faProps={{ size: 'lg' }} />
              </ListItemIcon>
              <ListItemText primary={item.has.json.text} />
            </ListItem>
          )) }
        </List>
      </Drawer>
    )
  } // END render()

}

/**
 * Custom icon implementation for `drawer`.
 *
 * <JsonDrawerIcon key={index+1} json={item} />
 * @param props 
 */
export function JsonDrawerIcon ({ json }: { json: IStateLink }) {
  const has = json.has || {}
  return (
    <ListItemIcon
      color='inherit'
      aria-label={has.label}
    >
      <JsonIcon json={json} />
    </ListItemIcon>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)
                  (withStyles(styles, { withTheme: true })(MiniDrawer))
