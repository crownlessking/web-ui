import {
  TEXTFIELD, TEXTAREA, SUBMIT, BREAK_LINE, HTML, RADIO_BUTTONS, CHECKBOXES,
  SWITCH, SELECT
} from '../controller'
import {
  IStateFormItem, IStateFormItemRadioButton, IStateFormItemCustom,
  IFormCheckbox
} from '../../../interfaces'
import { err, log } from '../../../controllers'
import { updateFormData } from '../../../state/forms/data/actions'
import { IParentState } from '../../../interfaces'
import StateFormItem from '../../../controllers/StateFormItem'

/**
 * Prevents the app from throwing an exception because of the missing `name`
 * attribute in specific form item definition.
 *
 * The application is set to throw an exception if the name of a form field is
 * missing. However, not all defined form items are fields. If the name is
 * missing from one of those definitions, the application should not throw an
 * exception.
 *
 * @param type form item type
 * @param json
 *
 * @deprecated
 */
export function notMissingNameExDef(type: string, json: IStateFormItem) {
  if (json.name) {
    return type
  } else {
    switch (type) {
    case HTML:
    case SUBMIT:
    case BREAK_LINE:
      return type
    }
  }

  err('The `name` attribute is required.')

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
 * @param hasJson
 *
 * @deprecated
 */
export function options(hasJson: IStateFormItemCustom) {

  // [TODO] Implement additional logic here
  //        e.g. filtering or verification

  return hasJson.items ? hasJson.items : []
}

/**
 * Getter function for the radio value.
 *
 * @param itemJson
 *
 * @deprecated
 */
export function radioValue(itemJson: IStateFormItemRadioButton) {

  // [TODO] Use this function to implement logic when retrieving a form radio
  //        value from the definition.
 
  return itemJson.value
}

/**
 * Get list of radio buttons.
 *
 * @param hasJson
 */
export function radioButtons(hasJson: IStateFormItemCustom) {

  // [TODO] Implement logic additional logic needed for radio buttons here.
  //        e.g. filtering and verifications

  return hasJson.items ? hasJson.items : []
}

/**
 * Get list of checkboxes.
 *
 * @param hasJson
 *
 * @deprecated
 */
export function checkboxes(hasJson: IStateFormItemCustom) {

  // [TODO] Implement logic additional logic needed for radio buttons here.
  //        e.g. filtering and verifications

  return hasJson.items ? hasJson.items : []
}

/**
 * Helper function for `getCheckboxesStatus()`.
 *
 * Takes all checkbox defintion values and gather them into an array.
 *
 * @param hasJson
 */
function getCheckboxValues(hasJson: IStateFormItemCustom<IFormCheckbox>) {
  return hasJson.items ? hasJson.items.map(item => item.value) : []
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
 * @param hasJson
 * @param checkedValues array of checkboxes values that are checked
 */
export function getCheckboxesStatus(
  hasJson: IStateFormItemCustom,
  checkedValues: string[]
) {
  const allValues = getCheckboxValues(hasJson)
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

export function getMeta(stateMeta: any, endpoint: string, key?: string) {
  try {
    return key ? stateMeta[endpoint][key] : stateMeta[endpoint]
  } catch (e) {
    log(`stateMeta[${endpoint}][${key}] does NOT exist.`)
  }
}
