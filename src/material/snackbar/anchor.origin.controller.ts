import { IStateAnchorOrigin } from '../../interfaces'
import StateSnackbar from './snackbar.controller'
import StateController from '../../controllers/state.controller'

export default class StateAnchorOrigin
    extends StateController implements IStateAnchorOrigin {

  private parentDef: StateSnackbar
  private anchorOrigin: IStateAnchorOrigin

  constructor(anchorOrigin: IStateAnchorOrigin, parent: StateSnackbar) {
    super()
    this.parentDef = parent
    this.anchorOrigin = anchorOrigin
  }

  get state(): IStateAnchorOrigin { return this.anchorOrigin }

  get patched(): IStateAnchorOrigin {
    throw new Error(`'Patched anchor orgin state' NOT implemented.`)
  }

  get parent() { return this.parentDef }

  get vertical() { return this.anchorOrigin.vertical }

  get horizontal() { return this.anchorOrigin.horizontal }

}
