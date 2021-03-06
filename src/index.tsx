import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import store from './state'
import { appUrlPageUpdate } from './slices/app.slice'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={createTheme(store.getState().theme)}>
        <Router><App /></Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// A solution to make the browser's forward and back buttons work.
// see https://stackoverflow.com/questions/17071361/browser-back-and-forward-button-events-without-a-jquery-plugin
window.addEventListener('popstate', e => {
  store.dispatch(appUrlPageUpdate(window.location.pathname))
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
