import { IStateLink } from '../../interfaces'

export function getLinkProps(def: IStateLink) {
  const props = { ...def }
  delete props.type
  delete props.has
  delete props.onClick

  return props as any
}
