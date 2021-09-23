import StateController from '../../../../controllers/state.controller'
import { IStateFormItemRadioButton } from '../../../../interfaces'
import StateFormItem from '../items.controller'
import StateFormItemCustom from '../custom.controller'

/**
 * A custom version of the `StateFormItemCustom` class defined to be used with
 * radio buttons (`StateFormItemRadio`)
 */
export class StateFormItemRadioCustom
  extends StateFormItemCustom<StateFormItemRadio, IStateFormItemRadioButton>
{

  private hasItems?: StateFormItemRadioButton[]

  get items() {
    return this.hasItems || (
      this.hasItems = this.hasItemsJson.map(
        item => new StateFormItemRadioButton(item, this)
      )
    )
  }

}

/**
 * If a set of radio buttons is a *single form item (`StateFormItemRadio`) then
 * this class represents a single radio button in the set.
 */
export class StateFormItemRadioButton
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

/**
 * Radio button.
 *
 * A customized version of `StateFormItem`.
 */
export default class StateFormItemRadio extends StateFormItem {

  get has(): StateFormItemRadioCustom {
    return this.itemHas || (
      this.itemHas = new StateFormItemRadioCustom(this.itemHasJson, this)
    )
  }

}
