import { connect } from 'react-redux'
import StateForm from '../../../controllers/StateForm'
import StateFormItem from '../../../controllers/StateFormItem'
import {
  getCheckboxesStatus,
  getFieldValue,
  getLocallyStoredValue
} from './controller'
import { FormControlLabel, Checkbox } from '@mui/material'
import { RootState } from '../../../state'
import { RadioProps } from '@mui/material/Radio'
import { Fragment } from 'react'
import StateFormItemCheckbox from '../../../controllers/StateFormItemCheckbox'

const mapStateToProps = (state: RootState) => ({
  formsData: state.formsData
})

interface IParentState {
  state: any
  setState: Function
}

interface IJsonCheckboxesProps {
  def: StateFormItem<StateForm, StateFormItemCheckbox>
  formsData: any
  state?: IParentState
}

export default connect(mapStateToProps)(

function JsonCheckboxes (
  { def: checkboxes, formsData, state }: IJsonCheckboxesProps
) {
  const formName = checkboxes.parent.name
  const getValueFromParent = () => {
    if (state) {
      return getLocallyStoredValue(state.state.formData, checkboxes)
    }
  }
  const getValue = () => {
    return getFieldValue(formsData, formName, checkboxes.name)
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
