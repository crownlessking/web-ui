import StateController from '../../../../controllers/state.controller'
import { IStateFormItemRadioButton } from '../../../../interfaces'
import StateFormItem from '../items.controller'
import StateFormItemCustom from '../custom.controller'
import StateForm from '../../../../state/forms/form.controller'

/**
 * Radio button.
 *
 * A customized version of `StateFormItem`.
 */
export type StateFormItemRadio = StateFormItem<
 StateForm,
 IStateFormItemRadioButton
>

/**
 * A custom version of the `StateFormItemCustom` class defined to be used with
 * radio buttons (`StateFormItemRadio`)
 */
export type StateFormItemRadioCustom = StateFormItemCustom<
  StateFormItemRadio,
  IStateFormItemRadioButton
>

/**
 * If a set of radio buttons is a *single form item (`StateFormItemRadio`) then
 * this class represents a single radio button in the set.
 */
export default class StateFormItemRadioButton
  extends StateController
  implements IStateFormItemRadioButton
{
  private radioButtonJson: IStateFormItemRadioButton
  private parentObj:       StateFormItemRadioCustom

  constructor(radioButtonJson: IStateFormItemRadioButton, parent: StateFormItemRadioCustom) {
    super()
    this.radioButtonJson = radioButtonJson
    this.parentObj       = parent
  }

  get json() { return this.radioButtonJson }
  get parent() { return this.parentObj }
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

}
