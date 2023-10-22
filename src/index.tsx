import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './state'
import { appUrlPageUpdate } from './slices/app.slice'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router><App /></Router>
    </Provider>
  </React.StrictMode>
)

// A solution to make the browser's forward and back buttons work.
// see https://stackoverflow.com/questions/17071361/browser-back-and-forward-button-events-without-a-jquery-plugin
window.addEventListener('popstate', () => {
  store.dispatch(appUrlPageUpdate(window.location.pathname))
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
