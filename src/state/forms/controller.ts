import Controller from '../../controllers/state.controller'
import { IStateAllForms } from '../../interfaces'
import State from '../controller'
import StateForm from './form.controller'

export default class StateAllForms extends Controller {

  private allForms: IStateAllForms
  private parentDef: State
  private lastFormName: string

  constructor (allForms: IStateAllForms, parent: State) {
    super()
    this.parentDef = parent
    this.allForms = allForms
    this.lastFormName = ''
  }

  /**
   * Get a copy of all forms state.
   */
  get state() { return this.allForms }

  get patched() {
    throw new Error(`'Patched all forms' NOT implemented yet.`)
  }

  /**
   * Chain-access to parent (root) state definition.
   */
  get parent() { return this.parentDef }

  /**
   * Get (chain-access to) the form definition.
   *
   * __Problem__: We implemented a solution for applying default values to form
   * fields. However, although it worked, the solution caused React to complain.
   * To stop react from complaining we had to move the solution from `render()`
   * to `componentDidMount()`.
   * Since we do not want duplicate codes, we decided to move the part of the
   * logic that involves acquiring the form state to this function.
   *
   * @param name 
   */
  getForm = (name: string) => {
    const formName = this.getStateFormName(name)
    const stateForm = this.allForms[formName]

    if (stateForm) {
      this.lastFormName = formName
      const formDef = new StateForm(stateForm, this)

      return formDef
    }

    throw new Error(`Form '${name}'Name does not exist.`)
  }

  /**
   * Get the (`formName`) name of the last form that was retrieved.
   */
  getLastFormName = () => this.lastFormName

  /**
   * Get the form state name
   *
   * __Problem__: We needed a way to get the `formName` without the use of any
   * other information. This problem arised while attempting to display a form
   * in the fullscreen dialog of the virtualized table, which appears when
   * clicking on a row to edit or view data in greater detail.
   *
   * @param name 
   */
  private getStateFormName = (name: string) => {
    return name + 'Form'
  }

}
