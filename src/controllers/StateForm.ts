import { IStateForm } from '../interfaces'
import StateAllForms from './StateAllForms'
import AbstractState from './AbstractState'
import StateFormItem from './StateFormItem'
import { CSSProperties } from '@mui/styles'

export default class StateForm extends AbstractState implements IStateForm {

  private formJson: IStateForm
  private parentObj: StateAllForms
  private formItems?: StateFormItem[]
  private fName: string

  constructor (formJson: IStateForm, parent: StateAllForms) {
    super()
    this.parentObj = parent
    this.formJson = formJson
    this.fName = this.parentObj.getLastFormName()
  }

  get json() { return this.formJson }

  /**
   * Chain-access to parent (all forms) definition.
   */
  get parent() { return this.parentObj }

  /**
   * Whether the form should have a paper background or not.
   */
  get paperBackground() { return !!this.formJson.paperBackground }

  get type() { return this.formJson.type || 'default' }
  get theme() { return this.formJson.theme || {} }
  get props() { return this.formJson.props || {} }

  /**
   * Get (chain-access) list of form fields definition.
   */
  get items() {
    return this.formItems
      || (this.formItems = this.formJson.items.map(
          item => new StateFormItem(item, this
        )))
  }

  /**
   * Get the form name (`formName`)
   */
  get name () { return this.fName }

}
