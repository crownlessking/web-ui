import Controller from './AbstractState'
import State from './State'
import StateForm from './StateForm'
import IStateAllForms from '../interfaces/IStateAllForms'
import { log } from '../state'

export default class StateAllForms extends Controller {

  private allFormsState: IStateAllForms
  private parentDef?: State
  private lastFormName: string

  constructor (allFormsState: IStateAllForms, parent?: State) {
    super()
    this.parentDef = parent
    this.allFormsState = allFormsState
    this.lastFormName = ''
  }

  /** Get all forms json. */
  get state(): IStateAllForms { return this.allFormsState }
  /** Chain-access to root definition. */
  get parent(): State { return this.parentDef || new State() }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }

  getForm = (name: string): StateForm | null => {
    const formName = this.getStateFormName(name)
    const formState = this.allFormsState[formName]

    if (formState) {
      this.lastFormName = formName
      const formDef = new StateForm(formState, this)

      return formDef
    }

    log(`${formName} not found or misspelled.`)
    return null
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
