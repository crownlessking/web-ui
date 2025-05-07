import { get_val } from '.';
import { dummy_callback, IRedux, TReduxHandle } from '../state';
import AbstractState from './AbstractState';
import IStateFormItemCustom, { THandleCallback } from '../interfaces/IStateFormItemCustom';
import { ler } from '../business.logic/logging';

export default class StateFormItemCustom<P, T = any>
  extends AbstractState
  implements IStateFormItemCustom<T>
{
  protected hasItemsState: T[];
  protected parentDef: P;
  protected hasCallback?: TReduxHandle;
  protected hasClasses: any;
  private _fieldOk = true;

  constructor (protected hasState: IStateFormItemCustom<T>, parent: P) {
    super();
    this.parentDef = parent;
    this.hasItemsState = this.hasState.items || [];
    this.hasCallback = this.hasState.callback;
    this.hasClasses = this.hasState.classes || {};
  }

  get state(): IStateFormItemCustom<T> { return this.hasState; }
  get parent(): P { return this.parentDef; }
  get id(): string { return this.hasState.id ?? ''; }
  get callback(): TReduxHandle { return this.hasCallback || dummy_callback; }
  get classes(): any { return this.hasClasses; }
  get content(): string { return this.hasState.content ?? ''; }
  get color(): string { return this.hasState.color ?? ''; }
  get defaultValue(): string { return this.hasState.defaultValue ?? ''; }
  get faIcon(): string { return this.hasState.faIcon ?? ''; }
  get icon(): string { return this.hasState.icon ?? ''; }
  get svgIcon(): Required<IStateFormItemCustom<T>>['svgIcon'] {
    return this.hasState.svgIcon ?? 'none';
  }
  get iconPosition(): IStateFormItemCustom<T>['iconPosition'] {
    return this.hasState.iconPosition;
  }
  get iconProps() { return this.hasState.iconProps; }
  get items(): T[] { return this.hasItemsState; }
  get label(): string { return this.hasState.label ?? ''; }

  /**
   * 
   * When defining a regular expression in JSON document, you can either
   * use one of the following identifier to get a default regular expression
   * or pass in your own
   * 
   * Types of default regular expressions:
   *
   * #1 username -- returns a regular expression that matches a username
   * #2 email    -- returns a regular expression that matches an email
   * #3 phone    -- returns a regular expression that matches a phone number
   */
  get regexStr(): string {
    const regex = this.hasState.predefinedRegex ?? '';
    switch (regex.toLowerCase()) {
    case 'username':
      // https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username
      return '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$';
    case 'email':
      // https://emailregex.com/
      return "^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
    case 'phone':
      // https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
      return '^(+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$';
    default:
      return regex;
    }
  }

  get route(): string { return this.hasState.route ?? ''; }
  get text(): string { return this.hasState.text ?? ''; }
  get helperText(): string { return this.hasState.helperText ?? ''; }
  get title(): string { return this.hasState.title ?? ''; }
  /**
   * Material UI component attribute.  
   * __Note__: Can be undefined on purpose.
   */
  get variant(): IStateFormItemCustom<T>['variant'] { return this.hasState.variant; }
  get badge(): IStateFormItemCustom<T>['badge'] { return this.hasState.badge; }
  /**
   * to be used with `load` when loading `meta`. e.g.
   * ```ts
   * const meta = stateMeta['load']['key']
   * ```
   */
  get key(): string { return this.hasState.key ?? ''; }
  /** Name of an internally defined callback to be executed. */
  get onclickHandle(): string { return this.hasState.onclickHandle ?? ''; }
  get load(): string { return this.hasState.load ?? ''; }
  get startAdornment(): IStateFormItemCustom<T>['startAdornment'] {
    return this.hasState.startAdornment;
  }
  get endAdornment(): IStateFormItemCustom<T>['endAdornment'] {
    return this.hasState.endAdornment;
  }
  get props(): any { return this.hasState.props || {}; }
  get theme(): any { return this.die('Not implemented yet.', {}); }
  get formControlProps(): any { return this.hasState.formControlProps; }
  get formControlLabelProps(): any { return this.hasState.formControlLabelProps; }
  get formLabelProps(): any { return this.hasState.formLabelProps; }
  get formGroupProps(): any { return this.hasState.formGroupProps; }
  get formHelperTextProps(): any { return this.hasState.formHelperTextProps; }
  /**
   * Check if field value is valid.  
   * `maxLength` or `invalidChars` must be set first. Run the `evaluateVal()`
   * function. Then retrieve the result from this field.
   */
  get validInput(): boolean { return this._fieldOk; }
  get required(): boolean { return this.hasState.required === true; }
  get requiredMessage(): string { return this.hasState.requiredMessage ?? ''; }
  get maxLength(): number | undefined { return this.hasState.maxLength; }
  get maxLengthMessage(): string { return this.hasState.maxLengthMessage ?? ''; }
  get invalidationRegex(): string | undefined { return this.hasState.invalidationRegex; }
  get invalidationMessage(): string { return this.hasState.invalidationMessage ?? ''; }
  get validationRegex(): string | undefined { return this.hasState.validationRegex; }
  get validationMessage(): string { return this.hasState.validationMessage ?? ''; }
  get disableOnError(): boolean { return !!this.hasState.disableOnError; }

  set callback(cb: ((redux:IRedux)=>(e:any)=>void)|undefined) { this.hasCallback = cb; }

  /**
   * Set custom classes for your field.
   *
   * @param classes can be an array of strings, a string, or any other means to
   *                store class names
   */
  set classes(classes: any) { this.hasClasses = classes; }

  /**
   * If `has.regex` is set, you can use this function to do regular
   * expression test.
   *
   * @param value to be tested
   *
   * @returns `true` if the regular expression test on the _passed-in_ value
   *          fails.
   */
  regexError(value: string): boolean {
    if (!this.hasState.predefinedRegex || !value) {
      return false;
    } 
    return !(new RegExp(this.regexStr).test(value));
  }

  /** Set callback */
  getHandleCallback = (
    event: THandleCallback = 'onclick'
  ): TReduxHandle | undefined => {
    const callbackName = this.hasState[`${event}Handle`];
    if (!callbackName) {
      return;
    }
    const callback = get_val(window, callbackName);
    if (typeof callback !== 'function') {
      ler(`Invalid handle: '${callbackName}' not a function`);
      return;
    }
    return callback;
  } // END of method

  /**
   * Evaluates the value of the input field. `maxLength` or `invalidChars` must
   * be set first.
   * @deprecated
   */
  evaluation(value: string) {
    const maxLength = this.hasState.maxLength ?? 0;
    if (maxLength > 0 && value.length > maxLength) {
      this._fieldOk = false;
    }
    if (this._fieldOk && this.hasState.invalidationRegex) {
      this._fieldOk = new RegExp(this.hasState.invalidationRegex).test(value);
    }
  }
}
