import { IStateDialogForm } from '../../interfaces'
import StatePage from '../pages/page.controller'
import StateForm from '../forms/form.controller'

export default class StateDialogForm extends StateForm implements IStateDialogForm {

  private dialogForm: IStateDialogForm
  private dialogFormOnSubmit: IStateDialogForm['onSubmit']

  constructor(dialogForm: IStateDialogForm, parent: StatePage) {
    super(dialogForm, parent.parent.parent.forms)
    this.dialogForm = dialogForm
    this.dialogFormOnSubmit = this.dialogForm.onSubmit || (() => {})
  }

  // get state() { return this.dialogForm }

  // get patched() {
  //   throw new Error(`'Patched dialog form state' NOT implemented.`)
  // }

  get title() { return this.dialogForm.title || '' }

  get label() { return this.dialogForm.label || '' }

  get contentType() { return this.dialogForm.contentType }

  get contentText() { return this.dialogForm.contentText || '' }

  get content() { return this.dialogForm.content }

  get actions() { return this.dialogForm.actions || [] }

  get showActions() { return !(this.dialogForm.showActions === false) }

  get onSubmit() { return this.dialogFormOnSubmit }

  set onSubmit(cb: any) {
    this.dialogFormOnSubmit = this.dialogForm.onSubmit || cb
  }

}
