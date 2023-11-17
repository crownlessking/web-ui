import AbstractState from './AbstractState'
import { IGenericObject } from '../interfaces/IState'
import State from './State'

/**
 * This class is a wrapper for the pages data JSON object.
 */
export default class StatePagesData extends AbstractState {

  private parentDef?: State
  private pagesDataState: IGenericObject

  constructor(pagesDataState: IGenericObject, parent?: State) {
    super()
    this.parentDef = parent
    this.pagesDataState = pagesDataState
  }

  get state(): IGenericObject { return this.pagesDataState }
  /** Chain-access to the root definition. */
  get parent(): State { return this.parentDef || new State() }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }
}
