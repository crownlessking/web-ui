// import logo from './logo.svg'
// import './App.css'
import { useEffect } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState, get_bootstrap_key } from './state'
import { post_req_state } from './state/net.actions'
import Config from './config'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import StateAllPages from './controllers/StateAllPages'
import StateApp from './controllers/StateApp'
import StateNet from './controllers/StateNet'
import AppPage from './components/app.component'
import { ALLOWED_ATTEMPTS, BOOTSTRAP_ATTEMPTS } from './constants'

/**
 * Making all FontAwesome 'Regular', 'Solid', and 'Brand' icons available
 * throughout the entire application
 *
 * just do:
 * ```javascript
 * import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 *
 * const icon = <FontAwesomeIcon icon='coffee' />
 * ```
 *
 * @see https://www.npmjs.com/package/@fortawesome/react-fontawesome
 * for more info
 */
library.add(fab, fas, far)

export default function App() {
  const dispatch = useDispatch<AppDispatch>()
  const app = new StateApp(
    useSelector((state: RootState) => state.app)
  )
  const allPages = new StateAllPages(
    useSelector((state: RootState) => state.pages)
  )
  const net = new StateNet(
    useSelector((state: RootState) => state.net)
  )
  const themeState = useSelector((state: RootState) => state.theme)

  useEffect(() => {
    /** Get state from server. */
    const onPostReqHomePageState = () => {
      const key = get_bootstrap_key()
      if (!key) { return }
      const bootstrapAttempts = Config.read<number>(BOOTSTRAP_ATTEMPTS, 0)
      if (bootstrapAttempts < ALLOWED_ATTEMPTS && key) {
        console.log('Bootstrap cookie:', document.cookie)
        dispatch(post_req_state(key, {
          cookie: document.cookie,
        }, net.headers))
        Config.write(BOOTSTRAP_ATTEMPTS, bootstrapAttempts + 1)
      }
    }
    // Get bootstrap state from server if none was provided.
    // Setting `isBootstrapped` to `true` will prevent it.
    if (!app.isBootstrapped) { onPostReqHomePageState() }

  }, [dispatch, net.headers, app.isBootstrapped])

  return (
    <ThemeProvider theme={createTheme(themeState)}>
      <CssBaseline />
      <AppPage def={allPages} />
    </ThemeProvider>
  )
}
