import { IStateForm } from '../../interfaces'
import StateAllForms from './controller'
import StateController from '../../controllers/state.controller'
import StateFormItem from '../../material/form/items/items.controller'

export default class StateForm extends StateController implements IStateForm {

  private form: IStateForm
  private parentDef: StateAllForms
  private formItemsDef?: StateFormItem[]
  private fName: string

  constructor (form: IStateForm, parent: StateAllForms) {
    super()
    this.parentDef = parent
    this.form = form
    this.fName = this.parentDef.getLastFormName()
  }

  get state() { return this.form }

  get patched() {
    throw new Error(`'Patched state form' Not implemented.`)
  }

  /**
   * Chain-access to parent (all forms) definition.
   */
  get parent() { return this.parentDef }

  /**
   * Whether the form should have a paper background or not.
   */
  get paperBackground() { return !!this.form.paperBackground }

  /**
   * Get (chain-access) list of form fields definition.
   */
  get items() {
    return this.formItemsDef
      || (this.formItemsDef = this.form.items.map(
          item => new StateFormItem(item, this
        )))
  }

  /**
   * Get the form name (`formName`)
   */
  get name () { return this.fName }

}
