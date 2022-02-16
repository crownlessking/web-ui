import AbstractState from './AbstractState'
import State from './State'

export default class StatePagesData extends AbstractState {

  private parentObj: State
  private pagesDataJson: any

  constructor(pagesDataJson: any, parent: State) {
    super()
    this.parentObj = parent
    this.pagesDataJson = pagesDataJson
  }

  get json(): any { return this.pagesDataJson }
  /** Chain-access to the root definition. */
  get parent(): State { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }
}
