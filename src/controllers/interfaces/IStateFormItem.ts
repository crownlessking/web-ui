import { InputProps } from '@mui/material'
import { CSSProperties } from 'react'
import * as C from '../../constants'
import IAbstractState from './IAbstractState'
import IStateFormItemCustom from './IStateFormItemCustom'
import IStateLink from './IStateLink'

export interface IStateFormItemAdornment {
  icon?: IStateLink
  text?: string
  textProps: any
}

export interface IStateFormItemInputProps extends InputProps {
  start?: IStateFormItemAdornment
  end?: IStateFormItemAdornment
}

export type TStateFormItemType = typeof C.BREAK_LINE
  | typeof C.BOOL_ONOFF
  | typeof C.BOOL_TRUEFALSE
  | typeof C.BOOL_YESNO
  | typeof C.BOX
  | typeof C.JSON_BUTTON
  | typeof C.CHECKBOXES
  | typeof C.DATE_TIME_PICKER
  | typeof C.DESKTOP_DATE_PICKER
  | typeof C.DESKTOP_DATE_TIME_PICKER
  | typeof C.DIV
  | typeof C.FORM
  | typeof C.FORM_CONTROL
  | typeof C.FORM_CONTROL_LABEL
  | typeof C.FORM_GROUP
  | typeof C.FORM_HELPER_TEXT
  | typeof C.FORM_LABEL
  | typeof C.HIGHLIGHT
  | typeof C.HORIZONTAL_LINE
  | typeof C.HTML
  | typeof C.INDETERMINATE
  | typeof C.JSON_INPUT
  | typeof C.INPUT_LABEL
  | typeof C.ICON
  | typeof C.LINK
  | typeof C.LOCALIZED
  | typeof C.MOBILE_DATE_PICKER
  | typeof C.MOBILE_DATE_TIME_PICKER
  | typeof C.NONE
  | typeof C.NUMBER
  | typeof C.PARAGRAPH
  | typeof C.PASSWORD
  | typeof C.PHONE_INPUT
  | typeof C.RADIO_BUTTONS
  | typeof C.JSON_SELECT
  | typeof C.JSON_SELECT_NATIVE
  | typeof C.STACK
  | typeof C.STATIC_DATE_PICKER
  | typeof C.SUBMIT
  | typeof C.SINGLE_SWITCH
  | typeof C.SWITCH
  | typeof C.TEXT
  | typeof C.TEXTAREA
  | typeof C.TEXTFIELD
  | typeof C.TEXT_NODE
  | typeof C.TIME_PICKER
  | typeof C.BAD_FORM_ITEM

export default interface IStateFormItem extends IAbstractState {
  /** Form field type e.g. textfield, select, radio... etc. */
  type: TStateFormItemType
  /** Form field `id` */
  id?: string
  /** Form field `name` */
  name?: string
  /** Form field `value` */
  value?: any
  href?: string
  style?: CSSProperties
  onClick?: any
  onFocus?: any
  onKeyDown?: any
  onChange?: any
  onBlur?: any
  label?: string
  highlight?: string
  disabled?: boolean
  /** Contains members that are generally not `JSX.Element` props. */
  has?: IStateFormItemCustom
  inputProps?: IStateFormItemInputProps
  items?: Array<any>
  /** Disable form item */
  disableOn?: ('click' | 'change' | 'blur' | 'error')[]
}
