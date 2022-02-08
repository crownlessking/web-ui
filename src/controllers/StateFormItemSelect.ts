import IStateFormSelectOption from './interfaces/IStateFormSelectOption'
import StateForm from './StateForm'
import StateFormItem from './StateFormItem'

export default class StateFormItemSelect
  extends StateFormItem<StateForm, IStateFormSelectOption>
{
  get formControlLabelProps() {
    return this.itemHasJson.formControlLabelProps || {}
  }
  get inputLabelProps() {
    return this.itemHasJson.inputLabelProps || {}
  }
}
