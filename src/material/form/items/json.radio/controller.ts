import StateController from '../../../../controllers/state.controller'
import { IStateFormItemRadio } from '../../../../interfaces'
import StateFormItem from '../items.controller'
import { RadioProps } from '@material-ui/core/Radio'
import StateForm from '../../../../state/forms/form.controller'

export default class StateFormItemRadio extends StateController implements IStateFormItemRadio {
  
  private radioJson: IStateFormItemRadio
  private parentObj: StateFormItem

  constructor(radioJson: IStateFormItemRadio, parent: StateFormItem) {
    super()
    this.radioJson = radioJson
    this.parentObj = parent
  }

  get parent() { return this.parentObj }

  get json() { return this.radioJson }

  get value() { return this.radioJson.value }

  get label() { return this.radioJson.label || '' }

  get color() { return this.radioJson.color || 'default' }

  get disabled() { return this.radioJson.disabled || false }

  radioLabel() {
    // TODO Implement additional logic for form radio label here.
    // e.g. filtering and proccessing

    return this.label || this.value
  }

  radioColor() {
    const color = (
      this.parentObj as StateFormItem<StateForm, IStateFormItemRadio>
    ).has.color

    return color ? (color as RadioProps['color']) : this.color
  }
}
