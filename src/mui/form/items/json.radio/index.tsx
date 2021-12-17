import {
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio
} from '@mui/material'
import {
  getProps, getStoredValue, getLocallyStoredValue
} from '../controller'
import { IState } from '../../../../interfaces'
import { connect } from 'react-redux'
import StateFormItemRadio from '../../../../controllers/StateFormItemRadio'
import classnames from 'classnames'

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
  return (
    <FormControl
      component="fieldset"
      className={
        classnames(radio.has.classes.formControl, radio.has.formControl)
      }
    >
      <FormLabel component="legend">
        { radio.has.label || radio.has.title }
        &nbsp;
      </FormLabel>
      <RadioGroup
        {...getProps(radio.json)}
        aria-label={radio.has.label || radio.has.title}
        onChange={radio.onChange(radio.name)}
      >
        {radio.has.items.map((radioButton, i) => (
          <FormControlLabel
            key={i}
            value={radioButton.value}
            control={
              <Radio color={radioButton.json.color} />
            }
            label={radioButton.label}
            checked={radioButton.value === currentValue}
            disabled={radioButton.disabled}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )

})
