import { Component, Fragment } from 'react'
import { CssBaseline, Theme } from '@mui/material'
import { connect } from 'react-redux'
import {
  createStyles, withStyles, WithStyles
} from '@mui/styles'
import { RootState } from '../state'
import Navigation from './navigation.component'
import Layout from './layout.component'
import Content from './content.component'
import { Background } from '../mui/background'
import Dialog from '../mui/dialog'
import Drawer from './drawer.component'
import State from '../controllers/State'
import Spinner from './spinner.component'
import Snackbar from '../mui/snackbar'
import StatePage from '../controllers/StatePage'
import { postReqState } from '../state/net.controller'
import { getBootstrapKey } from '../state/app.controller'

// https://material-ui.com/guides/typescript/#usage-of-withstyles
const styles = ({ spacing }: Theme) => createStyles({
  root: {
    width: '100%',
    // display: 'flex',
    height: 'inherit',
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

const mapStateToProps = (state: RootState) => ({ state })

const mapDispatchToProps = {
  onPostReqState: postReqState
}

interface IAppProps extends WithStyles<typeof styles> {
  state: RootState
  onPostReqState: typeof mapDispatchToProps['onPostReqState']
}

/**
 * Redux connected App
 */
class App extends Component<IAppProps> {
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
    if (this.pageID === StatePage.PAGE_HARD_CODED) {
      this.onPostReqHomePageState()
    }
  }

  render() {
    this.root = new State(this.props.state)
    const page = this.root.allPages.getPage()
    this.pageID = page._id
    const { classes } = this.props

    page.setTabTitle()

    return (
      <Fragment>
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
      </Fragment>
    )
  }

}  // END App class

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App as any))
