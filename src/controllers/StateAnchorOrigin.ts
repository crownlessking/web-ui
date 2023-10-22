
import StateSnackbar from './StateSnackbar'
import AbstractState from './AbstractState'
import IStateAnchorOrigin, {
  AnchorHorizontal, AnchorVertical
} from './interfaces/IStateAnchorOrigin'

export default class StateAnchorOrigin
    extends AbstractState implements IStateAnchorOrigin {

  private parentDef: StateSnackbar
  private anchorOriginState: IStateAnchorOrigin

  constructor(anchorOriginState: IStateAnchorOrigin, parent: StateSnackbar) {
    super()
    this.parentDef = parent
    this.anchorOriginState = anchorOriginState
  }

  get state(): IStateAnchorOrigin { return this.anchorOriginState }
  get parent(): StateSnackbar { return this.parentDef }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }

  get vertical(): AnchorVertical { return this.anchorOriginState.vertical }
  get horizontal(): AnchorHorizontal { return this.anchorOriginState.horizontal }
}
