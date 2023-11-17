import { get_dialog_state, IRedux, ler } from '../../../state'
import { DIALOG_LOGIN_ID } from '../tuber.config'

export function dialog_login(redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const dialogKey = rootState.stateRegistry[DIALOG_LOGIN_ID]
    // const dialogJson = rootState.dialogs[dialogKey]
    const dialogJson = await get_dialog_state(dialogKey)
    if (!dialogJson) {
      ler(`'${dialogKey}' does not exists.`)
      return
    }
    const mountedDialogKey = rootState.dialog._key

    // if the dialog was NOT mounted
    if (mountedDialogKey !== dialogJson._key) {
      dispatch({ type: 'dialog/dialogMount', payload: dialogJson })
    } else {
      dispatch({ type: 'dialog/dialogOpen' })
    }
  }
}