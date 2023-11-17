import AbstractState from './AbstractState'
import { IStateFormItemRadioButton } from '../interfaces/IFormChoices'
import IStateFormItemCustom from '../interfaces/IStateFormItemCustom'
import StateFormItemRadioCustom from './templates/StateFormItemRadioCustom'

/**
 * If a set of radio buttons is a *single form item (`StateFormItemRadio`) then
 * this class represents a single radio button in the set.
 */
export default class StateFormItemRadioButton
  extends AbstractState
  implements IStateFormItemRadioButton
{
  private radioButtonState: IStateFormItemRadioButton
  private parentDef: StateFormItemRadioCustom
  private radioButtonHasState: IStateFormItemCustom

  constructor(radioButtonState: IStateFormItemRadioButton, parent: StateFormItemRadioCustom) {
    super()
    this.radioButtonState = radioButtonState
    this.parentDef = parent
    this.radioButtonHasState = radioButtonState.has || {}
  }

  get state(): IStateFormItemRadioButton { return this.radioButtonState }
  get parent(): StateFormItemRadioCustom { return this.parentDef }
  get props(): any { return this.radioButtonState.props }
  get theme(): any { return this.die('Not implemented yet.', {}) }
  get name(): string { return this.radioButtonState.name }
  get label(): string {
    return this.radioButtonState.label || this.radioButtonState.name
  }
  get color(): Required<IStateFormItemRadioButton>['color'] {
    return this.radioButtonState.color || 'default'
  }
  get disabled(): boolean {
    return this.radioButtonState.disabled === true
  }
  get formControlLabelProps(): any {
    return this.radioButtonHasState.formControlLabelProps
  }
}
