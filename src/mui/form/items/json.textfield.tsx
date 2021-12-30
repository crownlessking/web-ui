import { alpha, TextField, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  getProps, getStoredValue, getLocallyStoredValue
} from './controller'
import { connect } from 'react-redux'
import { RootState } from '../../../state'
import getTextFieldAdornment from './json.input.adornment'
import ThemeParser from '../../../controllers/ThemeParser'
import StateFormItem from '../../../controllers/StateFormItem'

const mapStateToProps = (state: RootState) => ({
  formsData: state.formsData
})

interface IParentState {
  state: any
  setState: Function
}

interface IJsonTextfieldProps {
  def: StateFormItem
  formsData: any
  state?: IParentState
}

/**
 * Textfield
 */
export default connect(mapStateToProps)(

function JsonTextfield ({ def: textfield, formsData, state }: IJsonTextfieldProps) {
  const props = getProps(textfield.json)
  const parse = new ThemeParser({ alpha }).getParser()
  const classes = makeStyles((theme: Theme) => ({
    json: parse(theme, textfield.theme)
  }))()

  const getValueFromParent = () => {
    if (state) {
      const localValue = getLocallyStoredValue(
        state.state.formData,
        textfield.json
      )
      return localValue
    }
  }

  const getValue = () => (
    getStoredValue(formsData, textfield.parent.name, textfield.name)
    || getValueFromParent()
    || ''
  )

  const value = getValue()
  return (
    <TextField
      className={classes.json}
      {...props}
      error={textfield.has.regexError(value)}
      value={value}
      onChange={textfield.onChange(textfield.name)}
      InputProps={getTextFieldAdornment(textfield.inputProps)}
    />
  )

}

) // END export default
