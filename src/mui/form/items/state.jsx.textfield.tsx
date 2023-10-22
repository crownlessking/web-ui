import { InputProps, TextField } from '@mui/material'
import { AppDispatch, redux, RootState } from '../../../state'
import getTextFieldAdornment from './state.jsx.input.adornment'
import StateFormItem from '../../../controllers/StateFormItem'
import { useDispatch, useSelector } from 'react-redux'
import { NAME_NOT_SET } from '../../../constants'
import StateJsxTextfieldInputProps from './state.jsx.textfield.input.props'
import StateFormsData from 'src/controllers/StateFormsData'
import { useEffect } from 'react'
import { ISliceFormsDataErrorsArgs } from 'src/slices/formsDataErrors.slice'

interface IJsonTextfieldProps {
  def: StateFormItem
}

export const typeMap: { [constant: string]: string } = {
  text: 'text',
  textfield: 'text',
  textarea: 'text',
  password: 'password',
  number: 'number'
}

/** Textfield
 *
 * Example:
 * ```json
 * {
 *   "name": "username",
 *   "type": "text",
 *   "label": "Username",
 *   "props": { "required": true },
 *   "inputProps": {
 *     "start": {
 *        "icon": { "icon": "user" }
 *     },
 *     "end": {
 *        "icon": { "icon": "user" }
 *      }
 *   }
 * } 
 */
export default function StateJsxTextfield({ def: textfield }: IJsonTextfieldProps) {
  const { name, parent: { name: formName } } = textfield
  const formsData = new StateFormsData(
    useSelector((state: RootState) => state.formsData)
  )
  const formsDataErrors = useSelector(
    (state: RootState) => state.formsDataErrors
  )
  const dispatch = useDispatch<AppDispatch>()
  const value = formsData.getValue(formName, name)

  useEffect(() => {
    if ((textfield.has.maxLength && textfield.has.maxLength > 0)
      || textfield.has.invalidationRegex
      || textfield.has.validationRegex
    ) {
      dispatch({
        type: 'formsDataErrors/formsDataErrorsUpdate',
        payload: {
          formName: textfield.parent.name,
          name: textfield.name,
          error: false,
          maxLength: textfield.has.maxLength,
          maxLengthMessage: textfield.has.state.maxLengthMessage,
          disableOnError: textfield.has.state.disableOnError,
          invalidationRegex: textfield.has.state.invalidationRegex,
          validationRegex: textfield.has.state.validationRegex,
          validationMessage: textfield.has.state.validationMessage
        } as ISliceFormsDataErrorsArgs
      })
    }
  }, [ textfield, dispatch ])

  return name ? (
    <TextField
      {...textfield.props}
      label={textfield.label}
      type={typeMap[textfield.type]}
      error={
        formsDataErrors[formName]?.[name]?.error
          || textfield.has.regexError(value)
      }
      helperText={
        formsDataErrors[formName]?.[name]?.message
        || textfield.props.helperText
      }
      value={value}
      onChange={textfield.onChange(textfield)}
      onKeyDown={textfield.onKeyDown(redux)}
      onBlur={textfield.onBlur(textfield, formsDataErrors[formName]?.[name])}
      InputProps={StateJsxTextfieldInputProps(textfield.inputProps)}
    />
  ) : (
    <TextField
      value={NAME_NOT_SET}
      InputProps={getTextFieldAdornment(textfield.inputProps) as Partial<InputProps>}
      disabled
    />
  )

}
