import { IStateDialog, IStateFormItem } from '../interfaces'
import AbstractState from './AbstractState'
import State from './State'
import StateFormItem from './StateFormItem'
import { getDudEventCallback } from '.'

export default class StateDialog extends AbstractState implements IStateDialog {

  private parentObj: State
  private dialogJson: IStateDialog
  private dialogActionsJson: IStateFormItem[]
  private dialogActions?: StateFormItem<StateDialog>[]

  constructor(dialogJson: IStateDialog, parent: State) {
    super()
    this.parentObj = parent
    this.dialogJson = dialogJson
    this.dialogActionsJson = this.dialogJson.actions || []
  }

  get json() { return this.dialogJson }

  get parent() { return this.parentObj }

  get title() { return this.dialogJson.title || '' }

  get label() { return this.dialogJson.label || '' }

  get contentType() { return this.dialogJson.contentType }

  get contentText() { return this.dialogJson.contentText || '' }

  get content() { return this.dialogJson.content }

  get actions() {
    return this.dialogActions
      || (this.dialogActions = this.dialogActionsJson.map(
          item => new StateFormItem<StateDialog>(item, this)
        ))
  }

  get showActions() { return this.dialogJson.showActions }

  get onSubmit() { return this.dialogJson.onSubmit || getDudEventCallback }

  get items() { return this.dialogJson.items || [] }

  get open() { return this.dialogJson.open }

}
