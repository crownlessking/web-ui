import 'babel-polyfill'
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { MuiThemeProvider } from '@material-ui/core'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'typeface-roboto'
import App from './App'
import './index.css'
import store from './state'
import theme from './material/theme'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { urlUpdatePage } from './state/app/actions'

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Route component={App} />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

// A solution to make the browser's forward and back buttons work.
// see https://stackoverflow.com/questions/17071361/browser-back-and-forward-button-events-without-a-jquery-plugin
window.addEventListener('popstate', e => {
  store.dispatch(urlUpdatePage(window.location.pathname))
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
