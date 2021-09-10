import React from 'react'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import StateFormItem, {
  getProps, getStoredValue, getLocallyStoredValue
} from '../items.controller'
import { IState } from '../../../../interfaces'
import { connect } from 'react-redux'
import StateForm from '../../../../state/forms/form.controller'
import StateFormItemRadio from './controller'

const mapStateToProps = (state: IState) => ({
  formsData: state.formsData
})

interface IParentState {
  state: any
  setState: Function
}

interface IProps {
  def: StateFormItem<StateForm, StateFormItemRadio>
  formsData: any
  state?: IParentState
}

export default connect(mapStateToProps)(

function({ def: radio, formsData, state }: IProps) {
  const getValueFromParent = () => {
    if (state) {
      return getLocallyStoredValue(state.state.formData, radio)
    }
  }
  const getValue = () => {
    return getStoredValue(formsData, radio.parent.name, radio.name)
    || getValueFromParent()
  }
  const value = getValue()
  return (
    <FormControl
      component="fieldset"
      className={radio.has.classes.formControl}
    >
      <FormLabel component="legend">
        { radio.has.label || radio.has.title }
        &nbsp;
      </FormLabel>
      <RadioGroup
        {...getProps(radio.state)}
        aria-label={radio.has.label || radio.has.title}
        onChange={radio.onChange(radio.name)}
      >
        {radio.has.items.map((radioButton, index) => (
          <FormControlLabel
            key={index}
            value={radioButton.value}
            control={
              <Radio color={radioButton.radioColor()} />
            }
            label={radioButton.radioLabel()}
            checked={radioButton.value === value}
            disabled={radioButton.disabled}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )

})