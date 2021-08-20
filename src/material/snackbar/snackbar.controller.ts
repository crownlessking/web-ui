import { IStateSnackbar } from '../../interfaces'
import StateController from '../../controllers/state.controller'
import State from '../../state/controller'
import StateAnchorOrigin from './anchor.origin.controller'

export default class StateSnackbar
    extends StateController implements IStateSnackbar {

  private parentDef: State
  private snackbar:  IStateSnackbar
  private snackbarAnchorOriginDef?: StateAnchorOrigin

  constructor(snackbar: IStateSnackbar, parent: State) {
    super()
    this.parentDef = parent
    this.snackbar = snackbar
  }

  get state(): IStateSnackbar { return this.snackbar }

  get patched(): IStateSnackbar {
    throw new Error(`'Patched snackbar state' NOT implemented.`)
  }

  get parent() { return this.parentDef }

  get anchorOrigin() {
    return this.snackbarAnchorOriginDef
      || (this.snackbarAnchorOriginDef = new StateAnchorOrigin(
          this.snackbar.anchorOrigin,
          this
        ))
  }

  get autoHideDuration() { return this.snackbar.autoHideDuration }

  get open() { return this.snackbar.open || false }

  get content() { return this.snackbar.content }

  get message() { return this.snackbar.message || '' }

  get actions() { return this.snackbar.actions || [] }

  get id() { return this.snackbar.id || '' }

  get defaultId() { return this.snackbar.defaultId }

  get type() { return this.snackbar.type }

  get variant() { return this.snackbar.variant }

}
