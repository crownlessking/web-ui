import { CSSProperties } from 'react'
import { SxProps } from '@mui/material'
import AbstractState from './AbstractState'
import IStateBackground from './interfaces/IStateBackground'
import State from './State'

export default class StateBackground<P = State>
  extends AbstractState implements IStateBackground {

  private backgroundState: IStateBackground
  private parentDef: P

  /**
  * Background
  *
  * @param backgroundState 
  */
  constructor(backgroundState: IStateBackground, parent: P) {
    super()
    this.backgroundState = backgroundState
    this.parentDef = parent
  }

  /** Get the background json. */
  get state(): IStateBackground { return this.backgroundState }
  get parent(): P { return this.parentDef }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }
  get color(): CSSProperties['backgroundColor'] { return this.backgroundState.color }
  get image(): CSSProperties['backgroundImage'] { return this.backgroundState.image }
  get repeat(): CSSProperties['backgroundRepeat'] { return this.backgroundState.repeat }

  get sx(): SxProps {
    return {
      backgroundColor: this.backgroundState.color,
      backgroundImage: this.backgroundState.image,
      backgroundRepeat: this.backgroundState.repeat
    }
  }
}
