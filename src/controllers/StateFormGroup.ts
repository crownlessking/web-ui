import AbstractState from './AbstractState'
import IStateFormItemGroup, { TItemGroup } from './interfaces/IStateFormItemGroup'
import StateForm from './StateForm'
import StateFormItem from './StateFormItem'

export default class StateFormItemGroup
  extends AbstractState implements IStateFormItemGroup
{
  protected parentDef: StateForm
  private itemGroupState: IStateFormItemGroup
  private itemGroupItems?: StateFormItem[]

  constructor (itemGroupState: IStateFormItemGroup, parent: StateForm) {
    super()
    this.itemGroupState = itemGroupState
    this.parentDef = parent
  }

  get state(): IStateFormItemGroup { return this.itemGroupState }
  get parent(): StateForm { return this.parentDef }
  get props(): any { return this.itemGroupState.props }
  get theme(): any { return this.itemGroupState.theme }

  get type(): TItemGroup {
    return this.itemGroupState.type || 'none'
  }

  get items(): StateFormItem[] {
    return this.itemGroupItems
      || (this.itemGroupItems = (this.itemGroupState.items || []).map(
          item => new StateFormItem(item, this.parentDef
        )))
  }
}
