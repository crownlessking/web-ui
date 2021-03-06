import AbstractState from './AbstractState'
import State from './State'
import { log } from '.'

export default class StateFormsData extends AbstractState {

  private formsDataJson: any
  private parentObj: State

  constructor (formsDataJson: any, parent: State) {
    super()
    this.parentObj = parent
    this.formsDataJson = formsDataJson
  }

  get json(): any { return this.formsDataJson }
  get parent(): State { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }

  /**
   * Get form field value from redux store.
   *
   * Also sets the form fields default value if specified in the from definition.
   *
   */
  getStoredValues = (formName: string, name?: string): any => {
    try {
      if (name) {
        return this.formsDataJson[formName][name]
      }
      return this.formsDataJson[formName]
    } catch (e: any) {

      // TODO Implement logic to save error and view it later

      log(e.stack)
    }
  }

  /**
   * Alias for `getStoredValue()`
   *
   * @param formName
   * @param name
   */
  get = (formName: string, name?: string): any => {
    return this.getStoredValues(formName, name)
  }

}
