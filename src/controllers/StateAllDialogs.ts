import AbstractState from './AbstractState'
import State from './State'
import { IStateDialog } from './StateDialog'

/**
 * Contains all dialog states.
 */
 export interface IStateAllDialogs {
  [x: string]: IStateDialog
}

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
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }
}
