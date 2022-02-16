import AbstractState from './AbstractState'
import { IStateFormItemRadioButton } from './interfaces/IFormChoices'
import IStateFormItemCustom from './interfaces/IStateFormItemCustom'
import StateFormItemRadioCustom from './StateFormItemRadioCustom'

/**
 * If a set of radio buttons is a *single form item (`StateFormItemRadio`) then
 * this class represents a single radio button in the set.
 */
export default class StateFormItemRadioButton
  extends AbstractState
  implements IStateFormItemRadioButton
{
  private radioButtonJson: IStateFormItemRadioButton
  private parentObj: StateFormItemRadioCustom
  private radioButtonHasJson: IStateFormItemCustom

  constructor(radioButtonJson: IStateFormItemRadioButton, parent: StateFormItemRadioCustom) {
    super()
    this.radioButtonJson = radioButtonJson
    this.parentObj = parent
    this.radioButtonHasJson = radioButtonJson.has || {}
  }

  get json(): IStateFormItemRadioButton { return this.radioButtonJson }
  get parent(): StateFormItemRadioCustom { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }
  get value(): string { return this.radioButtonJson.value }
  get label(): string {
    return this.radioButtonJson.label || this.radioButtonJson.value
  }
  get color(): Required<IStateFormItemRadioButton>['color'] {
    return this.radioButtonJson.color || 'default'
  }
  get disabled(): boolean {
    return this.radioButtonJson.disabled === true
  }
  get formControlLabelProps(): any {
    return this.radioButtonHasJson.formControlLabelProps || {}
  }
}
