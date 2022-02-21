import { alpha, Input, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { connect } from 'react-redux'
import { IParentState } from '../../../controllers/State'
import StateFormItem from '../../../controllers/StateFormItem'
import ThemeParser from '../../../controllers/ThemeParser'
import { RootState } from '../../../state'
import { getFieldValue, getLocallyStoredValue } from './controller'
import { getAdornment } from './json.input.adornment'

const mapStateToProps = (state: RootState) => ({
  formsData: state.formsData
})

interface IJsonInputProps {
  def: StateFormItem
  formsData: any
  state?: IParentState
}

export default connect(mapStateToProps)(

function JsonInput ({ def: input, formsData, state }: IJsonInputProps) {
  const parse = new ThemeParser({ alpha }).getParser()
  const classes = makeStyles((theme: Theme) => ({
    json: parse(theme, input.theme)
  }))()

  const getValueFromParent = () => {
    if (state) {
      const localValue = getLocallyStoredValue(
        state.state.formData,
        input.json
      )
      return localValue
    }
  }

  
    const value = getFieldValue(formsData, input.parent.name, input.name)
    || getValueFromParent()
    || ''

  return (
    <Input
      className={classes.json}
      startAdornment={getAdornment(input.has.startAdornment)}
      {...input.props}
      error={input.has.regexError(value)}
      value={value}
      onChange={input.onChange(input.name)}
    />
  )
}

)