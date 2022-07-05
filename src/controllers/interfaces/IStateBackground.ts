import { CSSProperties } from 'react'
import IAbstractState from './IAbstractState'

/**
 * Background color, image, gradient... etc. Any valid CSS background.
 */
export default interface IStateBackground extends IAbstractState {
  color?: string
  /** CSS url or gradient functions */
  image?: string
  repeat?: CSSProperties['backgroundRepeat']
}
