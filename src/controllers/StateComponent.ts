import AbstractState from './AbstractState'
import IStateComponent from './interfaces/IStateComponent'

export default class StateComponent<P = any>
  extends AbstractState
  implements IStateComponent
{
  private componentJson: IStateComponent
  private parentObj: P
  private componentItems?: StateComponent[]

  constructor (componentJson: IStateComponent, parent: P) {
    super()
    this.componentJson = componentJson
    this.parentObj     = parent
  }

  get json(): IStateComponent { return this.componentJson }
  get parent(): P { return this.parentObj }
  get type(): string { return this.componentJson.type || 'div' }
  get theme(): any { return this.componentJson.theme || {} }
  get props(): any {
    const props: any = { ...this.componentJson }
    delete props.type
    delete props.theme
    delete props.items
    return props
  }
  get items(): StateComponent<P>[] {
    return this.componentItems = this.componentItems
      || (this.componentItems = (this.componentJson.items || []).map(
        (item: IStateComponent) => new StateComponent(item, this)
      ))
  }

  getJson = <T = any>(): T => this.componentJson as T
}

export function getStateComponents<T>(
  sc: IStateComponent[],
  parent: T
): StateComponent<T>[] {
  return sc.map(component => new StateComponent<T>(component, parent))
}
