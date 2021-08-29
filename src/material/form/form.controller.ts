import { IStateDialogForm } from '../../interfaces'

export const BREAK_LINE = 'BR' // 'br'
export const BUTTON = 'BUTTON' // 'button'
export const SUBMIT = 'SUBMIT' // 'submit'
export const DIV = 'DIV' // 'div'
export const HTML = 'HTML' // 'html'
export const PARAGRAPH = 'PARAGRAPH' // 'paragraph'
export const PASSWORD = 'PASSWORD' // 'password'
export const SELECT = 'SELECT' // 'select'
export const TEXTFIELD = 'TEXTFIELD' // 'text'
export const TEXT = 'TEXT'
export const TEXTAREA = 'TEXTAREA' // 'textarea'
export const RADIO_BUTTONS = 'RADIO_BUTTONS' // 'radio'
export const CHECKBOXES = 'CHECKBOXES' // 'checkbox'
export const SWITCH = 'SWITCH'
export const NUMBER = 'NUMBER'
export const DATETIME = 'DATETIME'
export const HIGHLIGHT = 'HIGHLIGHT'

export const BOOL_TRUEFALSE = 'BOOL_TRUEFALSE'
export const BOOL_ONOFF = 'BOOL_ONOFF'
export const BOOL_YESNO = 'BOOL_YESNO'

/** 
 * Regular expression identifying a `true` or `false` boolean value.
 */
const BOOL_TF_R = /^true|false$/i

/** 
 * Regular expression identifying a `on` or `off` boolean value.
 */
const BOOL_OO_R = /^on|off$/i

/**
 * Regular expression identifying a `yes` or `no` boolean value.
 */
const BOOL_YN_R = /^yes|no$/i

/**
 * If the string is length 45 character or less.
 *
 * @param value 
 */
function strIs45orLess(value: string) {
  return value.length <= 45 ? TEXTFIELD : TEXTAREA
}

/**
 * If the string represents a number.
 *
 * @param value 
 * @param previousType 
 */
function strIsNumber(value: string, previousType: string) {
  return /^\d+$/.test(value) ? 'number' : previousType
}

/**
 * If the string represent a boolean value in the form of _true_ or _false_.
 *
 * @param value 
 * @param previousType 
 */
function isTrueOrFalse(value: string, previousType: string) {
  return BOOL_TF_R.test(value) ? BOOL_TRUEFALSE : previousType
}

/**
 * If the string represents a boolean value in the form of _on_ or _off_.
 *
 * @param value 
 * @param previousType 
 */
function isOnOrOff(value: string, previousType: string) {
  return BOOL_OO_R.test(value) ? BOOL_ONOFF : previousType
}

/**
 * If the string represents a boolean value in the form of _yes_ or _no_.
 *
 * @param value 
 * @param previousType 
 */
function isYesOrNo(value: string, previousType: string) {
  return BOOL_YN_R.test(value) ? BOOL_YESNO : previousType
}

/**
 * Identifies whether a string is a boolean value:
 * 
 * 1) `true` or `false`
 * 2) `on` or `off`
 * 3) `yes` or `no`
 * 4) `one` or `zero`
 *
 * @param value 
 */
export function getBoolType (value: any) {
  const type = typeof value
  switch (type) {
  case 'string':
    if (BOOL_TF_R.test(value)) {
      return BOOL_TRUEFALSE
    } else if (BOOL_OO_R.test(value)) {
      return BOOL_ONOFF
    } else if (BOOL_YN_R.test(value)) {
      return BOOL_YESNO
    }
    break
  default:
    return type
  }
}

/**
 * Converts a string representing a boolean value to a real boolean value.
 *
 * @param value
 */
export function getBoolValue(value: string) {
  const bool: any = {
    'true': true,
    'false': false,
    'on': true,
    'off': false,
    'yes': true,
    'no': false
  }
  const booleanValue = bool[value]
  return typeof booleanValue === 'boolean'
    ? booleanValue
    : !!value
}

/**
 * 
 * dev
 * If the value is a string
 *   if the length of the string is less than 45
 *      if 
 * @param value 
 */
function getFieldType(value: any) {
  let customType: string
  const type = typeof value
  if (type === 'string') {
    customType = strIs45orLess(value)
    if (customType === TEXTFIELD) {
      customType = strIsNumber(value, customType)
      customType = isTrueOrFalse(value, customType)
      customType = isOnOrOff(value, customType)
      customType = isYesOrNo(value, customType)
    }
    return customType
  }
  return type
}

/**
 * Generates the form items definition.
 *
 * @param rowData 
 * @param key 
 */
function getItemDef(rowData: any, key: string) {
  const value = rowData[key]
  switch (getFieldType(value)) {
  case TEXTFIELD:
    return {
      'type': 'textfield',
      'name': key,
      'label': key,
      'margin': 'normal',
      value
    }
  case TEXTAREA:
    return {
      'type': 'textarea',
      'name': key,
      'label': key,
      'margin': 'normal',
      'fullWidth': true,
      value
    }
  case BOOL_TRUEFALSE:
  case BOOL_ONOFF:
  case BOOL_YESNO:
    return {
      'type': 'switch',
      'name': key,
      'has': {
        'label': key,
        'defaultValue': value
      }
    }
  case 'number':
    return {
      'type': 'number',
      'name': key,
      'label': key,
      'margin': 'normal',
      value
    }
  default:
    return {
      'type': 'textfield',
      'name': key,
      'label': key,
      'disabled': true,
      'placeholder': 'Unprocessable entity value'
    }
  }
}

/**
 * Generates a form definition based on the values in the JSON document.
 * 
 * __Rules__ based on value types:
 *
 * [string] automatic
 * if the string length is 45 or less, a textfield will be generated.
 * Otherwise, if it is longer, a textarea will be generated.
 *
 * @param doc 
 */
export function genStateForm({ rowData }: any): IStateDialogForm {
  if (rowData) {
    const initItems = Object.keys(rowData).map(key => getItemDef(rowData, key))
    const items = initItems // breakFormItems(initItems)
    return { items }
  }
  return { items: [] }
}

/**
 * Gather item values as an array of incomplete form item definition object.
 */
export function setFormValues(dialog: IStateDialogForm, { rowData }: any) {
  for (let i = 0; i < dialog.items.length; i++) {
    const item = dialog.items[i]
    if (item.name) {
      item.value = rowData[item.name]
    }
  }
} //*/
