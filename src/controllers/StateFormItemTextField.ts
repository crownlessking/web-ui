import StateFormItem from './StateFormItem'

export default class StateFormItemTextField extends StateFormItem {
  get inputProps() { return this.itemJson.inputProps || {} }
}
