import StateController from '../../../../controllers/state.controller'
import { IStateFormItemRadio } from '../../../../interfaces'
import StateFormItem from '../items.controller'
import StateForm from '../../../../state/forms/form.controller'

export default class StateFormItemRadio extends StateController implements IStateFormItemRadio {
  
  private radioJson: IStateFormItemRadio
  private parentObj: StateFormItem<StateForm, IStateFormItemRadio>

  constructor(radioJson: IStateFormItemRadio, parent: StateFormItem) {
    super()
    this.radioJson = radioJson
    this.parentObj = parent
  }

  get parent() { return this.parentObj }

  get json() { return this.radioJson }

  get value() { return this.radioJson.value }

  get label() {
    // [TODO] Implement additional logic for form radio label here.
    //        e.g. filtering and proccessing

    return this.radioJson.label || this.value
  }

 get color() {
    return this.radioJson.color
      || this.parentObj.has.color as IStateFormItemRadio['color']
      || 'default'
 }

  // get color() { return this.radioJson.color || 'default' }

  get disabled() { return this.radioJson.disabled || false }

}
