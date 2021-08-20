import StateController from '../../controllers/state.controller'
import State from '../controller'

export default class StateAllDialogs extends StateController {

  private parentDef: State
  private allDialogs: any

  constructor(allDialogs: any, parent: State) {
    super()
    this.parentDef = parent
    this.allDialogs = allDialogs
  }

  get state() { return this.allDialogs }

  get patched() {
    throw new Error(`'Patched allDialogs state' NOT implemented.`)
  }

  get parent() { return this.parentDef }

}
