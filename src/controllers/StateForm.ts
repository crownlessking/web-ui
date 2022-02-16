import StateAllForms from './StateAllForms'
import AbstractState from './AbstractState'
import StateFormItem from './StateFormItem'
import IStateForm from './interfaces/IStateForm'

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

  get json(): IStateForm { return this.formJson }
  /** Chain-access to all forms definition. */
  get parent(): StateAllForms { return this.parentObj }
  get props(): any {
    const props :any = { ...this.formJson}
    delete props.items
    delete props.paperBackground
    delete props.type
    delete props.theme
    delete props.paperProps
    return {
      autoComplete: 'off',
      component: 'form',
      ...props
    }
  }
  /** Whether the form should have a paper background or not. */
  get paperBackground(): boolean { return !!this.formJson.paperBackground }
  get type(): Required<IStateForm>['type'] {
    return this.formJson.type || 'default'
  }
  get theme(): any { return this.formJson.theme || {} }
  /** Get (chain-access) list of form fields definition. */
  get items(): StateFormItem[] {
    return this.formItems
      || (this.formItems = this.formJson.items.map(
          item => new StateFormItem(item, this
        )))
  }
  /** Get the form name (`formName`) */
  get name(): string { return this.fName }
  get endpoint(): string { return this.ePoint || '' }
  get paperProps(): any { return this.formJson.paperProps }
  set endpoint(endpoint: string) { this.ePoint = endpoint }

}
