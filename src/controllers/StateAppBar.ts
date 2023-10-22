import { AppBarProps } from '@mui/material'
import AbstractState from './AbstractState'
import IStateAppBar, { TAppBarStyle } from './interfaces/IStateAppBar'
import IStateBackground from './interfaces/IStateBackground'
import IStateTypography from './interfaces/IStateTypography'
import StateAppBarBackground from './templates/StateAppBarBackground'
import StateAppBarTypography from './templates/StateAppBarTypography'
import StateComponent from './StateComponent'
import StateLink from './StateLink'

export default class StateAppBar<P>
  extends AbstractState implements IStateAppBar
{
  protected parentDef: P
  protected appBarState: IStateAppBar
  protected appBarItems?: StateLink<this>[]
  protected appBarItems2?: StateLink<this>[]
  protected appBarTypographyState: IStateTypography
  protected appBarTypography?: StateAppBarTypography<P>
  protected appBarBackgroundState: IStateBackground
  protected appBarBackground?: StateAppBarBackground<P>
  protected appBarComponentsState: Required<IStateAppBar>['components']
  protected appBarComponents: {
    [comp: string]: StateComponent[]
  }

  /**
  * Constructor
  *
  * @param appBarState
  */
   constructor(appBarState: IStateAppBar, parent: P) {
    super()
    this.parentDef = parent
    this.appBarState = appBarState
    this.appBarTypographyState = this.appBarState.typography
      || {}
    this.appBarBackgroundState = this.appBarState.background
      || {}
    this.appBarComponentsState = this.appBarState.components || {}
    this.appBarComponents = {}
  }

  /** Get a copy of the `appBar` json. */
  get state(): IStateAppBar { return this.appBarState }
  get parent(): P { return this.parentDef }
  get theme(): any { return this.appBarState.theme || {} }
  get props(): AppBarProps { return this.appBarState.props || {} }
  get _type(): string { return this.appBarState._type ?? '' }
  get appBarStyle(): TAppBarStyle { return this.appBarState.appBarStyle || 'basic' }

  /** Get app bar link objects. */
  get items(): StateLink<this>[] {
    return this.appBarItems || (
      this.appBarItems = (this.appBarState.items || []).map(
        item => new StateLink(item, this)
      )
    )
  }

  /** Get secondary app bar link objects if applicable. */
  get items2(): StateLink<this>[] {
    return this.appBarItems2 || (
      this.appBarItems2 = (this.appBarState.items2 || []).map(
        item => new StateLink(item, this)
      )
    )
  }

  get logoTheme(): any { return this.appBarState.logoTheme || {} }

  getComponentItem(c: string): StateComponent<this>[] {
    if (this.appBarComponents[c]) {
      return this.appBarComponents[c]
    }
    if (this.appBarComponentsState[c]) {
      return this.appBarComponents[c] = this.appBarComponentsState[c].map(
        comp => new StateComponent(comp, this)
      )
    }
    return []
  }

} // END class StateAppBar --------------------------------------------------
