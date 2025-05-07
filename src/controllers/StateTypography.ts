import AbstractState from './AbstractState';
import IStateTypography from '../interfaces/IStateTypography';
import State from './State';

export default class StateTypography<P = State>
  extends AbstractState implements IStateTypography
{
  protected typographyState: IStateTypography;
  protected parentDef: P;

  /**
  * Constructor
  *
  * @param typographyState 
  */
  constructor(
    typographyState: IStateTypography,
    parent: P
  ) {
    super();
    this.typographyState = typographyState; //  || { color: 'inherit' }
    this.parentDef = parent;
  }

  /** Get the typography json. */
  get state(): IStateTypography { return this.typographyState; }
  /** Chain-access to root, page, or appbar definition. */
  get parent(): P { return this.parentDef; }
  get props(): any { return this.die('Not implemented yet.', {}); }
  get theme(): any { return this.die('Not implemented yet.', {}); }
  get color(): string|undefined { return this.typographyState.color; }
  get fontFamily(): string|undefined { return this.typographyState.fontFamily; }
}
