import StateController from '../../../controllers/state.controller'
import State from '../../controller'

export default class StatePagesData extends StateController {

  private parentDef: State
  private pagesData: any

  constructor(pagesData: any, parent: State) {
    super()
    this.parentDef = parent
    this.pagesData = pagesData
  }

  get state() { return this.pagesData }

  get patched() {
    throw new Error(`'Patched pages data state' NOT implemented.`)
  }

  /**
   * Chain-access to parent (root) definition.
   */
  get parent() { return this.parentDef }

}
