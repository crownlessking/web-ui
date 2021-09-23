import store from '../../state'
import { IStateDrawer } from '../../interfaces'
import StateController from '../../controllers/state.controller'
import StateLink from '../link/controller'
import State from '../../state/controller'

/**
 * Get the default drawer width.
 */
export function getDrawerWidth() {
  return store.getState().drawer.width
}

export default class StateDrawer<P = State>
    extends StateController implements IStateDrawer {

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

  /**
   * Get the drawer's list of icon links.
   */
  get items() {
    return this.drawerItems
      || (this.drawerItems = this.drawerJson.items.map(
        item => new StateLink<this>(item, this)
      ))
  }

  /**
   * Whether the drawer is open or not.
   */
  get open () { return this.drawerJson.open }

  /**
   * Drawer's width
   */
  get width () { return this.drawerJson.width }

}
