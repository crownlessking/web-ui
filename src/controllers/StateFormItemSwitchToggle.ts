import AbstractState from './AbstractState'
import IStateFormItemSwitchToggle from '../interfaces/IStateFormItemSwitchToggle'
import StateFormItemSwitch from './templates/StateFormItemSwitch'

export default class StateFormItemSwitchToggle
  extends AbstractState
  implements IStateFormItemSwitchToggle
{

  private switchToggleState: IStateFormItemSwitchToggle
  private parentDef: StateFormItemSwitch

  constructor (
    switchToggleState: IStateFormItemSwitchToggle,
    parent: StateFormItemSwitch) 
  {
    super()
    this.switchToggleState = switchToggleState
    this.parentDef = parent
  }

  get state(): IStateFormItemSwitchToggle { return this.switchToggleState }
  get parent(): StateFormItemSwitch { return this.parentDef }
  get props(): any { return this.switchToggleState.props }
  get theme(): any { return this.switchToggleState.theme }

  get label(): string { return this.switchToggleState.label ?? '' }
  get name(): string { return this.switchToggleState.name ?? '' }

  get formControlLabelProps(): any {
    return this.switchToggleState.formControlLabelProps
  }
}