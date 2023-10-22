import { ler } from '../../../controllers'
import { IRedux } from '../../../state'

const LOGIN_DIALOG = 'loginDialog'

export function dialog_login(redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const dialogJson = getState().dialogs[LOGIN_DIALOG]
    if (!dialogJson) {
      ler(`'${LOGIN_DIALOG}' does not exists.`)
      return
    }
    const mountedDialogName = getState().dialog._key

    // if the dialog was NOT mounted
    if (mountedDialogName !== dialogJson._key) {
      dispatch({ type: 'dialog/dialogMount', payload: dialogJson })
    } else {
      dispatch({ type: 'dialog/dialogOpen' })
    }
  }
}