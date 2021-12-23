import { IStateFormItemCheckbox } from '../interfaces'
import AbstractState from './AbstractState'
import StateForm from './StateForm'
import StateFormItem from './StateFormItem'

export default class StateFormItemCheckbox
  extends AbstractState implements IStateFormItemCheckbox
{
  private checkbox: IStateFormItemCheckbox
  private parentObj: StateFormItem<StateForm, this>

  constructor(checkbox: IStateFormItemCheckbox, parent: StateFormItem) {
    super()
    this.checkbox = checkbox
    this.parentObj = parent
  }

  get json() { return this.checkbox }
  get parent() { return this.parentObj }
  get value() { return this.checkbox.value }
  get label() { return this.checkbox.label || '' }
  get color() { return this.checkbox.color || 'default' }
  get disabled() { return this.checkbox.disabled }
  get props() { return this.checkbox.props || {} }

  get hasLabel() { return !!this.checkbox.label }
  get formControlLabelProps() {
    return this.checkbox.formControlLabelProps || {}
  }
}
