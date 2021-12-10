import React from 'react'
import { connect } from 'react-redux'
import StateForm from '../../../controllers/StateForm'
import StateFormItem from '../../../controllers/StateFormItem'
import {
  getCheckboxesStatus,
  getStoredValue,
  getLocallyStoredValue
} from './controller'
import {
  FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox
} from '@material-ui/core'
import { IFormCheckbox, IState } from '../../../interfaces'
import { RadioProps } from '@material-ui/core/Radio'
import classnames from 'classnames'

const mapStateToProps = (state: IState) => ({
  formsData: state.formsData
})

interface IParentState {
  state: any
  setState: Function
}

interface IProps {
  def: StateFormItem<StateForm, IFormCheckbox>
  formsData: any
  state?: IParentState
}

export default connect(mapStateToProps)(

function ({ def: checkboxes, formsData, state }: IProps) {
  const formName = checkboxes.parent.name
  const getValueFromParent = () => {
    if (state) {
      return getLocallyStoredValue(state.state.formData, checkboxes)
    }
  }
  const getValue = () => {
    return getStoredValue(formsData, formName, checkboxes.name)
    || getValueFromParent()
    || []
  }
  const value = getValue()
  const checkboxesStatus = getCheckboxesStatus(checkboxes.has, value)

  return (
    <FormControl
      component="fieldset"
      className={
        classnames(
          checkboxes.has.classes.formControl,
          checkboxes.has.formControl
        )
      }
    >
      <FormLabel component="legend">
        { checkboxes.has.label || checkboxes.has.title }
        &nbsp;
      </FormLabel>
      <FormGroup>
        {checkboxes.has.items.map((box, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={checkboxesStatus[box.value]}
                onChange={checkboxes.onChange(checkboxes.name, value)}
                value={box.value}
                color={
                  box.color || (checkboxes.has.color as RadioProps['color'])
                }
              />
            }
            label={box.label}
            disabled={box.disabled === true}
          />
        ))}
      </FormGroup>
    </FormControl>
  )

})
