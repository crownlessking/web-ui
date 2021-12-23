import { connect } from 'react-redux'
import StateForm from '../../../controllers/StateForm'
import StateFormItem from '../../../controllers/StateFormItem'
import {
  getCheckboxesStatus,
  getStoredValue,
  getLocallyStoredValue
} from './controller'
import { FormControlLabel, Checkbox } from '@mui/material'
import { IState } from '../../../interfaces'
import { RadioProps } from '@mui/material/Radio'
import { Fragment } from 'react'
import StateFormItemCheckbox from '../../../controllers/StateFormItemCheckbox'

const mapStateToProps = (state: IState) => ({
  formsData: state.formsData
})

interface IParentState {
  state: any
  setState: Function
}

interface IProps {
  def: StateFormItem<StateForm, StateFormItemCheckbox>
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
    <Fragment>
      {checkboxes.has.items.map((box, i) => (
        box.hasLabel
        ? (
          <FormControlLabel
            {...box.formControlLabelProps}
            key={i}
            label={box.label}
            control={
              <Checkbox
                {...box.props}
                checked={checkboxesStatus[box.value]}
                onChange={checkboxes.onChange(checkboxes.name, value)}
                value={box.value}
                color={
                  box.color || (checkboxes.has.color as RadioProps['color'])
                }
              />
            }
            disabled={box.disabled}
          />
        ) : (
          <Checkbox
            {...box.props}
            checked={checkboxesStatus[box.value]}
            onChange={checkboxes.onChange(checkboxes.name, value)}
            value={box.value}
            color={
              box.color || (checkboxes.has.color as RadioProps['color'])
            }
            disabled={box.disabled}
          />
        )
      ))}
    </Fragment>
  )

})
