import AbstractState, { IAbstractState } from './AbstractState'
import State from './State'

/**
 * Background color, image, gradient... etc. Any valid CSS background.
 */
 export interface IStateBackground extends IAbstractState {
  /** The background type. */
  type: 'none' | 'color' | 'gradient' | 'image'
  /** Any valid CSS value for the background property. */
  value?: string | number
}

export default class StateBackground<P = State>
  extends AbstractState implements IStateBackground {

  private backgroundJson: IStateBackground
  private parentObj: P

  /**
  * Background
  *
  * @param backgroundJson 
  */
  constructor(backgroundJson: IStateBackground, parent: P) {
    super()
    this.backgroundJson = backgroundJson
    this.parentObj = parent
  }

  /** Get the background json. */
  get json() { return this.backgroundJson }
  get parent() { return this.parentObj }
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }
  get type() { return this.backgroundJson.type }
  get value() { return this.backgroundJson.value }

  getJss() {
    switch (this.type) {
    case 'color':
      return { backgroundColor: this.value+'' }
    case 'gradient':
    case 'image':
      return { backgroundImage: this.value+'' }
    case 'none':
      return {}
    }
  }
}
