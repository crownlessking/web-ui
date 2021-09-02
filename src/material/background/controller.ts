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
  const background = store.getState().background
  if (background.type === 'color') {
    return store.getState().background.value
  }
  return 'inherit'
}

/**
 * Get the background color of the appbar
 */
export function getAppBarBackgroundStyle(page: IStatePage) {
  const state = store.getState()

  return getVal(page, 'appBar.background.value')
    || getVal(state, 'appBar.background.value')
    || 'inherit'
}

export default class StateBackground<P = State>
    extends StateController implements IStateBackground {

  private background: IStateBackground
  private parentDef: P

  /**
   * Background state.
   *
   * @param background 
   */
  constructor(background: IStateBackground, parent: P) {
    super()
    this.background = background
    this.parentDef = parent
  }

  /**
   * Get a copy of the background state.
   */
  get state(): IStateBackground { return this.background }

  get patched(): IStateBackground {
    throw new Error(`'Patched background state' not implemented yet.`)
  }

  get parent() { return this.parentDef }

  get type() { return this.background.type }

  get value() { return this.background.value }

}
