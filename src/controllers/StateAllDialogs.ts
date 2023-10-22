import AbstractState from './AbstractState'
import IStateAllDialogs from './interfaces/IStateAllDialogs'
import State from './State'

export default class StateAllDialogs extends AbstractState {

  private parentDef?: State
  private allDialogsState: IStateAllDialogs

  constructor(allDialogsState: any, parent?: State) {
    super()
    this.parentDef = parent
    this.allDialogsState = allDialogsState
  }

  get state(): IStateAllDialogs { return this.allDialogsState }
  get parent(): State { return this.parentDef || new State() }
  get props(): any {
    return this.die('Not implemented yet.', {})
  }
  get theme(): any {
    return this.die('Not implemented yet.', {})
  }
}
