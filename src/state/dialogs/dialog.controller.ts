import { IStateDialog, IStateFormItem } from '../../interfaces'
import StateController from '../../controllers/state.controller'
import State from '../controller'
import StateFormItem from '../../material/form/items/items.controller'
import { getDudEventCallback } from '../../controllers'

export default class StateDialog extends StateController implements IStateDialog {

  private parentDef: State
  private dialog: IStateDialog
  private dialogActions: IStateFormItem[]
  private dialogActionsDef?: StateFormItem<StateDialog>[]

  constructor(dialog: IStateDialog, parent: State) {
    super()
    this.parentDef = parent
    this.dialog = dialog
    this.dialogActions = this.dialog.actions || []
  }

  get state() { return this.dialog }

  get patched() {
    throw new Error(`'Patched dialog state' NOT implemented.`)
  }

  get parent() { return this.parentDef }

  get title() { return this.dialog.title || '' }

  get label() { return this.dialog.label || '' }

  get contentType() { return this.dialog.contentType }

  get contentText() { return this.dialog.contentText || '' }

  get content() { return this.dialog.content }

  get actions() {
    return this.dialogActionsDef
      || (this.dialogActionsDef = this.dialogActions.map(
          item => new StateFormItem<StateDialog>(item, this)
        ))
  }

  get showActions() { return this.dialog.showActions }

  get onSubmit() { return this.dialog.onSubmit || getDudEventCallback }

  get items() { return this.dialog.items || [] }

  get open() { return this.dialog.open }

}
