import { IRedux } from '../state'
import AbstractState from './AbstractState'
import IStateFormItemCustom from './interfaces/IStateFormItemCustom'

export default class StateFormItemCustom<P, T = any>
    extends AbstractState implements IStateFormItemCustom<T> {

  protected hasJson: IStateFormItemCustom<T>
  protected hasItemsJson: T[]
  protected parentObj: P
  protected hasCallback?: ((redux:IRedux)=>(e:any)=>void)
  protected hasClasses: any

  constructor (hasJson: IStateFormItemCustom, parent: P) {
    super()
    this.parentObj = parent
    this.hasJson = hasJson
    this.hasItemsJson = this.hasJson.items || []
    this.hasCallback = this.hasJson.callback
    this.hasClasses = this.hasJson.classes || {}
  }

  get json(): IStateFormItemCustom<T> { return this.hasJson }
  get parent(): P { return this.parentObj }
  get callback() { return this.hasCallback }
  get classes(): any { return this.hasClasses }
  get content(): string { return this.hasJson.content || '' }
  get color(): string { return this.hasJson.color || '' }
  get defaultValue(): string { return this.hasJson.defaultValue || '' }
  get faIcon(): string { return this.hasJson.faIcon || '' }
  get icon(): string { return this.hasJson.icon || '' }
  get iconPosition(): IStateFormItemCustom<T>['iconPosition'] {
    return this.hasJson.iconPosition
  }
  get items(): T[] { return this.hasItemsJson }
  get label(): string { return this.hasJson.label || '' }

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
  get regex(): string {
    const regex = this.hasJson.regex || ''
    switch (regex.toLowerCase()) {
    case 'username':
      // https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username
      return '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
    case 'email':
      // https://emailregex.com/
      return "^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$"
    case 'phone':
      // https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
      return '^(+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$'
    default:
      return regex
    }
  }

  get route(): string { return this.hasJson.route || '' }
  get text(): string { return this.hasJson.text || '' }
  get title(): string { return this.hasJson.title || '' }
  /**
   * Material UI component attribute.  
   * __Note__: Can be undefined on purpose.
   */
  get variant(): IStateFormItemCustom<T>['variant'] { return this.hasJson.variant }
  get badge(): IStateFormItemCustom<T>['badge'] { return this.hasJson.badge }
  /**
   * to be used with `load` when loading `meta`. e.g.
   * ```ts
   * const meta = stateMeta['load']['key']
   * ```
   */
  get key(): string { return this.hasJson.key || '' }
  /** Name of an internally defined callback to be executed. */
  get handle(): string { return this.hasJson.handle || '' }
  get load(): string { return this.hasJson.load || '' }
  get startAdornment(): IStateFormItemCustom<T>['startAdornment'] {
    return this.hasJson.startAdornment
  }
  get endAdornment(): IStateFormItemCustom<T>['endAdornment'] {
    return this.hasJson.endAdornment
  }
  /** Icon component props. */
  get props(): any { return this.hasJson.props || {} }
  get theme(): any { throw new Error('Not implemented yet.') }

  set callback(cb: ((redux:IRedux)=>(e:any)=>void)|undefined) { this.hasCallback = cb }

  /**
   * Set custom classes for your field.
   *
   * @param classes can be an array of strings, a string, or any other means to
   *                store class names
   */
  set classes(classes: any) { this.hasClasses = classes }

  /**
   * If `has.regex` is set, you can use this function to do regular
   * expression test.
   *
   * @param value to be tested
   *
   * @returns `true` if the regular expression test on the _passed-in_ value
   *          fails.
   */
  public regexError(value: string): boolean {
    if (!this.hasJson.regex) {
      return false
    } else if (!value) {
      return false
    } else {
      return !(new RegExp(this.regex).test(value))
    }
  }

}
