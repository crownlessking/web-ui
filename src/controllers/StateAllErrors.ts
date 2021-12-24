import { IJsonapiError } from '../interfaces'
import State from './State'
import AbstractState from './AbstractState'

export default class StateAllErrors extends AbstractState {

  private parentObj: State
  private allErrorsJson: IJsonapiError[]

  constructor(allErrorsJson: IJsonapiError[], parent: State) {
    super()
    this.parentObj = parent
    this.allErrorsJson = allErrorsJson
  }

  get json() { return this.allErrorsJson }
  /** Chain-access to root definition. */
  get parent() { return this.parentObj }
  get props() { throw new Error('Not implemented yet.')}
  get theme() { throw new Error('Not implemented yet.') }
}
