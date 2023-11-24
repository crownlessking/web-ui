import { IRedux, ler } from 'src/state'
import { get_dialog_state } from 'src/state/net.actions'

/**
 * Shows the dialog to insert a new video url from which the video bookmark
 * will be created.
 *
 * @id $3_C_1
 */
export async function dialog_open(redux: IRedux, dialogId: string) {
  const { store: { dispatch } } = redux
  const rootState = redux.store.getState()
  if (rootState.dialog._id === dialogId) {
    dispatch({ type: 'dialog/dialogOpen' })
    return
  }
  const dialogKey = rootState.stateRegistry[dialogId]
  const newVideoUrlDialogState = await get_dialog_state(redux, dialogKey)
  if (!newVideoUrlDialogState) {
    ler(`'${dialogKey}' does not exists.`)
    return
  }
  // if the dialog was NOT mounted
  if (rootState.dialog._key !== newVideoUrlDialogState._key) {
    dispatch({ type: 'dialog/dialogMount', payload: newVideoUrlDialogState })
  } else {
    dispatch({ type: 'dialog/dialogOpen' })
  }
}