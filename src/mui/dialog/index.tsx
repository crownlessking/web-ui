import { useSelector } from 'react-redux'
import { RootState } from 'src/state'
import StateDialog from '../../controllers/StateDialog'
import StateDialogAlert from '../../controllers/templates/StateDialogAlert'
import StateDialogCustomized from '../../controllers/templates/StateDialogCustomized'
import StateDialogForm from '../../controllers/templates/StateDialogForm'
import StateDialogSelection from '../../controllers/templates/StateDialogSelection'
import StateJsxAlertDialog from './state.jsx.alert.dialog'
import StateJsxCustomizedDialog from './state.jsx.customized.dialog'
import StateJsxFormDialog from './state.jsx.form.dialog'
import StateJsxSelectionDialog from './state.jsx.selection.dialog'

export default function JsonDialog () {
  const dialog = new StateDialog(
    useSelector((state: RootState) => state.dialog)
  )
  const json = dialog.state
  const dialogTable: { [x: string]: JSX.Element } = {
    'selection': <StateJsxSelectionDialog def={new StateDialogSelection(json)} />,
    'alert': <StateJsxAlertDialog def={new StateDialogAlert(json)} />,
    'form': <StateJsxFormDialog def={new StateDialogForm(json)} />,
    'any': <StateJsxCustomizedDialog def={new StateDialogCustomized(json)} />
  }
  const type = dialog._type.toLowerCase()
  return dialogTable[type]
}
