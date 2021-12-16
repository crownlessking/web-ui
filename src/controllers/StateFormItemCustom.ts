import { IStateFormItemCustom, IRedux } from '../interfaces'
import AbstractState from './AbstractState'

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

  get json () { return this.hasJson }

  get parent() { return this.parentObj }

  get callback() { return this.hasCallback }

  get classes() { return this.hasClasses }
  
  get content() { return this.hasJson.content || '' }

  get color() { return this.hasJson.color || '' }

  get defaultValue() { return this.hasJson.defaultValue || '' }

  get faIcon() { return this.hasJson.faIcon || '' }

  get icon() { return this.hasJson.icon || '' }

  get iconPosition() { return this.hasJson.iconPosition }

  get items() { return this.hasItemsJson }

  get label() { return this.hasJson.label || '' }

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

  get route() { return this.hasJson.route || '' }

  get text() { return this.hasJson.text || '' }

  get title() { return this.hasJson.title || '' }

  /**
   * Material UI component attribute.  
   * __Note__: Can be undefined on purpose.
   */
  get variant() { return this.hasJson.variant }

  get badge() { return this.hasJson.badge }

  /**
   * to be used with `load` when loading `meta`. e.g.
   * ```ts
   * const meta = stateMeta['load']['key']
   * ```
   */
  get key() { return this.hasJson.key || '' }

  /**
   * Name of an internally defined callback to be executed.
   */
  get handle() { return this.hasJson.handle || '' }

  /**
   * Load metadata into field from `state.meta`. The metadata will be
   * identified by the endpoint (this value). If the data is missing, the
   * normal data source will be used.
   * ```ts
   * const meta = stateMeta['load']['key']
   * ```
   */
  get load() { return this.hasJson.load || '' }

  /**
   * Material UI adornments.
   *
   * This field should be ignored if using another lib.
   */
  get adornment() { return this.hasJson.adornment }

  /**
   * Icon component props.
   */
  get props() { return this.hasJson.props || {} }

  get formControl() { return this.hasJson.formControl || {} }

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
    if (!this.hasJson.regex) {
      return false
    } else if (!value) {
      return false
    } else {
      return !(new RegExp(this.regex).test(value))
    }
  }

}
