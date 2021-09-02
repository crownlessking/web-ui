import { IStateFormItemCustom, IRedux } from '../../../interfaces'
import StateController from '../../../controllers/state.controller'

export default class StateFormItemCustom<P, T = any>
    extends StateController implements IStateFormItemCustom {

  private has: IStateFormItemCustom<T>
  private parentDef: P
  private hasItems: T[]
  private hasCallback?: ((redux:IRedux)=>(e:any)=>void)
  private hasClasses: any

  constructor (has: IStateFormItemCustom<T>, parent: P) {
    super()
    this.parentDef = parent
    this.has = has
    this.hasItems = this.has.items || []
    this.hasCallback = this.has.callback
    this.hasClasses = this.has.classes || {}
  }

  get state () { return this.has }

  get patched (): IStateFormItemCustom {
    throw new Error(`'Patched custom form item' NOT implemented.`)
  }

  get parent() { return this.parentDef }

  get callback() { return this.hasCallback }

  get classes() { return this.hasClasses }
  
  get content() { return this.has.content || '' }

  get color() { return this.has.color }

  get defaultValue() { return this.has.defaultValue || '' }

  get faIcon() { return this.has.faIcon || '' }

  get icon() { return this.has.icon || '' }

  get iconPosition() { return this.has.iconPosition }

  get items() { return this.hasItems }

  get label() { return this.has.label || '' }

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
  get regex() {
    const regex = this.has.regex || ''
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

  get route() { return this.has.route || '' }

  get text() { return this.has.text || '' }

  get title() { return this.has.title || '' }

  /**
   * Material UI component attribute.  
   * __Note__: Can be undefined on purpose.
   */
  get variant() { return this.has.variant }

  /**
   * to be used with `load` when loading `meta`. e.g.
   * ```ts
   * const meta = stateMeta['load']['key']
   * ```
   */
  get key() { return this.has.key || '' }

  /**
   * Name of internally defined callback to be executed
   */
  get handle() { return this.has.handle || '' }

  /**
   * Load metadata into field from `state.meta`. The metadata will be
   * identified by the endpoint (this value). If the data is missing, the
   * normal data source will be used.
   * ```ts
   * const meta = stateMeta['load']['key']
   * ```
   */
  get load() { return this.has.load || '' }

  /**
   * Material UI adornments.
   *
   * This field should be ignored if using another lib.
   */
  get adornment() { return this.has.adornment }

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
  public regexError(value: string) {
    if (!this.has.regex) {
      return false
    } else if (!value) {
      return false
    } else {
      return !(new RegExp(this.regex).test(value))
    }
  }

}
