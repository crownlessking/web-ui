import { IStateAnchorOrigin } from '../../interfaces'
import StateSnackbar from './snackbar.controller'
import StateController from '../../controllers/state.controller'

export default class StateAnchorOrigin
    extends StateController implements IStateAnchorOrigin {

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
