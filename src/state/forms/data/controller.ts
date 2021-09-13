import StateController from '../../../controllers/state.controller'
import State from '../../controller'
import Config from '../../../config'

export default class StateFormsData extends StateController {
  
  private formsData: any
  private parentDef: State

  constructor (formsData: any, parent: State) {
    super()
    this.parentDef = parent
    this.formsData = formsData
  }

  get state() { return this.formsData }

  get patched() {
    throw new Error(`'Patched version formsData' NOT implemented.`)
  }

  get parent() { return this.parentDef }

  /**
   * Get form field value from redux store.
   *
   * Also sets the form fields default value if specified in the from definition.
   *
   */
  getStoredValues = (formName: string, name?: string) => {
    try {
      if (name) {
        return this.formsData[formName][name]
      }
      return this.formsData[formName]
    } catch (e: any) {

      // TODO Implement logic to save error and view it later

      if (Config.DEBUG) {
        console.log(e.stack)
      }
    }
  } // END getStoredValue

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
