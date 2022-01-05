import store from '../state'
import { IStateDrawer } from '../interfaces'
import AbstractState from './AbstractState'
import StateLink from './StateLink'
import State from './State'

/** Default drawer state. Contains icons and descriptions. */
export type IStateDrawer = Required<IAbstractStateDrawer>

/**
 * Get the default drawer width.
 */
export function getDrawerWidth() {
  return store.getState().drawer.width
}

export default class StateDrawer<P = State>
    extends AbstractState implements IStateDrawer {

  protected drawerJson: IStateDrawer
  protected parentObj: P
  protected drawerItems?: StateLink<StateDrawer<P>>[]

  constructor (drawerJson: IStateDrawer, parent: P) {
    super()
    this.drawerJson = drawerJson
    this.parentObj = parent
  }

  get json(): IStateDrawer { return this.drawerJson }
  get parent () { return this.parentObj }
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }
  /** Get the drawer's list of icon links. */
  get items() {
    return this.drawerItems
      || (this.drawerItems = this.drawerJson.items.map(
        item => new StateLink<this>(item, this)
      ))
  }
  /** Whether the drawer is open or not. */
  get open () { return this.drawerJson.open }
  /** Drawer's width */
  get width () { return this.drawerJson.width }
}
