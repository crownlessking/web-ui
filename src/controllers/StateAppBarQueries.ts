import { ler } from '../state'
import { remember_exception } from 'src/state/_errors.business.logic'
import AbstractState from './AbstractState'
import IStateAppBarQueries from './interfaces/IStateAppBarQueries'
import State from './State'

export default class StateAppBarQueries extends AbstractState {
  protected searchesState: IStateAppBarQueries
  protected parentDef?: State

  constructor(searchesState: IStateAppBarQueries, parent?: State) {
    super()
    this.searchesState = searchesState
    this.parentDef = parent
  }

  get state(): IStateAppBarQueries { return this.searchesState }
  get parent(): State { return this.parentDef || new State() }
  get props(): any { return this.die('\'props\' not implemented yet.', {}) }
  get theme(): any { return this.die('\'theme\' not implemented yet.', {}) }

  public getSearchQuery = (route: string): string => {
    try {
      return this.searchesState[route]
    } catch (e) {
      const message = `StateAppBarQueries.getSearchQuery: Page route '${route}' NOT found.`
      ler(message)
      remember_exception(e, message)
    }
    return ''
  }
}