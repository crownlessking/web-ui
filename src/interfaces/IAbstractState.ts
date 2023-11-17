
export default interface IAbstractState {
  /** Abstract `id`. */
  _id?: string
  /** Abstract `name` */
  _key?: string
  /** Abstract `type`. */
  _type?: string
  /** Spread me on a react component. */
  props?: any
  /** Use to apply CSS styles. */
  theme?: any
}
