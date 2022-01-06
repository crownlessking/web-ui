import StateForm from './StateForm'
import StateFormItem from './StateFormItem'

export interface IStateFormSelectOption {
  title?: string
  value: string
}

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
