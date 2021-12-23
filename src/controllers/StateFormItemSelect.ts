import { IStateFormItem, IStateFormItemSelect, IStateFormSelectOption } from '../interfaces'
import StateForm from './StateForm'
import StateFormItem from './StateFormItem'

export default class StateFormItemSelect
  extends StateFormItem<StateForm, IStateFormSelectOption>
  implements IStateFormItemSelect
{
  private selectJson: IStateFormItemSelect

  constructor(select: IStateFormItemSelect, parent: StateForm) {
    super(select as IStateFormItem, parent)
    this.selectJson = select
  }

  get formControlLabelProps() {
    return this.selectJson.formControlLabelProps || {}
  }
  get inputLabelProps() {
    return this.selectJson.inputLabelProps || {}
  }
}
