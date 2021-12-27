import { IStateForm } from '../interfaces'
import StateAllForms from './StateAllForms'
import AbstractState from './AbstractState'
import StateFormItem from './StateFormItem'

export default class StateForm extends AbstractState implements IStateForm {

  private formJson: IStateForm
  private parentObj: StateAllForms
  private fName: string
  private formItems?: StateFormItem[]
  private ePoint?: string

  constructor (formJson: IStateForm, parent: StateAllForms) {
    super()
    this.parentObj = parent
    this.formJson = formJson
    this.fName = this.parentObj.getLastFormName()
  }

  get json() { return this.formJson }
  /** Chain-access to all forms definition. */
  get parent() { return this.parentObj }

  get props() {
    const props :any = { ...this.formJson}
    delete props.items
    delete props.paperBackground
    delete props.type
    delete props.theme
    return {
      autoComplete: 'off',
      component: 'form',
      ...props
    }
  }

  /**
   * Whether the form should have a paper background or not.
   */
  get paperBackground() { return !!this.formJson.paperBackground }

  get type() { return this.formJson.type || 'default' }
  get theme() { return this.formJson.theme || {} }

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
  get name() { return this.fName }

  get endpoint() {
    return this.ePoint || ''
  }

  set endpoint(endpoint: string) {
    this.ePoint = endpoint
  }
}
