import AbstractState from './AbstractState'
import State from './State'
import StateAnchorOrigin, { IStateAnchorOrigin } from './StateAnchorOrigin'

/**
 * Redux store snackbar state.
 */
export interface IStateSnackbar {
  anchorOrigin: IStateAnchorOrigin
  autoHideDuration: number
  open?: boolean
  content?: JSX.Element
  message?: string
  actions?: JSX.Element[]
  id?: string
  defaultId: string
  type: 'message' | 'customized' | 'void'
  variant: 'success' | 'error' | 'info' | 'warning'
}

export default class StateSnackbar
    extends AbstractState implements IStateSnackbar {

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
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }
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
