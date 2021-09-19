import store from '../../state'
import { getVal } from '../../controllers'
import { IStatePage, IStateBackground } from '../../interfaces'
import StateController from '../../controllers/state.controller'
import State from '../../state/controller'

/**
 * Get the background color of the app as a CSS value
 *
 * e.g. #ffffff
 */
export function getBackgroundColor() {
  const backgroundJson = store.getState().background
  if (backgroundJson.type === 'color') {
    return backgroundJson.value
  }
  return 'inherit'
}

/**
 * Get the background color of the appbar
 */
export function getAppBarBackgroundStyle(pageJson: IStatePage) {
  const state = store.getState()

  return getVal(pageJson, 'appBar.background.value')
    || getVal(state, 'appBar.background.value')
    || 'inherit'
}

export default class StateBackground<P = State>
    extends StateController implements IStateBackground {

  private backgroundJson: IStateBackground
  private parentObj: P

  /**
   * Background
   *
   * @param backgroundJson 
   */
  constructor(backgroundJson: IStateBackground, parent: P) {
    super()
    this.backgroundJson = backgroundJson
    this.parentObj = parent
  }

  /**
   * Get a copy of the background json.
   */
  get json(): IStateBackground { return this.backgroundJson }

  get parent() { return this.parentObj }

  get type() { return this.backgroundJson.type }

  get value() { return this.backgroundJson.value }

}
