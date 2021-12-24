import { IStateBackground } from '../interfaces'
import AbstractState from './AbstractState'
import State from './State'

export default class StateBackground<P = State>
  extends AbstractState implements IStateBackground {

  private backgroundJson: IStateBackground
  private parentObj: P

  /**
  * Background
  *
  * @param backgroundJson 
  */
  constructor(backgroundJson: IStateBackground, parent: P) {
    super()
    this.backgroundJson = backgroundJson
    this.parentObj = parent
  }

  /** Get the background json. */
  get json() { return this.backgroundJson }
  get parent() { return this.parentObj }
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }
  get type() { return this.backgroundJson.type }
  get value() { return this.backgroundJson.value }
}
