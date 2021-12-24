import { defaultCallback } from '.'
import AbstractState from './AbstractState'
import { IStateFormItemCustom, IStateLink } from '../interfaces'
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

  get json() { return this.linkJson }
  get parent() { return this.parentObj }
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }
  get type() { return this.linkJson.type }
  get has() {
    return this.linkHas
      || (this.linkHas = new StateFormItemCustom(
        this.linkHasJson, this
      ))
  }
  get onClick() {
    return this.linkJson.onClick || defaultCallback
  }
  get href() { return this.linkJson.href || '' }

  get(attr: string) { return this.linkJson[attr] }
}
