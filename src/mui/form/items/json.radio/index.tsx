import { Fragment } from 'react'
import {
  FormLabel, RadioGroup, FormControlLabel, Radio, TextField
} from '@mui/material'
import {
  getProps, getFieldValue, getLocallyStoredValue
} from '../controller'
import { RootState } from '../../../../state'
import { connect } from 'react-redux'
import StateFormItemRadio from '../../../../controllers/StateFormItemRadio'
import { FIELD_NAME_NOT_SET } from '../../../../controllers'

const mapStateToProps = (state: RootState) => ({
  formsData: state.formsData
})

interface IParentState {
  state: any
  setState: Function
}

interface IJsonRadioProps {
  def: StateFormItemRadio
  formsData: any
  state?: IParentState
}

export default connect(mapStateToProps)(

function JsonRadio ({ def: radio, formsData, state }: IJsonRadioProps) {
  const getValueFromParent = () => {
    if (state) {
      return getLocallyStoredValue(state.state.formData, radio)
    }
  }
  const getValue = () => {
    return getFieldValue(formsData, radio.parent.name, radio.name)
    || getValueFromParent()
  }
  const currentValue = getValue()
  return radio.nameProvided
    ? (radio.hasLabel
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
    ) : (
      <TextField value={`RADIO ${FIELD_NAME_NOT_SET}`} disabled />
    )
})
