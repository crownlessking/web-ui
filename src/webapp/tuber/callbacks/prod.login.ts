import { get_dialog_state } from '../../../state/net.actions'
import { IRedux, ler } from '../../../state'
import { DIALOG_LOGIN_ID } from '../tuber.config'

export function dialog_login(redux: IRedux) {
  return async () => {
    const { store: { dispatch } } = redux
    const rootState = redux.store.getState()
    if (rootState.dialog._id === DIALOG_LOGIN_ID) {
      dispatch({ type: 'dialog/dialogOpen' })
      return
    }
    const dialogKey = rootState.stateRegistry[DIALOG_LOGIN_ID]
    const dialogState = await get_dialog_state(redux, dialogKey)
    if (!dialogState) {
      ler(`'${dialogKey}' does not exists.`)
      return
    }
    // if the dialog was NOT mounted
    if (rootState.dialog._key !== dialogState._key) {
      dispatch({ type: 'dialog/dialogMount', payload: dialogState })
    } else {
      dispatch({ type: 'dialog/dialogOpen' })
    }
  }
}