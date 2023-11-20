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
    const dialogJson = await get_dialog_state(redux, dialogKey)
    if (!dialogJson) {
      ler(`'${dialogKey}' does not exists.`)
      return
    }
    // if the dialog was NOT mounted
    if (rootState.dialog._key !== dialogJson._key) {
      dispatch({ type: 'dialog/dialogMount', payload: dialogJson })
    } else {
      dispatch({ type: 'dialog/dialogOpen' })
    }
  }
}