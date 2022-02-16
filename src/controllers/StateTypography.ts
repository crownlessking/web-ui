import AbstractState from './AbstractState'
import IStateTypography from './interfaces/IStateTypography'
import State from './State'

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
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }
  get color(): string|undefined { return this.typographyJson.color }
  get fontFamily(): string|undefined { return this.typographyJson.fontFamily }
}
