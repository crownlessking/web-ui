import IAbstractState from './IAbstractState'

/**
 * Background color, image, gradient... etc. Any valid CSS background.
 */
export default interface IStateBackground extends IAbstractState {
  /** The background type. */
  type: 'none' | 'color' | 'gradient' | 'image'
  /** Any valid CSS value for the background property. */
  value?: string | number
}
