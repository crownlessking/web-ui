import { CSSProperties } from '@mui/styles'
import AbstractState from './AbstractState'
import IStateBackground from './interfaces/IStateBackground'
import State from './State'

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
  get json(): IStateBackground { return this.backgroundJson }
  get parent(): P { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }
  get type(): IStateBackground['type'] { return this.backgroundJson.type }
  get value(): IStateBackground['value'] { return this.backgroundJson.value }

  getJss(): CSSProperties {
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
