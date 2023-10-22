import { safely_get_as } from 'src/controllers'
import { get_bootstrap_key } from 'src/state/_business.logic'
import { IRedux } from '../../../state'
import { DIALOG_ALERT_CLIENTSIDE } from '../tuber.config'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * Use to open a dialog to display a message. Can only be used in redux
 * callbacks.
 */
export function alert_dialog(
  redux: IRedux,
  message: string,
) {
  const { store: { getState, dispatch } } = redux
  const rootState = getState()
  const dialogKey = safely_get_as<string>(
    rootState.meta,
    `${BOOTSTRAP_KEY}.state_registry.${DIALOG_ALERT_CLIENTSIDE}`,
    'dialogNotFound'
  )
  const dialogState = rootState.dialogs[dialogKey]
  dialogState.content = message

  if (rootState.dialog._id !== dialogState._id) { // if the dialog was NOT mounted
    dispatch({ type: 'dialog/dialogMount', payload: dialogState })
  } else {
    dispatch({ type: 'dialog/dialogOpen' })
  }
}