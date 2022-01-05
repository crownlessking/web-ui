import StateForm from './StateForm'
import StateFormItem, { IStateFormItem } from './StateFormItem'

export interface IStateFormItemGroup extends IStateFormItem {
  items ?:IStateFormItem[]
}

export default class StateFormItemGroup
  extends StateFormItem implements IStateFormItemGroup
{
  private itemGroupJson: IStateFormItemGroup
  private itemGroupItems?: StateFormItem[]

  constructor (itemGroupJson: IStateFormItemGroup, parent: StateForm) {
    super(itemGroupJson, parent)
    this.itemGroupJson = itemGroupJson
  }

  get items() {
    return this.itemGroupItems
      || (this.itemGroupItems = (this.itemGroupJson.items || []).map(
          item => new StateFormItem(item, this.parentObj
        )))
  }
}
