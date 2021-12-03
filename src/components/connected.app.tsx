import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  createStyles, CssBaseline, Theme, withStyles, WithStyles
} from '@material-ui/core'
import { IState } from '../interfaces'
import Navigation from './navigation.component'
import Layout from './layout.component'
import Content from './content.component'
import { Background } from '../mui4/background'
import Dialog from '../mui4/dialog'
import Drawer from './drawer.component'
import State from '../controllers/State'
import Spinner from './spinner.component'
import Snackbar from '../mui4/snackbar'
import StatePage from '../controllers/StatePage'
import { postReqState } from '../state/net'
import { getBootstrapKey } from '../state/app'

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

const mapStateToProps = (state: IState) => ({ state })

const mapDispatchToProps = {
  onPostReqState: postReqState
}

interface IProps extends WithStyles<typeof styles> {
  state: IState
  onPostReqState: (
    endpoint: string,
    body: RequestInit['body'],
    headers?: RequestInit['headers']
  ) => void
}

/**
 * Redux connected App
 */
class App extends Component<IProps> {
  private pageID?: string
  private root?: State

  /** Get a page from server. */
  onPostReqHomePageState = () => {
    const key = getBootstrapKey()

    if (this.root && key) {
      const headers = this.root.net.headers
      this.props.onPostReqState(key, '', headers)
    }
  }

  componentDidMount() {

    // Get a page from server if none was provided.
    if (this.pageID === StatePage.HARD_CODED_PAGE) {
      this.onPostReqHomePageState()
    }
  }

  render() {
    this.root = new State(this.props.state)
    const page = this.root.allPages.pageAt(this.root.app.route)
    this.pageID = page._id
    const { classes } = this.props

    page.setTabTitle()

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App))
