import {
  defaultCallback, dummyCallback, err, getVal
} from '.'
import AbstractState from './AbstractState'
import {
  IRedux, IStateFormItem, IStateFormItemCustom
} from '../interfaces'
import StateForm from './StateForm'
import {
  HTML, SUBMIT, BUTTON, BREAK_LINE, FORM_LABEL, FORM_HELPER_TEXT, CHECKBOXES,
  RADIO_BUTTONS, SELECT, SWITCH, TEXTAREA, TEXTFIELD
} from '../mui/form/controller'
import StateFormItemCustom from './StateFormItemCustom'

export default class StateFormItem<P = StateForm, T = any>
    extends AbstractState implements IStateFormItem {

  protected itemJson: IStateFormItem
  protected parentObj: P
  protected itemHasJson: IStateFormItemCustom<T>
  protected itemHas?: StateFormItemCustom<StateFormItem<P, T>, T>
  protected itemDisabled: boolean
  protected itemOnClick?: (redux: IRedux) => (e: any) => void
  protected itemOnChange?: Function

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

    const type = componentProps.type.toUpperCase()
    switch (type) {
    case TEXTFIELD:
    case TEXTAREA:
      componentProps.type = 'text'
      break
    case RADIO_BUTTONS:
    case BREAK_LINE:
    case CHECKBOXES:
    case SWITCH:
    case SELECT:
    case HTML:
      componentProps.type = ''
      break
    default:
      componentProps.type = type
    }
    return componentProps
  }
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
      || (this.itemOnClick = this.itemJson.onClick || defaultCallback)
  }
  get hasNoOnClickCallback() {
    return !!this.itemJson.onClick
  }
  get hasNoOnChangeCallback() {
    return !!this.itemJson.onChange
  }
  /** Callback to run on 'onChange' event. */
  get onChange() {
    return this.itemOnChange
      || (this.itemOnChange = this.itemJson.onChange || dummyCallback)
  }
  get disabled() { return this.itemDisabled }
  get label(): string { return this.itemJson.label || '' }
  get language(): string { return this.itemJson.highlight }
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
  */
  typeCheckingName = () => {
    const type = this.itemJson.type.toUpperCase()
    if (this.itemJson.name) {
      return type
    } else {
      switch (type) {
        case HTML:
        case SUBMIT:
        case BUTTON:
        case BREAK_LINE:
        case FORM_LABEL:
        case FORM_HELPER_TEXT:
          return type
      }
    }
    err('`formItem.name` is NOT defined.')

    return ''
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
