import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { MuiThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'
import store from './state'
import { createTheme } from '@material-ui/core/styles'
import { urlUpdatePage } from './state/app/actions'
import { BrowserRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiThemeProvider theme={createTheme(store.getState().theme)}>
        <Router>
          <Route component={App} />
        </Router>
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// A solution to make the browser's forward and back buttons work.
// see https://stackoverflow.com/questions/17071361/browser-back-and-forward-button-events-without-a-jquery-plugin
window.addEventListener('popstate', e => {
  store.dispatch(urlUpdatePage(window.location.pathname))
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
