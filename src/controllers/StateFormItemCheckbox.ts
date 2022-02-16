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

  get json(): IStateFormItemCheckbox { return this.checkboxJson }
  get parent(): StateFormItem<StateForm, this> { return this.parentObj }
  get value(): string { return this.checkboxJson.value }
  get label(): string { return this.checkboxJson.label || '' }
  get color(): Required<IStateFormItemCheckbox>['color'] {
    return this.checkboxJson.color || 'default'
  }
  get disabled(): boolean|undefined { return this.checkboxJson.disabled }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }
  get hasLabel(): boolean { return !!this.checkboxJson.label }
  get formControlLabelProps(): any {
    return this.checkboxHasJson.formControlLabelProps || {}
  }
}
