import AbstractState from './AbstractState'
import IStateAnchorOrigin from './interfaces/IStateAnchorOrigin'
import IStateSnackbar from './interfaces/IStateSnackbar'
import State from './State'
import StateAnchorOrigin from './StateAnchorOrigin'

export default class StateSnackbar
    extends AbstractState implements IStateSnackbar {

  private parentDef?: State
  private snackbarState:  IStateSnackbar
  private snackbarAnchorOrigin?: StateAnchorOrigin

  constructor(snackbarState: IStateSnackbar, parent?: State) {
    super()
    this.parentDef = parent
    this.snackbarState = snackbarState
  }

  get state(): IStateSnackbar { return this.snackbarState }
  get parent(): State { return this.parentDef || new State() }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }
  get anchorOrigin(): StateAnchorOrigin {
    return this.snackbarAnchorOrigin
      || (this.snackbarAnchorOrigin = new StateAnchorOrigin(
          this.getAnchorOrigin(),
          this
        ))
  }
  get autoHideDuration(): number {
    return this.snackbarState.autoHideDuration || 6000
  }
  get open(): boolean { return this.snackbarState.open || false }
  get content(): JSX.Element|undefined { return this.snackbarState.content }
  get message(): string { return this.snackbarState.message ?? '' }
  get actions(): JSX.Element[] { return this.snackbarState.actions || [] }
  get id(): string { return this.snackbarState.id ?? '' }
  get defaultId(): string {
    return this.snackbarState.defaultId || `message-${Date.now().toString()}`
  }
  get type(): Required<IStateSnackbar>['type'] {
    return this.snackbarState.type || 'message'
  }
  get variant(): Required<IStateSnackbar>['variant'] {
    return this.snackbarState.variant || 'info'
  }

  /** Provides a default anchorOrigin if its not defined. */
  private getAnchorOrigin = (): IStateAnchorOrigin => {
    return this.snackbarState.anchorOrigin || {
      vertical: 'bottom',
      horizontal: 'left'
    }
  }
}
