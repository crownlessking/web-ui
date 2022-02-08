import AbstractState from './AbstractState'
import IFormChoices from './interfaces/IFormChoices'
import IStateFormItemCustom from './interfaces/IStateFormItemCustom'
import StateForm from './StateForm'
import StateFormItem from './StateFormItem'

export interface IStateFormItemCheckbox extends IFormChoices { }

export default class StateFormItemCheckbox
  extends AbstractState implements IStateFormItemCheckbox
{
  private checkboxJson: IStateFormItemCheckbox
  private checkboxHasJson: IStateFormItemCustom
  private parentObj: StateFormItem<StateForm, this>

  constructor(checkboxJson: IStateFormItemCheckbox, parent: StateFormItem) {
    super()
    this.checkboxJson = checkboxJson
    this.parentObj = parent
    this.checkboxHasJson = checkboxJson.has || {}
  }

  get json() { return this.checkboxJson }
  get parent() { return this.parentObj }
  get value() { return this.checkboxJson.value }
  get label() { return this.checkboxJson.label || '' }
  get color() { return this.checkboxJson.color || 'default' }
  get disabled() { return this.checkboxJson.disabled }
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }
  get hasLabel() { return !!this.checkboxJson.label }
  get formControlLabelProps() {
    return this.checkboxHasJson.formControlLabelProps || {}
  }
}
