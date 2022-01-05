import AbstractState from './AbstractState'
import State from './State'

/**
 * Type for changing the font and color of the appbar.
 */
 export interface IStateTypography {
  /** Any valid CSS color. */
  color?: string
  /** Any valid value for the `font-family` CSS property. */
  fontFamily?: string
}

export default class StateTypography<P = State>
  extends AbstractState implements IStateTypography {

  protected typographyJson: IStateTypography
  protected parentObj: P

  /**
  * Constructor
  *
  * @param typographyJson 
  */
  constructor(
    typographyJson: IStateTypography,
    parent: P
  ) {
    super()
    this.typographyJson = typographyJson //  || { color: 'inherit' }
    this.parentObj = parent
  }

  /** Get the typography json. */
  get json(): IStateTypography { return this.typographyJson }
  /** Chain-access to root, page, or appBar definition. */
  get parent(): P { return this.parentObj }
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }
  get color() { return this.typographyJson.color }
  get fontFamily() { return this.typographyJson.fontFamily }
}
