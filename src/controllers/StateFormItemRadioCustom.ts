import StateFormItemCustom from './StateFormItemCustom'
import StateFormItemRadio from './StateFormItemRadio'
import { IStateFormItemRadioButton } from './StateFormItemRadioButton'

/**
 * A custom version of the `StateFormItemCustom` class defined to be used with
 * radio buttons (`StateFormItemRadio`)
 */
export default class StateFormItemRadioCustom extends StateFormItemCustom<
  StateFormItemRadio,
  IStateFormItemRadioButton
> { }
