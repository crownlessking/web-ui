import {
  TEXTFIELD, TEXTAREA, SUBMIT, BREAK_LINE, HTML, RADIO_BUTTONS, CHECKBOXES,
  SWITCH, SELECT
} from '../form.controller'
import {
  IStateFormItem, IStateFormItemRadio, IStateFormItemCustom, IFormCheckbox, IRedux
} from '../../../interfaces'
import Config from '../../../config'
// import _ from 'lodash'
import StateController from '../../../controllers/state.controller'
import StateFormItemCustom from './custom.controller'
import { defaultCallback } from '../../../controllers'
import { updateFormData } from '../../../state/forms/data/actions'
import { IParentState } from '../../../interfaces'
import StateForm from '../../../state/forms/form.controller'

/**
 * Prevents the app from throwing an exception because of the missing `name`
 * attribute in specific form item definitions.
 *
 * The application is set to throw an exception if the name of a form field is
 * missing. However, not all defined form items are fields. If the name is
 * missing from one of those definitions, the application should not throw an
 * exception.
 *
 * @param type form item type
 * @param state
 *
 * @deprecated
 */
export function notMissingNameExDef(type: string, state: IStateFormItem) {
  if (state.name) {
    return type
  } else {
    switch (type) {
    case HTML:
    case SUBMIT:
    case BREAK_LINE:
      return type
    }
  }

  if (Config.DEBUG === true) {
    throw new Error('The `name` attribute is required.')
  }

  return ''
}

/**
 * Get form field value from redux store.
 *
 * Also sets the form fields default value if specified in the from definition.
 *
 * @param that
 * @param def
 *
 * @deprecated
 */
export function getStoredValue(formsData: any, formName: string, name: string) {
  try {
    return formsData[formName][name]
  } catch (e) {  }
}

/**
 * A version of the `getStoredValue()` function. It works with local a state
 * instead of the redux store.
 *
 * If no value is found in the state, will return the field definition's
 * default value if possible.
 *
 * @param formData 
 * @param name 
 */
export function getLocallyStoredValue(formData: any, item: IStateFormItem) {
  const copyItem = { ...item }
  const { name } = copyItem
  copyItem.has = copyItem.has || { }
  const { defaultValue } = copyItem.has
  return (name && formData[name] !== undefined)
    ? formData[name]
    : (copyItem.value || defaultValue || '')
}

export function getValueFromParent(def: StateFormItem, parentState?: IParentState) {
  if (parentState) {
    return getLocallyStoredValue(parentState.state.formData, def)
  }
  return null
}

/**
 * Get form name
 *
 * @param that
 */
export function getFormName(that: any) {
  return that.props.state.formName
}

/**
 * Helper function.
 *
 * This function makes it possible to `spread` the `def` object unto a
 * JSX.Element by removing all properties that are not JSX.Element attributes.
 * Or fixing those with incompatible values.
 *
 * @param item 
 * @param removalList list of key to be remove from form definition
 */
export function getProps<T extends IStateFormItem>(item: T, removalList?: string[]) {
  const itemCopy = { ...item }
  delete itemCopy.has
  delete itemCopy.onChange

  const type = itemCopy.type.toUpperCase()
  switch (type) {
  case TEXTFIELD:
  case TEXTAREA:
    itemCopy.type = 'text'
    break
  case RADIO_BUTTONS:
  case BREAK_LINE:
  case CHECKBOXES:
  case SWITCH:
  case SELECT:
  case HTML:
    itemCopy.type = ''
    break
  default:
    itemCopy.type = type
  }

  if (removalList) {
    for (const key of removalList) {
      delete itemCopy[key]
    }
  }

  return itemCopy
}

/**
 * Get list of `<option>` definition.
 *
 * @param has
 *
 * @deprecated
 */
export function options(has: IStateFormItemCustom) {

  // Implement additional logic here
  // e.g. filtering or verification

  return has.items ? has.items : []
}

/**
 * Getter function for the radio value.
 *
 * @param item
 *
 * @deprecated
 */
export function radioValue(item: IStateFormItemRadio) {

  // TODO Use this function to implement logic when retrieving a form radio
  // value from the definition.
 
  return item.value
}

/**
 * Get list of radio buttons.
 *
 * @param has
 */
export function radioButtons(has: IStateFormItemCustom) {

  // Implement logic additional logic needed for radio buttons here.
  // e.g. filtering and verifications

  return has.items ? has.items : []
}

/**
 * Get list of checkboxes.
 *
 * @param has
 *
 * @deprecated
 */
export function checkboxes(has: IStateFormItemCustom) {

  // Implement logic additional logic needed for radio buttons here.
  // e.g. filtering and verifications

  return has.items ? has.items : []
}

/**
 * Helper function for `getCheckboxesStatus()`.
 *
 * Takes all checkbox defintion values and gather them into an array.
 *
 * @param has
 */
function getCheckboxValues(has: IStateFormItemCustom<IFormCheckbox>) {
  return has.items ? has.items.map(item => item.value) : []
}

/**
 * Helper function for `getCheckboxesStatus()`.
 *
 * Applies the boolean value `true` to all object keys representing a checkbox
 * value that is checked.
 *
 * @param obj object containing keys that are values of a checkboxes in a form.
 * @param value currently evaluated checkbox value
 * @param checkedValues array of all checkbox values that are checked.
 */
function setCheckedValue(obj: any, value: string, checkedValues: string[]) {
  for (const checkedValue of checkedValues) {
    if (value === checkedValue) {
      obj[value] = true
      return
    }
  }
  obj[value] = false
}

