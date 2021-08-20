import StateController from '../../controllers/state.controller'
import State from '../controller'
import { IStateTopLevelLinks } from '../../interfaces'

export default class StateTopLevelLinks extends StateController {

  private parentDef: State
  private topLevelLinks: IStateTopLevelLinks

  constructor(topLevelLinks: IStateTopLevelLinks, parent: State) {
    super()
    this.parentDef = parent
    this.topLevelLinks = topLevelLinks
  }

  get state(): IStateTopLevelLinks { return this.topLevelLinks }

  get patched(): IStateTopLevelLinks {
    throw new Error(`'Patched top level link state' NOT implemented.`)
  }

  get parent() { return this.parentDef }

}
