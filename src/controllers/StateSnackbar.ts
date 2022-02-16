import AbstractState from './AbstractState'
import IStateAnchorOrigin from './interfaces/IStateAnchorOrigin'
import IStateSnackbar from './interfaces/IStateSnackbar'
import State from './State'
import StateAnchorOrigin from './StateAnchorOrigin'

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
  get parent(): State { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }
  get anchorOrigin(): StateAnchorOrigin {
    return this.snackbarAnchorOrigin
      || (this.snackbarAnchorOrigin = new StateAnchorOrigin(
          this.getAnchorOrigin(),
          this
        ))
  }
  get autoHideDuration(): number {
    return this.snackbarJson.autoHideDuration || 6000
  }
  get open(): boolean { return this.snackbarJson.open || false }
  get content(): JSX.Element|undefined { return this.snackbarJson.content }
  get message(): string { return this.snackbarJson.message || '' }
  get actions(): JSX.Element[] { return this.snackbarJson.actions || [] }
  get id(): string { return this.snackbarJson.id || '' }
  get defaultId(): string {
    return this.snackbarJson.defaultId || `message-${Date.now().toString()}`
  }
  get type(): Required<IStateSnackbar>['type'] {
    return this.snackbarJson.type || 'message'
  }
  get variant(): Required<IStateSnackbar>['variant'] {
    return this.snackbarJson.variant || 'info'
  }

  /** Provides a default anchorOrigin if its not defined. */
  private getAnchorOrigin = (): IStateAnchorOrigin => {
    return this.snackbarJson.anchorOrigin || {
      vertical: 'bottom',
      horizontal: 'left'
    }
  }
}