/**
 * Converts all checkbox values to an object (of boolean keys) and load the
 * checkboxes array of checked values and use it to apply `true` to all object
 * keys which are checked.
 *
 * __Problem__: Since checkboxes values which are check are saved as an array,
 * we need a way to load that array (of checked values) to restore the form
 * checkboxes and the boxes which were checked.
 *
 * @param has
 * @param checkedValues array of checkboxes values that are checked
 */
export function getCheckboxesStatus(has: IStateFormItemCustom, checkedValues: string[]) {
  const allValues = getCheckboxValues(has)
  const obj: any = {}
  for (const value of allValues) {
    setCheckedValue(obj, value, checkedValues)
  }
  return obj
}

/**
 * Converts the data of checkboxes to an array of checked values. e.g. The
 * array will only contain the checkbox values that are checked.
 *
 * It also takes a previous array of checked values and updates it with the
 * forms currently checked values.
 *
 * @param checkedValues 
 * @param value 
 * @param checked 
 */
export function updateCheckboxes(checkedValues: string[], value: string, checked: boolean) {
  const newValues = [ ...checkedValues ]
  const valueIndex = newValues.indexOf(value)
  const containsValue = (valueIndex >= 0)
  if (containsValue && !checked) {
    newValues.splice(valueIndex, 1)
  } else if (!containsValue && checked) {
    newValues.push(value)
  }
  return newValues
}

/**
 * Gather all checkbox values which were checked into an array.
 *
 * @param obj checkboxes status. It's an object which has checkbox values as 
 *            keys. These keys are boolean values representing whether a
 *            checkbox is checked or not.
 */
export function checkboxesStatusToArray(obj: any) {
  const values = Object.keys(obj)
  return values.map(value => {
    if (obj[value] === true) {
      return value
    }
    return null;
  })
}

/**
 * Creates a unique form name, depending on how unique the id is.
 *
 * @param formName 
 * @param id 
 */
export function getUniqueFormName (formName: string, id: string) {
  return formName.substring(0, formName.length - 4) + id + 'Form';
}

/**
 * Saves the form field value to the store.
 *
 * Note: this process is automatic
 *
 * Redux action
 *
 * @param name
 */
export function onUpdateFormData(
  action: typeof updateFormData,
  formName: string,
  name: string
) {
  return (e: any) => {
  action({
    formName: formName,
    name,
    value: e.target.value
  })}
}


export default class StateFormItem<P = StateForm, T = any>
    extends StateController implements IStateFormItem {

  private item: IStateFormItem
  private parentDef: P
  private itemHas: IStateFormItemCustom
  private itemHasDef?: StateFormItemCustom<this>
  private itemDisabled: boolean
  private noOnClickCallback: boolean
  private itemOnClick: (redux: IRedux) => (e: any) => void
  private noOnChangeCallback: boolean
  private itemOnChange: Function

  constructor (item: IStateFormItem, parent: P) {
    super()
    this.item = item
    this.parentDef = parent
    this.itemHas = item.has || { }
    this.itemDisabled = this.item.disabled
    this.noOnClickCallback = !!this.item.onClick
    this.itemOnClick = this.item.onClick || defaultCallback
    this.noOnChangeCallback = !!this.item.onChange
    this.itemOnChange = this.item.onChange || defaultCallback
  }

  get state(): IStateFormItem { return this.item }

  get patched() {
    throw new Error(`'Patched form item state' NOT implemented.`)
  }

  /**
   * Chain-access to parent (form) definition.
   */
  get parent() { return this.parentDef }

  get type() { return this.item.type || '' }

  get id() { return this.item.id || '' }

  /**
   * Get the current form field name.
   */
  get name() { return this.item.name || '' }

  /**
   * Get the current form field custom definition.
   */
  get has(): StateFormItemCustom<this, T> {
    return this.itemHasDef
      || (this.itemHasDef = new StateFormItemCustom(
          this.itemHas,
          this
        ))
  }

  /**
   * Get the current form field `href` attribute.
   */
  get href() {
    return this.item.href
  }

  /**
   * Get form field `onClick` value.
   */
  get onClick () {
    return this.itemOnClick
  }

  get hasNoOnClickCallback() {
    return this.noOnClickCallback
  }

  get hasNoOnChangeCallback() {
    return this.noOnChangeCallback
  }

  /**
   * Callback to run on 'onChange' event.
   */
  get onChange () {
    return this.itemOnChange
  }

  get disabled() { return this.itemDisabled }

  get label(): string { return this.item.label || '' }

  get language(): string { return this.item.highlight }
 
  /**
   * Set form field `onClick` attribute
   */
  set onClick (cb: (redux: IRedux) => (e: any) => void) {
    this.itemOnClick = this.item.onClick || cb
  }

  /**
   * Set the 'onChange' attribute of the form field.
   */
  set onChange (cb: Function) {
    this.itemOnChange = this.item.onChange || cb
  }

  set disabled(b: boolean) { this.itemDisabled = b }

  /**
   * Set a callback to run on form submission.
   */
  setOnClick = (cb: (redux: IRedux) => (e: any) => void) => {
    this.itemOnClick = cb
  }

  /**
   * Prevents the app from throwing an exception because of the missing `name`
   * attribute in specific form item definitions.
   *
   * The application is set to throw an exception if the name of a form field is
   * missing. However, not all defined form items are fields. If the name is
   * missing from one of those definitions, the application should not throw an
   * exception.
   */
  notMissingNameExDef = () => {
    const type = this.item.type.toUpperCase()
    if (this.item.name) {
      return type
    } else {
      switch (type) {
      case HTML:
      case SUBMIT:
      case BREAK_LINE:
        return type
      }
    }

    if (Config.DEBUG === true) {
      throw new Error('`formItem.name` is NOT defined.')
    }

    return ''
  }

}
