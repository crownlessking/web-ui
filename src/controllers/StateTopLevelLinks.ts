import AbstractState from './AbstractState'
import IStateTopLevelLinks from './interfaces/IStateTopLevelLinks'
import State from './State'

export default class StateTopLevelLinks extends AbstractState {

  private parentObj: State
  private topLevelLinksJson: IStateTopLevelLinks

  constructor(topLevelLinksJson: IStateTopLevelLinks, parent: State) {
    super()
    this.parentObj = parent
    this.topLevelLinksJson = topLevelLinksJson
  }

  get json(): IStateTopLevelLinks { return this.topLevelLinksJson }
  get parent(): State { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }
}
