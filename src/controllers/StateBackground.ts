import { CSSProperties } from 'react'
import { SxProps } from '@mui/material'
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
  get color(): CSSProperties['backgroundColor'] { return this.backgroundJson.color }
  get image(): CSSProperties['backgroundImage'] { return this.backgroundJson.image }
  get repeat(): CSSProperties['backgroundRepeat'] { return this.backgroundJson.repeat }

  get sx(): SxProps {
    return {
      backgroundColor: this.backgroundJson.color,
      backgroundImage: this.backgroundJson.image,
      backgroundRepeat: this.backgroundJson.repeat
    }
  }
}
