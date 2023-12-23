import { ler } from '../state'
import { remember_exception } from 'src/business.logic/errors'
import AbstractState from './AbstractState'
import IStateAppbarQueries from '../interfaces/IStateAppbarQueries'
import State from './State'

export default class StateAppbarQueries extends AbstractState {
  protected searchesState: IStateAppbarQueries
  protected parentDef?: State

  constructor(searchesState: IStateAppbarQueries, parent?: State) {
    super()
    this.searchesState = searchesState
    this.parentDef = parent
  }

  get state(): IStateAppbarQueries { return this.searchesState }
  get parent(): State { return this.parentDef || new State() }
  get props(): any { return this.die('\'props\' not implemented yet.', {}) }
  get theme(): any { return this.die('\'theme\' not implemented yet.', {}) }

  public getSearchQuery = (route: string): string => {
    try {
      return this.searchesState[route]
    } catch (e) {
      const message = `StateAppbarQueries.getSearchQuery: Page route '${route}' NOT found.`
      ler(message)
      remember_exception(e, message)
    }
    return ''
  }
}