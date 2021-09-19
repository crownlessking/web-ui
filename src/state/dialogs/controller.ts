import StateController from '../../controllers/state.controller'
import State from '../controller'

export default class StateAllDialogs extends StateController {

  private parentObj: State
  private allDialogsJson: any

  constructor(allDialogsJson: any, parent: State) {
    super()
    this.parentObj = parent
    this.allDialogsJson = allDialogsJson
  }

  get json() { return this.allDialogsJson }

  get parent() { return this.parentObj }

}
