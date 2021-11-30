import { IStateAnchorOrigin } from '../interfaces'
import StateSnackbar from './StateSnackbar'
import AbstractState from './AbstractState'

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

  get parent() { return this.parentObj }

  get vertical() { return this.anchorOriginJson.vertical }

  get horizontal() { return this.anchorOriginJson.horizontal }

}
