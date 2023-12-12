import { clear_last_content_jsx } from 'src/business.logic'
import { IRedux } from 'src/state'

/** @id 44_C_1 */
export default function toggle_theme_mode (redux: IRedux) {
  return async () => {
    const { store: { dispatch }, actions } = redux
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
    setTimeout(() => {
      if (newMode === 'light') {
        clear_last_content_jsx()
        dispatch(actions.dialogDismount())
        dispatch(actions.appThemeModeUpdate('light'))
        dispatch(actions.formsAddMultiple(formsLight))
        dispatch(actions.dialogsAddMultiple(dialogsLight))
        dispatch(actions.pagesAddMultiple(pagesLight))
        dispatch(actions.themeSet(themeLight))
        return
      }
      if (newMode === 'dark') {
        clear_last_content_jsx()
        dispatch(actions.dialogDismount())
        dispatch(actions.appThemeModeUpdate('dark'))
        dispatch(actions.formsAddMultiple(formsDark))
        dispatch(actions.dialogsAddMultiple(dialogsDark))
        dispatch(actions.pagesAddMultiple(pagesDark))
        dispatch(actions.themeSet(themeDark))
        return
      }
    })
  }
}
