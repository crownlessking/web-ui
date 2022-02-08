import IStateLink from './IStateLink'

export default interface IAbstractStateDrawer {
  /** List of icons with the descriptions */
  items?: IStateLink[],
  /** Whether the drawer is open or not. */
  open?: boolean
  /** Drawer's width in pixels. */
  width?: number
}

/** Type for a drawer defined within a page. */
export interface IStatePageDrawer extends IAbstractStateDrawer { }
