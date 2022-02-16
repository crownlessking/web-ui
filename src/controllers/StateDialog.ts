import AbstractState from './AbstractState'
import State from './State'
import StateFormItem from './StateFormItem'
import { getDudEventCallback } from '.'
import IStateFormItem from './interfaces/IStateFormItem'
import IStateDialog from './interfaces/IStateDialog'

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

  get json(): IStateDialog { return this.dialogJson }
  get parent(): State { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }
  get title(): string { return this.dialogJson.title || '' }
  get label(): string { return this.dialogJson.label || '' }
  get contentType(): IStateDialog['contentType'] {
    return this.dialogJson.contentType
  }
  get contentText(): string { return this.dialogJson.contentText || '' }
  get content(): any { return this.dialogJson.content }
  get actions(): StateFormItem<StateDialog>[] {
    return this.dialogActions
      || (this.dialogActions = this.dialogActionsJson.map(
          item => new StateFormItem<StateDialog>(item, this)
        ))
  }
  get showActions(): IStateDialog['showActions'] {
    return this.dialogJson.showActions
  }
  get onSubmit() { return this.dialogJson.onSubmit || getDudEventCallback }
  get items(): IStateFormItem[] { return this.dialogJson.items || [] }
  get open(): boolean { return this.dialogJson.open }
}
