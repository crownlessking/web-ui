import { alpha, Input, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { connect } from 'react-redux'
import StateFormItem from '../../../controllers/StateFormItem'
import ThemeParser from '../../../controllers/ThemeParser'
import { IParentState, IState } from '../../../interfaces'
import { getStoredValue, getLocallyStoredValue } from './controller'
import ia, { getAdornment } from './json.input.adornment'

const mapStateToProps = (state: IState) => ({
  formsData: state.formsData
})

interface IProps {
  def: StateFormItem
  formsData: any
  state?: IParentState
}

export default connect(mapStateToProps)(

function ({ def: input, formsData, state }: IProps) {
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

  
    const value = getStoredValue(formsData, input.parent.name, input.name)
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