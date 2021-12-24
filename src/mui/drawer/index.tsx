import React from 'react'
import classNames from 'classnames'
import {
  IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Theme
} from '@mui/material'
import { createStyles, WithStyles, withStyles } from '@mui/styles'
// import Divider from '@mui/material/Divider'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { IState } from '../../interfaces'
import { closeDrawer, openDrawer } from './actions'
import { connect } from 'react-redux'
import { getDrawerWidth } from '../../controllers/StateDrawer'
import store from '../../state'
import actions from '../../state/actions'
import { getFormattedRoute } from '../../controllers'
import { Link as RouterLink } from 'react-router-dom'
import JsonIcon from '../json.icons'
import StatePage from '../../controllers/StatePage'
import StateLink from '../../controllers/StateLink'

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
          { items.map((item, i) => (
            <ListItem
              key={i + 1}
              button
              onClick={item.onClick({store, actions, route: item.has.route})}
              component={RouterLink as any}
              to={getFormattedRoute(item)}
            >
              <ListItemIcon>
                <JsonIcon def={item} />
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
export function JsonDrawerIcon ({ json }: { json: StateLink }) {
  return (
    <ListItemIcon
      color='inherit'
      aria-label={json.has.json.label}
    >
      <JsonIcon def={json} />
    </ListItemIcon>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)
                  (withStyles(styles, { withTheme: true })(MiniDrawer))
