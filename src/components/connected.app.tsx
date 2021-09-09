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
import StatePage, { HARD_CODED_PAGE } from '../state/pages/page.controller'
import { postReqState } from '../state/net'

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
  onPostReqState: (endpoint: string, body: RequestInit['body']) => void
}

/**
 * Redux connected App
 */
class App extends Component<IProps> {

  private pageID?: string
  private root?: State

  /**
   * TODO Perform a successful post request to origin to retrieve a valid page
   *      if one was not provided as default.
   *      that means that the action `postReqState` has to be working as
   *      intended.
   */
  onPostReqHomePageState = () => {
    this.props.onPostReqState('', '{}')
  }

  componentDidMount() {
    if (this.root) {
      const app = this.root.app

      // Get a page from server if none was provided.
      if (app.originIsValid() && this.pageID === HARD_CODED_PAGE) {
        this.onPostReqHomePageState()
      }
    }
  }

  render() {
    this.root = new State(this.props.state)
    const page = this.root.allPages.pageAt(this.root.app.route)
    this.pageID = page._id
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

  LocalPage = ({ page }:{ page: StatePage }) => { }

}  // END App class

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App))
