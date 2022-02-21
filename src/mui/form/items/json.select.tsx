import { InputLabel, Select, TextField } from '@mui/material'
import { getFieldValue, getLocallyStoredValue } from './controller'
import { RootState } from '../../../state'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import StateFormItemSelect from '../../../controllers/StateFormItemSelect'
import { FIELD_NAME_NOT_SET } from '../../../controllers'

const mapStateToProps = (state: RootState) => ({
  formsData: state.formsData,
  stateMeta: state.meta
})

interface IParentState {
  state: any
  setState: Function
}

interface IJsonSelectProps {
  def: StateFormItemSelect
  formsData: any
  stateMeta: any
  state?: IParentState
}

export default connect(mapStateToProps)(

function JsonSelect ({ def: select, formsData, state }: IJsonSelectProps) {
  const { id, name, has, onChange } = select
  const getValueFromParent = () => {
    if (state) {
      return getLocallyStoredValue(state.state.formData, select)
    }
  }
  const getValue = () => {
    return getFieldValue(formsData, select.parent.name, select.name)
    || getValueFromParent()
  }

  return name ? (
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
  ) : (
    <TextField value={`SELECT ${FIELD_NAME_NOT_SET}`} disabled />
  )
})
