import IStateFormItem from "./IStateFormItem";

export default interface IStateFormItemGroup extends IStateFormItem {
  items ?:IStateFormItem[]
}
