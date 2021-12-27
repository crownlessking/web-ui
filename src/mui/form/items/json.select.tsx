import { InputLabel, Select } from '@mui/material'
import { getStoredValue, getLocallyStoredValue } from './controller'
import { IState } from '../../../interfaces'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import StateFormItemSelect from '../../../controllers/StateFormItemSelect'

const mapStateToProps = (state: IState) => ({
  formsData: state.formsData,
  stateMeta: state.meta
})

interface IParentState {
  state: any
  setState: Function
}

interface IProps {
  def: StateFormItemSelect
  formsData: any
  stateMeta: any
  state?: IParentState
}

export default connect(mapStateToProps)(

function ({ def: select, formsData, state }: IProps) {
  const { id, name, has, onChange } = select
  const getValueFromParent = () => {
    if (state) {
      return getLocallyStoredValue(state.state.formData, select)
    }
  }
  const getValue = () => {
    return getStoredValue(formsData, select.parent.name, select.name)
    || getValueFromParent()
  }

  return (
    <Fragment>
      <InputLabel
        {...select.inputLabelProps}
        htmlFor={id}
      >
        { select.text }
      </InputLabel>
      <Select
        native
        margin='dense'
        {...select.props}
        value={getValue()}
        onChange={onChange(name)}
        inputProps={{ name, id }}
      >
        <option key={-1} value=''></option>
        {has.items.map((option, index) => (
          <option key={index} value={option.value}>
            {option.title || option.value}
          </option>
        ))}
      </Select>
    </Fragment>
  )
})
