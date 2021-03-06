import Controller from './AbstractState'
import State from './State'
import StateForm from './StateForm'
import { err } from '.'
import IStateAllForms from './interfaces/IStateAllForms'

export default class StateAllForms extends Controller {

  private allFormsJson: IStateAllForms
  private parentObj: State
  private lastFormName: string

  constructor (allFormsJson: IStateAllForms, parent: State) {
    super()
    this.parentObj = parent
    this.allFormsJson = allFormsJson
    this.lastFormName = ''
  }

  /** Get all forms json. */
  get json(): IStateAllForms { return this.allFormsJson }
  /** Chain-access to root definition. */
  get parent(): State { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }

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
  getForm = (name: string): StateForm => {
    const formName = this.getStateFormName(name)
    const stateForm = this.allFormsJson[formName]

    if (stateForm) {
      this.lastFormName = formName
      const formDef = new StateForm(stateForm, this)

      return formDef
    }

    err(`${formName} does not exist.`)
    return new StateForm({ items: [] }, this)
  }

  /**
   * Get the (`formName`) name of the last form that was retrieved.
   */
  getLastFormName = (): string => this.lastFormName

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
  private getStateFormName = (name: string): string => {
    return name + 'Form'
  }

}
