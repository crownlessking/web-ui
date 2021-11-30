import { IStateFormItemRadioButton } from '../interfaces'
import StateFormItemCustom from './StateFormItemCustom'
import StateFormItemRadio from './StateFormItemRadio'

/**
 * A custom version of the `StateFormItemCustom` class defined to be used with
 * radio buttons (`StateFormItemRadio`)
 */
export default class StateFormItemRadioCustom extends StateFormItemCustom<
  StateFormItemRadio,
  IStateFormItemRadioButton
> { }
