import { clear_last_content_jsx } from 'src/business.logic'
import { IRedux } from '../../../state'

export default function toggle_theme_mode (redux: IRedux) {
  return async () => {
    const { dispatch } = redux.store
    const rootState = redux.store.getState()
    const { themeMode } = rootState.app
    const newMode = themeMode === 'light' ? 'dark' : 'light'
    const {
      pagesLight,
      pagesDark,
      formsLight,
      formsDark,
      dialogsLight,
      dialogsDark,
      themeLight,
      themeDark
    } = rootState
    if (newMode === 'light') {
      clear_last_content_jsx()
      dispatch({ type: 'dialog/dialogDismount' })
      dispatch({
        type: 'app/appThemeModeUpdate',
        payload: newMode
      })
      dispatch({
        type: 'forms/formsAddMultiple',
        payload: formsLight
      })
      dispatch({
        type: 'dialogs/dialogsAddMultiple',
        payload: dialogsLight
      })
      dispatch({
        type: 'pages/pagesAddMultiple',
        payload: pagesLight
      })
      dispatch({ type: 'theme/themeSet', payload: themeLight })
      return
    }
    if (newMode === 'dark') {
      clear_last_content_jsx()
      dispatch({ type: 'dialog/dialogDismount' })
      dispatch({
        type: 'app/appThemeModeUpdate',
        payload: newMode
      })
      dispatch({
        type: 'forms/formsAddMultiple',
        payload: formsDark
      })
      dispatch({
        type: 'dialogs/dialogsAddMultiple',
        payload: dialogsDark
      })
      dispatch({
        type: 'pages/pagesAddMultiple',
        payload: pagesDark
      })
      dispatch({ type: 'theme/themeSet', payload: themeDark })
      return
    }
  }
}
