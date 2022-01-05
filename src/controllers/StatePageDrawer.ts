import { IAbstractStateDrawer } from './AbstractState'
import StateDrawer from './StateDrawer'
import StatePage from './StatePage'

/** Type for a drawer defined within a page. */
export interface IStatePageDrawer extends IAbstractStateDrawer { }

export default class StatePageDrawer extends StateDrawer<StatePage> { }
