
export default interface IAbstractState {
  /** Spreadable props */
  [props: string]: any
}

/** @see https://stackoverflow.com/a/61108377/1875859 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
