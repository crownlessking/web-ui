import { dummyCallback, err, getVal } from '.'
import AbstractState from './AbstractState'
import StateForm from './StateForm'
import {
  HTML, SUBMIT, JSON_BUTTON, BREAK_LINE, FORM_LABEL, FORM_HELPER_TEXT, BOX,
  FORM_CONTROL, FORM_CONTROL_LABEL, FORM_GROUP, INDETERMINATE, LOCALIZED,
  STACK
} from '../mui/form/controller'
import StateFormItemCustom from './StateFormItemCustom'
import { IRedux } from '../state'
import IStateFormItem from './interfaces/IStateFormItem'
import IStateFormItemCustom from './interfaces/IStateFormItemCustom'

export default class StateFormItem<P = StateForm, T = any>
  extends AbstractState implements IStateFormItem
{
  protected itemJson: IStateFormItem
  protected parentObj: P
  protected itemHasJson: IStateFormItemCustom<T>
  protected itemHas?: StateFormItemCustom<StateFormItem<P, T>, T>
  protected itemDisabled: boolean
  protected itemOnClick?: (redux: IRedux) => (e: any) => void
  protected itemOnChange?: Function
  protected recursiveItems?: StateFormItem<P, T>[]

  constructor(itemJson: IStateFormItem, parent: P) {
    super()
    this.itemJson = itemJson
    this.parentObj = parent
    this.itemDisabled = !!this.itemJson.disabled
    this.itemHasJson = itemJson.has || {}
    this.setHandleCallback()
  }

  get json(): IStateFormItem { return this.itemJson }
  /** Chain-access to parent object (form). */
  get parent() { return this.parentObj }
  get props() {
    const componentProps: any = { ...this.itemJson }
    delete componentProps.has
    delete componentProps.onChange
    delete componentProps.onClick
    delete componentProps.type
    delete componentProps.items
    delete componentProps.theme
  
    return componentProps
  }
  get theme() { return this.itemJson.theme || this.itemHasJson.theme || {} }
  get type() { return this.itemJson.type || '' }
  get id() { return this.itemJson.id || '' }
  /** Get the current form field name. */
  get name() { return this.itemJson.name || '' }
  /** Get the current form field custom definition. */
  get has() {
    return this.itemHas
      || (this.itemHas = new StateFormItemCustom(
        this.itemHasJson,
        this
      ))
  }
  get style() { return this.itemJson.style || {} }
  /** Get the current form field `href` attribute. */
  get href() { return this.itemJson.href }
  get value() { return this.itemJson.value }
  /** Get human-readable text. */
  get text(): string {
    return this.itemHasJson.label
      || this.itemHasJson.title
      || this.itemJson.value
      || this.itemJson.name
      || this.itemHasJson.text
      || ''
  }
  /** Get form field `onClick` value. */
  get onClick() {
    return this.itemOnClick
      || (
        this.itemOnClick = this.itemJson.onClick || dummyCallback
      )
  }
  get hasNoOnClickCallback() {
    return !this.itemJson.onClick
  }
  get hasNoOnChangeCallback() {
    return !!this.itemJson.onChange
  }
  /** Callback to run on 'onChange' event. */
  get onChange() {
    return this.itemOnChange
      || (
        this.itemOnChange = this.itemJson.onChange || dummyCallback
      )
  }
  get disabled() { return this.itemDisabled }
  get label(): string { return this.itemJson.label || '' }
  get language(): string { return this.itemJson.highlight }
  /** Used with a textfield. */
  get inputProps() {
    return this.itemJson.inputProps || {}
  }
  /** Must return undefined if not defined. */
  get items(): StateFormItem<P, T>[] | undefined {
    if (this.recursiveItems) {
      return this.recursiveItems
    }
    if (this.itemJson.items) {
      this.recursiveItems = (this.itemJson.items as IStateFormItem[]).map(
        item => new StateFormItem(item, this.parentObj)
      )
      return this.recursiveItems
    }
    return undefined
  }

  /**
   * Some form items require `name` to be defined.
   */
   get nameProvided() {
    if (this.itemJson.name) {
      return true
    }
    switch (this.itemJson.type.toUpperCase()) {
      case HTML:
      case SUBMIT:
      case JSON_BUTTON:
      case BREAK_LINE:
      case FORM_LABEL:
      case FORM_HELPER_TEXT:
      case BOX:
      case STACK:
      case LOCALIZED:
      case FORM_GROUP:
      case FORM_CONTROL:
      case FORM_CONTROL_LABEL:
      case INDETERMINATE:
        return true
    }
    err('`formItem.name` is NOT defined.')

    return false
  }

  /** Set form field `onClick` attribute */
  set onClick(cb: (redux: IRedux) => (e: any) => void) {
    this.itemOnClick = cb
  }
  /** Set the 'onChange' attribute of the form field. */
  set onChange(cb: Function) {
    this.itemOnChange = cb
  }
  set disabled(b: boolean) { this.itemDisabled = b }

  /**
  * Prevents the app from throwing an exception because of the missing `name`
  * attribute in specific form item definitions.
  *
  * The application is set to throw an exception if the name of a form field is
  * missing. However, not all defined form items are fields. If the name is
  * missing from one of those definitions, the application should not throw an
  * exception.
  *
  * @deprecated
  */
  typeCheckingName = () => {
    const type = this.itemJson.type.toUpperCase()
    if (this.itemJson.name) {
      return type
    } else {
      switch (type) {
        case HTML:
        case SUBMIT:
        case JSON_BUTTON:
        case BREAK_LINE:
        case FORM_LABEL:
        case FORM_HELPER_TEXT:
        case BOX:
        case STACK:
        case LOCALIZED:
        case FORM_GROUP:
        case FORM_CONTROL:
        case FORM_CONTROL_LABEL:
        case INDETERMINATE:
          return type
      }
    }
    err('`formItem.name` is NOT defined.')

    return type
  }

  private getHandlePropName = (handle: string): {
    event: string,
    callbackName: string
  } => {
    const pieces = handle.replace(/\s+/g, '').split(':')

    if (pieces.length > 1) {
      return {
        event: pieces[0],
        callbackName: pieces[1]
      }
    }

    return {
      event: 'onclick',
      callbackName: handle
    }
  }

  private assignCallback = (event: string, callback: any) => {
    switch (event.toLowerCase()) {
      case 'onchange':
        this.itemOnChange = callback
        break
      case 'onclick':
        this.itemOnClick = callback
        break
      default:
        err('Invalid handle event')
    }
  }

  /** Set callback */
  private setHandleCallback = () => {
    if (!this.itemHasJson.handle) {
      return
    }

    const handle = this.getHandlePropName(this.itemHasJson.handle)
    const callback = getVal(window, handle.callbackName)

    if (typeof callback !== 'function') {
      err(`Invalid handle: '${handle.callbackName}' not a function`)
      return
    }

    this.assignCallback(handle.event, callback)
  } // END of method

}
