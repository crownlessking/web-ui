import {
  TEXTFIELD, TEXTAREA, BREAK_LINE, HTML, RADIO_BUTTONS, CHECKBOXES, SWITCH,
  JSON_SELECT,
} from '../controller'
import { log } from '../../../controllers'
import { IStateFormItem } from '../../../controllers/StateFormItem'
import { IStateFormItemCustom } from '../../../controllers/StateFormItemCustom'
import { IStateFormItemCheckbox } from '../../../controllers/StateFormItemCheckbox'

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
export function getProps<T extends IStateFormItem>(
  item: T,
  removalList?: string[]
) {
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
  case JSON_SELECT:
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
 * Helper function for `getCheckboxesStatus()`.
 *
 * Takes all checkbox defintion values and gather them into an array.
 *
 * @param hasJson
 */
function getCheckboxValues(hasJson: IStateFormItemCustom<IStateFormItemCheckbox>) {
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
 * [TODO] The current time complexity of this function is O(a+b*c).
 *        Find a way to improve it when you have time.
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

export function getMeta(stateMeta: any, endpoint: string, key?: string) {
  try {
    return key ? stateMeta[endpoint][key] : stateMeta[endpoint]
  } catch (e) {
    log(`stateMeta[${endpoint}][${key}] does NOT exist.`)
  }
}
