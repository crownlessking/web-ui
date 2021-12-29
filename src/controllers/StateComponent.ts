import { IStateComponent } from '../interfaces';
import AbstractState from './AbstractState'

export default class StateComponent<P = any>
  extends AbstractState
  implements IStateComponent
{
  private componentJson: IStateComponent
  private parentObj: P

  constructor (componentJson: IStateComponent, parent: P) {
    super()
    this.componentJson = componentJson
    this.parentObj     = parent
  }

  get json() { return this.componentJson }
  get parent() { return this.parentObj }
  get type() { return this.componentJson.type || 'div' }
  get theme() { return this.componentJson.theme || {} }
  get props() {
    const props: any = { ...this.componentJson }
    delete props.type
    delete props.theme
    delete props.items
    return props
  }
  get items() { return this.componentJson.items || [] }

  getJson = <T = any>() => this.componentJson as T
}

export function getStateComponents<T>(sc: IStateComponent[], parent: T) {
  return sc.map(component => new StateComponent<T>(component, parent))
}
