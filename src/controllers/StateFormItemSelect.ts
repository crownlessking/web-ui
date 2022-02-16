import IStateFormSelectOption from './interfaces/IStateFormSelectOption'
import StateForm from './StateForm'
import StateFormItem from './StateFormItem'

export default class StateFormItemSelect
  extends StateFormItem<StateForm, IStateFormSelectOption>
{
  get formControlLabelProps(): any {
    return this.itemHasJson.formControlLabelProps || {}
  }
  get inputLabelProps(): any {
    return this.itemHasJson.inputLabelProps || {}
  }
}
