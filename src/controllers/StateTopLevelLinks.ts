import AbstractState from './AbstractState'
import State from './State'
import { IJsonapiPaginationLinks } from './StateNet'

export interface IStateTopLevelLinks {
  [endpoint: string]: IJsonapiPaginationLinks
}

export default class StateTopLevelLinks extends AbstractState {

  private parentObj: State
  private topLevelLinksJson: IStateTopLevelLinks

  constructor(topLevelLinksJson: IStateTopLevelLinks, parent: State) {
    super()
    this.parentObj = parent
    this.topLevelLinksJson = topLevelLinksJson
  }

  get json(): IStateTopLevelLinks { return this.topLevelLinksJson }
  get parent() { return this.parentObj }
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }
}
