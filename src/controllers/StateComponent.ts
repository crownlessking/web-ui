import { IAbstractStateComponent } from '../interfaces';
import AbstractState from './AbstractState'

export default class StateComponent<P> extends AbstractState {

  private componentJson: IAbstractStateComponent
  private parentObj: P

  constructor (componentJson: IAbstractStateComponent, parent: P) {
    super()
    this.componentJson = componentJson
    this.parentObj     = parent
  }

  get json() {
    return this.componentJson
  }
  get parent() {
    return this.parentObj
  }

  get tag() { return this.componentJson.tag }
  get theme() { return this.componentJson.theme || {} }
  get props() { return this.componentJson.props || {} }
  get children() { return this.componentJson.children }
  get hasChildren() { return !!this.componentJson.children }
}