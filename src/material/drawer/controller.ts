import store from '../../state'
import { IStateLink, IRedux, IStateDrawer } from '../../interfaces'
import { dummyCallback } from '../../controllers'
import StateController from '../../controllers/state.controller'
import StateLink from '../link/controller'
import State from '../../state/controller'

/**
 * Get the default drawer width.
 */
export function getDrawerWidth() {
  return store.getState().drawer.width
}

/**
 * 
 * The code used to generate the icons for the drawer is a minimalistic function
 * e.i.
 * It is a fat-arrow function and it only returns an object.
 * I didn't want to add more lines of code to that phat-arrow minimalistic
 * function so I moved this code here.
 *
 * @param def
 * @param redux
 */
export function getListItemCallback(def: IStateLink, redux: IRedux) {
  const newDef = { ...def }
  newDef.onClick = newDef.onClick || dummyCallback

  return newDef.onClick(redux)
}

export default class StateDrawer<P = State>
    extends StateController implements IStateDrawer {

  private drawer: IStateDrawer
  private parentDef: P
  private drawerItemsDef?: StateLink<this>[]

  constructor (drawer: IStateDrawer, parent: P) {
    super()
    this.drawer = drawer
    this.parentDef = parent
  }

  get state(): IStateDrawer { return this.drawer }

  get patched () {
    throw new Error(`'Patched drawer state'NOT implemented yet.`)
  }

  get parent () { return this.parentDef }

  /**
   * Get the drawer's list of icon links.
   */
  get items() {
    return this.drawerItemsDef
    || (this.drawerItemsDef = this.drawer.items.map(item => {
      return new StateLink<this>(item, this)
    }))
  }

  /**
   * Whether the drawer is open or not.
   */
  get open () { return this.drawer.open }

  /**
   * Drawer's width
   */
  get width () { return this.drawer.width }

}
