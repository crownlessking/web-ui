import AbstractState from './AbstractState'
import IAbstractState from './interfaces/IAbstractState'
import IFormChoices from './interfaces/IFormChoices'
import StateFormItemCheckboxCustom from './templates/StateFormItemCheckboxCustom'
import StateFormItemCustom from './StateFormItemCustom'

export interface IStateFormItemCheckboxBox extends IAbstractState, IFormChoices { }

export default class StateFormItemCheckboxBox
  extends AbstractState implements IStateFormItemCheckboxBox
{
  private checkboxState: IStateFormItemCheckboxBox
  private parentDef: StateFormItemCheckboxCustom
  private checkboxHas?: StateFormItemCustom<this>

  constructor(checkboxState: IStateFormItemCheckboxBox, parent: StateFormItemCheckboxCustom) {
    super()
    this.checkboxState = checkboxState
    this.parentDef = parent
  }

  get state(): IStateFormItemCheckboxBox { return this.checkboxState }
  get parent(): StateFormItemCheckboxCustom { return this.parentDef }
  get name(): string { return this.checkboxState.name }
  get label(): string { return this.checkboxState.label ?? '' }
  get color(): Required<IStateFormItemCheckboxBox>['color'] {
    return this.checkboxState.color || 'default'
  }
  get disabled(): boolean|undefined { return this.checkboxState.disabled }
  get props(): any { return this.checkboxState.props }
  get theme(): any { return this.die('Not implemented yet.', {}) }
  get has(): StateFormItemCustom<this> {
    return this.checkboxHas || (
      this.checkboxHas = new StateFormItemCustom(
        this.checkboxState.has || {},
        this
      )
    )
  }
  get hasLabel(): boolean { return !!this.checkboxState.label }
  get formControlLabelProps(): any { return this.has.formControlLabelProps }
}
