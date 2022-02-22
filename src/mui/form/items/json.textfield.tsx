import { TextField } from '@mui/material'
import { getFieldValue } from './controller'
import { RootState } from '../../../state'
import getTextFieldAdornment from './json.input.adornment'
import StateFormItem from '../../../controllers/StateFormItem'
import { FIELD_NAME_NOT_SET } from '../../../controllers'
import { useSelector } from 'react-redux'

interface IJsonTextfieldProps {
  def: StateFormItem
}

const typeMap: { [constant: string]: string } = {
  text: 'text',
  textfield: 'text',
  textarea: 'text',
  password: 'password',
  number: 'number'
}

/**
 * Textfield
 */
export default function JsonTextfield({ def: textfield }: IJsonTextfieldProps) {
  const formsData = useSelector<RootState>(state => state.formsData)
  const value = getFieldValue(formsData, textfield.parent.name, textfield.name)

  return textfield.name ? (
    <TextField
      {...textfield.props}
      type={typeMap[textfield.type]}
      error={textfield.has.regexError(value)}
      value={value}
      onChange={textfield.onChange(textfield.name)}
      InputProps={getTextFieldAdornment(textfield.inputProps)}
    />
  ) : (
    <TextField
      value={FIELD_NAME_NOT_SET}
      InputProps={getTextFieldAdornment(textfield.inputProps)}
      disabled
    />
  )

}
