import React, { Component } from 'react'
import { AppBar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles'
import classNames from 'classnames'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import { IState } from '../../interfaces'
import AppBarIcon from '../link'
import { openDrawer } from '../drawer/actions'
import { connect } from 'react-redux'
import { getDrawerWidth } from '../drawer/controller'
import StatePage from '../../state/pages/page.controller'
import StateLink from '../link/controller'

const drawerWidth = getDrawerWidth()

const styles = ({transitions, zIndex, breakpoints}: Theme) => createStyles({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    // background: getBackgroundColor(),
    zIndex: zIndex.drawer + 1,
    transition: transitions.create(['width', 'margin'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: transitions.create(['width', 'margin'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  logo: { // https://stackoverflow.com/questions/40450778/how-do-i-display-an-image-on-left-of-material-ui-appbar-but-retain-the-hamburg
    maxWidth: 160,
  },
  textLogoWrapper: {
    display: 'none',
    [breakpoints.up('sm')]: {
      display: 'block',
    },
    flexGrow: 1
  },
  appBarPaddingRightAdjust: { width: '20px', height: '48px' }
})

const mapStateToProps = (state: IState) => ({
  open: state.drawer.open,
})

const mapDispatchToProps = {
  onOpenDrawer: openDrawer
}

export interface IProps extends WithStyles<typeof styles> {
  open: boolean
  onOpenDrawer: () => void
  def: StatePage
}

class AppBarCustomized extends Component<IProps> {

  constructor(props: any) {
    super(props)
    this.onOpenDrawer = this.onOpenDrawer.bind(this)
  }

// <Toolbar variant='dense' disableGutters={!open}>
  render() {
    const {def: page, classes, open} = this.props
    const app = page.parent.parent.app.json
    return (
      <AppBar
        position='fixed'
        elevation={0}
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{
          background: page.appBar.background.value,
          color: page.appBar.typography.color,
          fontFamily: page.appBar.typography.fontFamily
        }}
      >
        <Toolbar variant='dense' disableGutters={!open}>
          {
            page.hideDrawer !== true
            ? (<IconButton
                className={classNames(classes.menuButton, {
                  [classes.hide]: open,
                })}
                color='inherit'
                aria-label='Open drawer'
                onClick={this.onOpenDrawer}
              >
                <MenuIcon />
              </IconButton>)
            : ( null )
          }
          <div className={classes.grow}>
          {
            app.logo
            ? (<img src={app.logo} className={classes.logo} />)
            : (
                <div className={classes.textLogoWrapper}>
                  <AppBarIcon
                    def={new StateLink({
                      type: 'textlogo',
                      href: '/',
                      has: {text: app.title},
                    }, this)}
                  />
                </div>
              )
          }
          </div>
          {page.appBar.items.map((item, index) => (
            <AppBarIcon key={index+1} def={item} />
          ))}
          <div className={classes.appBarPaddingRightAdjust} />
        </Toolbar>
      </AppBar>
    )
  }

  private onOpenDrawer = () => {
    const { def: page } = this.props

    if (!page.hideDrawer) {
      this.props.onOpenDrawer()
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppBarCustomized))
