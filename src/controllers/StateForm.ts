import StateAllForms from './StateAllForms'
import AbstractState from './AbstractState'
import StateFormItem from './StateFormItem'
import IStateForm from './interfaces/IStateForm'

export default class StateForm extends AbstractState implements IStateForm {

  private formState: IStateForm
  private parentDef: StateAllForms
  private fName: string
  private formItems?: StateFormItem[]
  private ePoint?: string

  constructor (formState: IStateForm, parent: StateAllForms) {
    super()
    this.parentDef = parent
    this.formState = formState
    this.fName = this.parentDef.getLastFormName()
  }

  get state(): IStateForm { return this.formState }
  /** Chain-access to all forms definition. */
  get parent(): StateAllForms { return this.parentDef }
  get props(): any {
    return {
      autoComplete: 'off',
      component: 'form',
      onSubmit: (e: any) => e.preventDefault(),
      ...this.formState.props
    }
  }
  /** Whether the form should have a paper background or not. */
  get paperBackground(): boolean { return !!this.formState.paperBackground }
  get _type(): Required<IStateForm>['_type'] {
    switch (this.formState._type) {
    case 'stack':
    case 'box':
    case 'none':
      return this.formState._type
    case 'form':
    case 'selection':
    case 'alert':
    case 'any':
      return this.die(
        `${this.formState._type} is NOT a valid form type.`, 'none'
      )
    }
    return 'none'
  }
  get theme(): any { return this.formState.theme }
  /** Form name */
  get _key(): string { return this.formState._key ?? '' }
  /** Get (chain-access) list of form fields definition. */
  get items(): StateFormItem[] {
    return this.formItems
      || (this.formItems = (this.formState.items || []).map(
          item => new StateFormItem(item, this)
        ))
  }
  /** Get the form name (`formName`) */
  get name(): string { return this.fName }
  get endpoint(): string { return this.ePoint ?? '' }
  get paperProps(): any { return this.formState.paperProps }
  get errorCount(): number {
    const formsDataErrors = this.parent.parent.formsDataErrors
    return formsDataErrors.getCount(this.name)
  }
  set endpoint(ep: string) { this.ePoint = ep }
}
