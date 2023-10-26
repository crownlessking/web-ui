import AbstractState from './AbstractState'
import State from './State'
import { IGenericObject } from './interfaces/IState'

export default class StateFormsData extends AbstractState {

  private formsDataState: IGenericObject
  private parentDef?: State

  constructor (formsDataState: IGenericObject, parent?: State) {
    super()
    this.parentDef = parent
    this.formsDataState = formsDataState
  }

  get state(): IGenericObject { return this.formsDataState }
  get parent(): State { return this.parentDef || new State() }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }

  /** Get form field value from redux store. */
  getValue = (formName: string, name: string): any => {
    return this.formsDataState[formName]?.[name] ?? ''
  }

  /**
   * Alias for `getStoredValue()`
   *
   * @param formName
   * @param name
   */
  get = (formName: string) => {
    return this.formsDataState[formName] ?? {}
  }

}
