import State from './State'
import AbstractState from './AbstractState'
import { IJsonapiError } from './interfaces/IStateNet'

export default class StateAllErrors extends AbstractState {

  private parentObj: State
  private allErrorsJson: IJsonapiError[]

  constructor(allErrorsJson: IJsonapiError[], parent: State) {
    super()
    this.parentObj = parent
    this.allErrorsJson = allErrorsJson
  }

  get json(): IJsonapiError[] { return this.allErrorsJson }
  /** Chain-access to root definition. */
  get parent(): State { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.')}
  get theme(): any { throw new Error('Not implemented yet.') }
}
