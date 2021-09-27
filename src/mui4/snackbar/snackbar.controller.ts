import { IStateSnackbar } from '../../interfaces'
import StateController from '../../controllers/state.controller'
import State from '../../state/controller'
import StateAnchorOrigin from './anchor.origin.controller'

export default class StateSnackbar
    extends StateController implements IStateSnackbar {

  private parentObj: State
  private snackbarJson:  IStateSnackbar
  private snackbarAnchorOrigin?: StateAnchorOrigin

  constructor(snackbarJson: IStateSnackbar, parent: State) {
    super()
    this.parentObj = parent
    this.snackbarJson = snackbarJson
  }

  get json(): IStateSnackbar { return this.snackbarJson }

  get parent() { return this.parentObj }

  get anchorOrigin() {
    return this.snackbarAnchorOrigin
      || (this.snackbarAnchorOrigin = new StateAnchorOrigin(
          this.snackbarJson.anchorOrigin,
          this
        ))
  }

  get autoHideDuration() { return this.snackbarJson.autoHideDuration }

  get open() { return this.snackbarJson.open || false }

  get content() { return this.snackbarJson.content }

  get message() { return this.snackbarJson.message || '' }

  get actions() { return this.snackbarJson.actions || [] }

  get id() { return this.snackbarJson.id || '' }

  get defaultId() { return this.snackbarJson.defaultId }

  get type() { return this.snackbarJson.type }

  get variant() { return this.snackbarJson.variant }

}
