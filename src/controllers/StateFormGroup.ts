import IStateFormItemGroup from './interfaces/IStateFormItemGroup'
import StateForm from './StateForm'
import StateFormItem from './StateFormItem'

export default class StateFormItemGroup
  extends StateFormItem implements IStateFormItemGroup
{
  private itemGroupJson: IStateFormItemGroup
  private itemGroupItems?: StateFormItem[]

  constructor (itemGroupJson: IStateFormItemGroup, parent: StateForm) {
    super(itemGroupJson, parent)
    this.itemGroupJson = itemGroupJson
  }

  get items(): StateFormItem[] {
    return this.itemGroupItems
      || (this.itemGroupItems = (this.itemGroupJson.items || []).map(
          item => new StateFormItem(item, this.parentObj
        )))
  }
}
