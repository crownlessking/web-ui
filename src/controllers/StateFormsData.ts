import AbstractState from './AbstractState'
import State from './State'
import Config from '../config'

export default class StateFormsData extends AbstractState {
  
  private formsDataJson: any
  private parentObj: State

  constructor (formsDataJson: any, parent: State) {
    super()
    this.parentObj = parent
    this.formsDataJson = formsDataJson
  }

  get json() { return this.formsDataJson }
  get parent() { return this.parentObj }
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }
  /**
   * Get form field value from redux store.
   *
   * Also sets the form fields default value if specified in the from definition.
   *
   */
  getStoredValues = (formName: string, name?: string) => {
    try {
      if (name) {
        return this.formsDataJson[formName][name]
      }
      return this.formsDataJson[formName]
    } catch (e: any) {

      // TODO Implement logic to save error and view it later

      if (Config.DEBUG) {
        console.log(e.stack)
      }
    }
  }

  /**
   * Alias for `getStoredValue()`
   *
   * @param formName
   * @param name
   */
  get = (formName: string, name?: string) => {
    return this.getStoredValues(formName, name)
  }

}
