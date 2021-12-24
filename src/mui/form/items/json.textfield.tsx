import { alpha, TextField, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  getProps, getStoredValue, getLocallyStoredValue
} from './controller'
import { connect } from 'react-redux'
import { IState } from '../../../interfaces'
import getTextFieldAdornment from './json.input.adornment'
import ThemeParser from '../../../controllers/ThemeParser'
import StateFormItemTextField from '../../../controllers/StateFormItemTextField'

const mapStateToProps = (state: IState) => ({
  formsData: state.formsData
})

interface IParentState {
  state: any
  setState: Function
}

interface IProps {
  def: StateFormItemTextField
  formsData: any
  state?: IParentState
}

/**
 * Textfield
 */
export default connect(mapStateToProps)(

function ({ def: textfield, formsData, state }: IProps) {
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
