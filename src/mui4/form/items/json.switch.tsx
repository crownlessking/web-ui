import React from 'react'
import {
  FormControl, FormLabel, FormGroup, FormControlLabel, Switch, FormHelperText
} from '@material-ui/core'
import { getBoolValue } from '../controller'
import { RadioProps } from '@material-ui/core/Radio'
import { IState } from '../../../interfaces'
import { getStoredValue, getLocallyStoredValue } from './controller'
import { connect } from 'react-redux'
import { IParentState } from '../../../interfaces'
import StateFormItem from '../../../controllers/StateFormItem'

const mapStateToProps = (state: IState) => ({
  formsData: state.formsData
})

interface IProps {
  def: StateFormItem
  formsData: any
  state?: IParentState
  [prop: string]: any
}

export default connect(mapStateToProps)(

function ({ def, formsData, state }: IProps) {
  const { disabled, name, onChange } = def
  const has = def.has
  const getValueFromParent = () => {
    if (state) {
      return getLocallyStoredValue(state.state.formData, def)
    }
  }
  const getValue = () => {
    return getStoredValue(formsData, def.parent.name, def.name)
    || getValueFromParent()
  }
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">&nbsp;</FormLabel>
      <FormGroup>
        <FormControlLabel
          label={has.label || has.title || name}
          control={
            <Switch
              disabled={disabled === true}
              checked={getBoolValue(getValue())}
              onChange={onChange(name, getValue())}
              value={name}
              color={has.json.color as RadioProps['color']}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
        />
      </FormGroup>
      <FormHelperText>{has.text || ' '}</FormHelperText>
    </FormControl>
  )

})
