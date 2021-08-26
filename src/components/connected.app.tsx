import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  createStyles, CssBaseline, Theme, withStyles, WithStyles
} from '@material-ui/core'
import { IState } from '../interfaces'
import Navigation from './navigation.component'
import Layout from './layout.component'
import Content from './content.component'
import { Background } from '../material/background'
import Dialog from '../material/dialog'
import Drawer from './drawer.component'
import State from '../state/controller'
import Spinner from './spinner.component'
import Snackbar from '../material/snackbar'

// https://material-ui.com/guides/typescript/#usage-of-withstyles
const styles = ({ spacing }: Theme) => createStyles({
  root: {
    display: 'flex',
    height: 'inherit',
  },
  button: {
    margin: spacing(1),
  },
  rightIcon: {
    marginLeft: spacing(1),
  },
  textField: {
    marginLeft: spacing(1),
    marginRight: spacing(1),
    width: 300,
  },
})

interface IProps extends WithStyles<typeof styles> { state: IState }

const mapStateToProps = (state: IState) => ({ state })

/**
 * Redux connected App
 */
class App extends Component<IProps> {

  render() {
    const root = new State(this.props.state)
    const page = root.allPages.pageAt(root.app.route)
    page.setTabTitle()
    const { classes } = this.props
    return (
      <React.Fragment>
        <Background def={page.background} />
        <div className={classes.root}>
          <CssBaseline />
          <Navigation def={page} />
          <Drawer def={page} />
          <Layout def={page}>
            <Content def={page} />
          </Layout>
        </div>
        <Dialog pageDef={page} />
        <Snackbar />
        <Spinner />
      </React.Fragment>
    )
  }

}  // END App class

export default connect(mapStateToProps)(withStyles(styles)(App))
