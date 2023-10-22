import AbstractState from './AbstractState'
import IStateComponent from './interfaces/IStateComponent'

export default class StateComponent<P = any>
  extends AbstractState
  implements IStateComponent
{
  private componentState: IStateComponent
  private parentDef: P
  private componentItems?: StateComponent[]

  constructor (componentState: IStateComponent, parent: P) {
    super()
    this.componentState = componentState
    this.parentDef     = parent
  }

  get state(): IStateComponent { return this.componentState }
  get parent(): P { return this.parentDef }
  get type(): string { return this.componentState._type || 'div' }
  get theme(): any { return this.componentState.theme || {} }
  get props(): any {
    const props: any = { ...this.componentState }
    delete props.type
    delete props.theme
    delete props.items
    return props
  }
  get items(): StateComponent<P>[] {
    return this.componentItems = this.componentItems
      || (this.componentItems = (this.componentState.items || []).map(
        (item: IStateComponent) => new StateComponent(item, this)
      ))
  }

  getJson = <T = any>(): T => this.componentState as T
}

export function getStateComponents<T>(
  sc: IStateComponent[],
  parent: T
): StateComponent<T>[] {
  return sc.map(component => new StateComponent<T>(component, parent))
}
