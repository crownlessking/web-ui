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
    origin: string,
    endpoint: string,
    body: RequestInit['body']
  ) => void
}

/**
 * Redux connected App
 */
class App extends Component<IProps> {

  private pageID?: string
  private root?: State

  onPostReqHomePageState = (origin: string) => {
    this.props.onPostReqState(origin, getBootstrapKey(), '{}')
  }

  componentDidMount() {
    if (this.root) {
      const app = this.root.app

      // Get a page from server if none was provided.
      if (this.pageID === StatePage.HARD_CODED_PAGE) {
        this.onPostReqHomePageState(app.origin)
      }
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

  LocalPage = ({ page }:{ page: StatePage }) => { }

}  // END App class

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App))
