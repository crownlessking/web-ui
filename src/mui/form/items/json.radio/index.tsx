import { Fragment } from 'react'
import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import {
  getProps, getStoredValue, getLocallyStoredValue
} from '../controller'
import { IState } from '../../../../interfaces'
import { connect } from 'react-redux'
import StateFormItemRadio from '../../../../controllers/StateFormItemRadio'

const mapStateToProps = (state: IState) => ({
  formsData: state.formsData
})

interface IParentState {
  state: any
  setState: Function
}

interface IProps {
  def: StateFormItemRadio
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
  const currentValue = getValue()
  return radio.hasLabel
    ? (
      <Fragment>
        <FormLabel component="legend">
          { radio.text }
          &nbsp;
        </FormLabel>
        <RadioGroup
          {...getProps(radio.json)}
          aria-label={radio.text}
          onChange={radio.onChange(radio.name)}
        >
          {radio.has.items.map((radioButton, i) => (
            <FormControlLabel
              {...radioButton.formControlLabelProps}
              key={i}
              value={radioButton.value}
              control={
                <Radio
                  {...radioButton.props}
                  color={radioButton.json.color}
                />
              }
              label={radioButton.label}
              checked={radioButton.value === currentValue}
              disabled={radioButton.disabled}
            />
          ))}
        </RadioGroup>
      </Fragment>
    ) : (
      <Fragment>
        {radio.has.items.map((radioButton, i) => (
          <Radio
            {...radioButton.props}
            key={`radio-button-${i}`}
            color={radioButton.json.color}
          />
        ))}
      </Fragment>
    )
})
