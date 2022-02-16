import StatePage from './StatePage'
import StateForm from './StateForm'
import IStateDialogForm from './interfaces/IStateDialogForm'
import IStateFormItem from './interfaces/IStateFormItem'

export default class StateDialogForm extends StateForm implements IStateDialogForm {

  private dialogFormJson: IStateDialogForm
  private dialogFormOnSubmitJson: IStateDialogForm['onSubmit']

  constructor(dialogFormJson: IStateDialogForm, parent: StatePage) {
    super(dialogFormJson, parent.parent.parent.forms)
    this.dialogFormJson = dialogFormJson
    this.dialogFormOnSubmitJson = this.dialogFormJson.onSubmit || (() => {})
  }

  get title(): string { return this.dialogFormJson.title || '' }
  get label(): string { return this.dialogFormJson.label || '' }
  get contentType(): IStateDialogForm['contentType'] {
    return this.dialogFormJson.contentType
  }
  get contentText(): IStateDialogForm['contentText'] {
    return this.dialogFormJson.contentText || ''
  }
  get content(): any { return this.dialogFormJson.content }
  get actions(): IStateFormItem[] { return this.dialogFormJson.actions || [] }
  get showActions(): boolean {
    return !(this.dialogFormJson.showActions === false)
  }
  get onSubmit() { return this.dialogFormOnSubmitJson }
  set onSubmit(cb: any) {
    this.dialogFormOnSubmitJson = this.dialogFormJson.onSubmit || cb
  }

}
