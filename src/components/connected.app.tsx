import { Component, Fragment } from 'react'
import { CssBaseline } from '@mui/material'
import { connect } from 'react-redux'
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
import { postReqState } from '../state/net.actions'
import { getBootstrapKey } from '../state/state.controller'

const mapStateToProps = (state: RootState) => ({ state })

const mapDispatchToProps = {
  onPostReqState: postReqState
}

interface IAppProps {
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
      this.props.onPostReqState(key, {}, headers)
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

    page.setTabTitle()

    return (
      <Fragment>
        <Background def={page.background} />
        <CssBaseline />
        <Navigation def={page} />
        <Drawer def={page} />
        <Layout def={page}>
          <Content def={page} />
        </Layout>
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
)(App as any)
