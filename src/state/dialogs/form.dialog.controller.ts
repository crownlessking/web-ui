import { IStateDialogForm } from '../../interfaces'
import StatePage from '../pages/page.controller'
import StateForm from '../forms/form.controller'

export default class StateDialogForm extends StateForm implements IStateDialogForm {

  private dialogFormJson: IStateDialogForm
  private dialogFormOnSubmitJson: IStateDialogForm['onSubmit']

  constructor(dialogFormJson: IStateDialogForm, parent: StatePage) {
    super(dialogFormJson, parent.parent.parent.forms)
    this.dialogFormJson = dialogFormJson
    this.dialogFormOnSubmitJson = this.dialogFormJson.onSubmit || (() => {})
  }

  get title() { return this.dialogFormJson.title || '' }

  get label() { return this.dialogFormJson.label || '' }

  get contentType() { return this.dialogFormJson.contentType }

  get contentText() { return this.dialogFormJson.contentText || '' }

  get content() { return this.dialogFormJson.content }

  get actions() { return this.dialogFormJson.actions || [] }

  get showActions() { return !(this.dialogFormJson.showActions === false) }

  get onSubmit() { return this.dialogFormOnSubmitJson }

  set onSubmit(cb: any) {
    this.dialogFormOnSubmitJson = this.dialogFormJson.onSubmit || cb
  }

}
