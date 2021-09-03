import StateController from '../../../../controllers/state.controller'
import { IStateFormItemRadio } from '../../../../interfaces'
import StateFormItem from '../items.controller'
import { RadioProps } from '@material-ui/core/Radio'
import StateForm from '../../../../state/forms/form.controller'

export default class StateFormItemRadio extends StateController implements IStateFormItemRadio {
  
  private radio: IStateFormItemRadio
  private parentDef: StateFormItem

  constructor(radio: IStateFormItemRadio, parent: StateFormItem) {
    super()
    this.radio = radio
    this.parentDef = parent
  }

  get parent() { return this.parentDef }

  get state() { return this.radio }

  get patched() {
    throw new Error(`'Patched form item radio state' NOT implemented.`)
  }

  get value() { return this.radio.value }

  get label() { return this.radio.label || '' }

  get color() { return this.radio.color || 'default' }

  get disabled() { return this.radio.disabled || false }

  radioLabel() {
    // TODO Implement additional logic for form radio label here.
    // e.g. filtering and proccessing

    return this.label || this.value
  }

  radioColor() {
    const color = (
      this.parentDef as StateFormItem<StateForm, StateFormItemRadio>
    ).has.color

    return color ? (color as RadioProps['color']) : this.color
  }
}
