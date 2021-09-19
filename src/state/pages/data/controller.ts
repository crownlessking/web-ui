import StateController from '../../../controllers/state.controller'
import State from '../../controller'

export default class StatePagesData extends StateController {

  private parentObj: State
  private pagesDataJson: any

  constructor(pagesDataJson: any, parent: State) {
    super()
    this.parentObj = parent
    this.pagesDataJson = pagesDataJson
  }

  get json() { return this.pagesDataJson }

  /**
   * Chain-access to parent (root) definition.
   */
  get parent() { return this.parentObj }

}
