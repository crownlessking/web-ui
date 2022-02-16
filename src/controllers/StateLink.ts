import { defaultCallback } from '.'
import AbstractState from './AbstractState'
import IStateFormItemCustom from './interfaces/IStateFormItemCustom'
import IStateLink from './interfaces/IStateLink'
import StateFormItemCustom from './StateFormItemCustom'

export function getLinkProps(def: IStateLink) {
  const props = { ...def } as any
  delete props.type
  delete props.has
  delete props.onClick

  return props
}

export default class StateLink<P = any>
    extends AbstractState implements IStateLink {

  private linkJson: IStateLink
  private parentObj: P
  private linkHasJson: IStateFormItemCustom
  private linkHas?: StateFormItemCustom<this>

  constructor (linkJson: IStateLink, parent: P) {
    super()
    this.linkJson = linkJson
    this.parentObj = parent
    this.linkHasJson = this.linkJson.has || { }
  }

  get json(): IStateLink { return this.linkJson }
  get parent(): P { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }
  get type(): IStateLink['type'] { return this.linkJson.type }
  get has(): StateFormItemCustom<this> {
    return this.linkHas
      || (this.linkHas = new StateFormItemCustom(
        this.linkHasJson, this
      ))
  }
  get onClick() {
    return this.linkJson.onClick || defaultCallback
  }
  get href(): string { return this.linkJson.href || '' }

  get(attr: string): void { return this.linkJson[attr] }
}
