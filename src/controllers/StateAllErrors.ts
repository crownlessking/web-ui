import State from './State'
import AbstractState from './AbstractState'
import { IJsonapiError } from '../interfaces/IJsonapi'

export default class StateAllErrors extends AbstractState {

  private parentDef?: State
  private allErrorsState: IJsonapiError[]

  constructor(allErrorsState: IJsonapiError[], parent?: State) {
    super()
    this.parentDef = parent
    this.allErrorsState = allErrorsState
  }

  get state(): IJsonapiError[] { return this.allErrorsState }
  /** Chain-access to root definition. */
  get parent(): State { return this.parentDef || new State() }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }
}
