import AbstractState from './AbstractState'
import StateLink from './StateLink'
import State from './State'
import { IStateDrawer } from './interfaces/IAbstracStateDrawer'

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
  get parent(): P { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }
  /** Get the drawer's list of icon links. */
  get items(): StateLink[] {
    return this.drawerItems
      || (this.drawerItems = this.drawerJson.items.map(
        item => new StateLink<this>(item, this)
      ))
  }
  /** Whether the drawer is open or not. */
  get open(): boolean { return this.drawerJson.open }
  /** Drawer's width */
  get width(): number { return this.drawerJson.width }
}
