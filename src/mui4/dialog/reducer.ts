import {
  UI_TOGGLE_DIALOG, UI_OPEN_DIALOG, UI_CLOSE_DIALOG, UI_SET_DIALOG,
  UI_LOAD_OPEN_DIALOG, APP_LOAD_DIALOG
} from './actions'
import {
  IStateDialog, IReduxAction,
} from '../../interfaces'
import initialState from '../../state/initial.state'
import { uiLoadDialog, uiLoadOpenDialog } from './controller'

const INIT: IStateDialog = initialState.dialog

export default function DialogReducer (
  dialog = INIT,
  {payload, type}: IReduxAction
): IStateDialog {

  switch (type) {

  case UI_CLOSE_DIALOG:
    return { ...dialog, open: false }

  case UI_SET_DIALOG:
    return { ...dialog, ...payload }

  case UI_OPEN_DIALOG:
    return { ...dialog, open: true }

  case UI_TOGGLE_DIALOG:
    return { ...dialog, open: !dialog.open }

  case UI_LOAD_OPEN_DIALOG:
    return uiLoadOpenDialog(payload, dialog)

  case APP_LOAD_DIALOG:
    return uiLoadDialog(payload, dialog)

  default:
    return dialog
  }

}
