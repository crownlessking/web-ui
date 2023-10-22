
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

/**
 * Makes a single property optional.
 *
 * @see https://stackoverflow.com/a/61108377/1875859
 */
export type TOptional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

