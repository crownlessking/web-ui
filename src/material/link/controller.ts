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

  get type() { return this.linkJson.type }

  get has() {
    return this.linkHas
    || (this.linkHas = new StateFormItemCustom(
      this.linkHasJson, this
    ))
  }

  get(prop: string) { return this.linkJson[prop] }

}
