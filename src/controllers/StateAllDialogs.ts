import AbstractState from './AbstractState'
import State from './State'

export default class StateAllDialogs extends AbstractState {

  private parentObj: State
  private allDialogsJson: any

  constructor(allDialogsJson: any, parent: State) {
    super()
    this.parentObj = parent
    this.allDialogsJson = allDialogsJson
  }

  get json() { return this.allDialogsJson }

  get parent() { return this.parentObj }

}
