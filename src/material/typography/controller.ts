import store from '../../state'
import { getVal } from '../../controllers'
import { IStatePage, IStateTypography } from '../../interfaces'
import State from '../../state/controller'
import StateController from '../../controllers/state.controller'

export function getAppBarFontColor(page: IStatePage) {
  const state = store.getState()

  return getVal(page, 'appBar.typography.color')
    || getVal(state, 'appBar.typography.color')
    || undefined
}

export function getAppBarFontFamily(page: IStatePage) {
  const state = store.getState()

  return getVal(page, 'appBar.typography.fontFamily')
    || getVal(state, 'appBar.typography.fontFamily')
    || undefined
}

export default class StateTypography<P = State>
    extends StateController implements IStateTypography {

  protected typography: IStateTypography
  protected parentDef: P

  /**
   * Constructor
   *
   * @param typography 
   */
  constructor(
    typography: IStateTypography,
    parent: P
  ) {
    super()
    this.typography = typography //  || { color: 'inherit' }
    this.parentDef = parent
  }

  /**
   * Get a copy of the typography definition
   */
  get state(): IStateTypography { return this.typography }

  /**
   * Get a patched copy of the typography definition
   */
  get patched() {
    throw new Error(`'Patched typography state' NOT implemented.`)
  }

  /**
   * Chain-access to (root or page or appBar) definition.
   */
  get parent(): P { return this.parentDef }

  get color() { return this.typography.color }

  get fontFamily() { return this.typography.fontFamily }

}
