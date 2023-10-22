import StateFormItemCheckbox from './StateFormItemCheckbox'
import StateFormItemCheckboxBox, {
IStateFormItemCheckboxBox
} from '../StateFormItemCheckboxBox'
import StateFormItemCustom from '../StateFormItemCustom'

export default class StateFormItemCheckboxCustom extends StateFormItemCustom<
  StateFormItemCheckbox,
  IStateFormItemCheckboxBox
> {
  private checkboxBoxes?: StateFormItemCheckboxBox[]

  get items(): StateFormItemCheckboxBox[] {
    return this.checkboxBoxes || (this.checkboxBoxes = this.hasItemsState.map(
      box => new StateFormItemCheckboxBox(box, this)
    ))
  }
}
