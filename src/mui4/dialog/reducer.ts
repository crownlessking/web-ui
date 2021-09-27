import {
  UI_TOGGLE_DIALOG, UI_OPEN_DIALOG, UI_CLOSE_DIALOG, UI_SET_DIALOG
} from './actions'
import {
  IStateDialog, IReduxAction,
} from '../../interfaces'
import state from '../../state/initial.state'

const INIT: IStateDialog = state.dialog

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
  default:
    return dialog
  }

}
