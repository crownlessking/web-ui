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

  get json() { return this.radioButtonJson }
  get parent() { return this.parentObj }
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }
  get value() { return this.radioButtonJson.value }
  get label() {
    return this.radioButtonJson.label || this.radioButtonJson.value
  }
  get color() {
    return this.radioButtonJson.color || 'default'
  }
  get disabled() {
    return this.radioButtonJson.disabled === true
  }
  get formControlLabelProps() {
    return this.radioButtonHasJson.formControlLabelProps || {}
  }
}
