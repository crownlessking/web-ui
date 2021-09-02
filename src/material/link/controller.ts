import StateController from '../../controllers/state.controller'
import { IStateFormItemCustom, IStateLink } from '../../interfaces'
import StateFormItemCustom from '../form/items/custom.controller'

export function getLinkProps(def: IStateLink) {
  const props = { ...def } as any
  delete props.type
  delete props.has
  delete props.onClick

  return props
}

export default class StateLink<P>
    extends StateController implements IStateLink {

  private link: IStateLink
  private parentDef: P
  private linkHas: IStateFormItemCustom
  private linkHasDef?: StateFormItemCustom<this>

  constructor (link: IStateLink, parent: P) {
    super()
    this.link = link
    this.parentDef = parent
    this.linkHas = this.link.has || { }
  }

  get state() { return this.link }

  get parent() { return this.parentDef }

  get patched () {
    throw new Error(`'Patched state link' NOT implemented.`)
  }

  get type() { return this.link.type }

  get has() {
    return this.linkHasDef
    || (this.linkHasDef = new StateFormItemCustom(
      this.linkHas, this
    ))
  }

  get(prop: string) { return this.link[prop] }

}
