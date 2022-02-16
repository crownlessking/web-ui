
import StateSnackbar from './StateSnackbar'
import AbstractState from './AbstractState'
import IStateAnchorOrigin, {
  AnchorHorizontal, AnchorVertical
} from './interfaces/IStateAnchorOrigin'

export default class StateAnchorOrigin
    extends AbstractState implements IStateAnchorOrigin {

  private parentObj: StateSnackbar
  private anchorOriginJson: IStateAnchorOrigin

  constructor(anchorOriginJson: IStateAnchorOrigin, parent: StateSnackbar) {
    super()
    this.parentObj = parent
    this.anchorOriginJson = anchorOriginJson
  }

  get json(): IStateAnchorOrigin { return this.anchorOriginJson }
  get parent(): StateSnackbar { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }

  get vertical(): AnchorVertical { return this.anchorOriginJson.vertical }
  get horizontal(): AnchorHorizontal { return this.anchorOriginJson.horizontal }
}
