import React from 'react'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import StateFormItem, {
  radioLabel, getProps, getStoredValue, getLocallyStoredValue
} from './items.controller'
import { IFormRadio, IState } from '../../../interfaces'
import { RadioProps } from '@material-ui/core/Radio'
import { connect } from 'react-redux'
import StateForm from '../../../state/forms/form.controller'

const mapStateToProps = (state: IState) => ({
  formsData: state.formsData
})

interface IParentState {
  state: any
  setState: Function
}

interface IProps {
  def: StateFormItem<StateForm, IFormRadio>
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
              <Radio color={
                radioButton.color || (radio.has.color as RadioProps['color'])
              } />
            }
            label={radioLabel(radioButton)}
            checked={radioButton.value === value}
            disabled={radioButton.disabled === true}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )

})
