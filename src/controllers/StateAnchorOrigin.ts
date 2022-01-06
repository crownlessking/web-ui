
import StateSnackbar from './StateSnackbar'
import AbstractState from './AbstractState'

export type AnchorHorizontal = 'left' | 'center' | 'right'
export type AnchorVertical = 'top' | 'bottom'

export interface IStateAnchorOrigin {
  vertical: AnchorVertical,
  horizontal: AnchorHorizontal
}

export default class StateAnchorOrigin
    extends AbstractState implements IStateAnchorOrigin {

  private parentObj: StateSnackbar
  private anchorOriginJson: IStateAnchorOrigin

  constructor(anchorOriginJson: IStateAnchorOrigin, parent: StateSnackbar) {
    super()
    this.parentObj = parent
    this.anchorOriginJson = anchorOriginJson
  }

  get json() { return this.anchorOriginJson }
  get parent() { return this.parentObj }
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }

  get vertical() { return this.anchorOriginJson.vertical }
  get horizontal() { return this.anchorOriginJson.horizontal }
}
